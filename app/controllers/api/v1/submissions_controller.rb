# frozen_string_literal: true

class Api::V1::SubmissionsController < Api::V1::ApiController
  include Api::Concerns::FilterParams

  before_action :set_max_results, only: [:recommended, :by_subreddit, :related]
  before_action :set_user_id, only: [:show]
  after_action :track_submission_view, only: [:show]

  # Returns a single submission
  def show
    @submission = Submission.friendly.find(params[:slug])

    render json: @submission,
           serializer: Api::V1::SubmissionDetailSerializer,
           include: ["subreddit", "medium"],
           user_id: @user_id
  end

  # Returns recommended submissions used for the index page
  def recommended
    submissions = Submission
                      .hot
                      .has_medium
                      .page(params[:page])
                      .per(params[:max_results])

    render json: submissions, include: [], meta: pagination_dict(submissions)
  end

  # Returns submissions for a given subreddit
  # Subreddit is provided by display_name via param
  def by_subreddit
    submissions = Submissions::Search::FindSubmissions
                      .call(subreddit_id, params[:sort])
                      .page(params[:page])
                      .per(params[:max_results])

    render json: submissions, include: [], meta: pagination_dict(submissions)
  end

  # Returns submissions related to a given submission
  def related
    submissions = Submissions::Search::FindRelatedSubmissions
                      .call(params[:slug], params[:sort])
                      .page(params[:page])
                      .per(params[:max_results])

    render json: submissions, include: [], meta: pagination_dict(submissions)
  end

  private

    def subreddit_id
      Subreddit.find_by_display_name!(params[:display_name]).id
    end

    def set_user_id
      @user_id = current_api_v1_user ? current_api_v1_user.id : nil
    end
end
