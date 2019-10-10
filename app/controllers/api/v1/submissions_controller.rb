# frozen_string_literal: true

class Api::V1::SubmissionsController < Api::V1::ApiController
  include Api::Concerns::FilterParams

  before_action :set_max_results, only: [:recommended, :by_subreddit]

  # Returns a single submission
  def show
    submission = Submission.friendly.find(params[:slug])
    render json: submission, include: ["subreddit", "medium"]
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
    submissions = Submissions::Search
                      .call(subreddit, params[:sort], params[:after_score])
                      .page(params[:page])
                      .per(params[:max_results])

    render json: submissions, include: [], meta: pagination_dict(submissions)
  end

  private

    def subreddit
      Subreddit.find_by_display_name!(params[:display_name])
    end
end
