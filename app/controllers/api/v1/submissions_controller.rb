class Api::V1::SubmissionsController < Api::V1::ApiController
  before_action :set_subreddit, only: :by_subreddit

  DEFAULT_PAGE_SIZE = 40

  def show
    @submission = Submission.friendly.find(params[:slug])
    render json: @submission, include: ["subreddit", "medium"]
  end

  # Returns recommended submissions
  # For now it will only return the top 8 ones by hot_score. In the future it should be more personalized
  def recommended
    @submission = Submission.hot.limit(8)
    render json: @submission, include: []
  end

  def by_subreddit
    @submissions = Submissions::Search
                       .call(@subreddit.id, params[:sort], params[:after_score])
                       .page(params[:page])
                       .per(params[:max_results] ? params[:max_results] : DEFAULT_PAGE_SIZE)

    render json: @submissions, include: [], meta: pagination_dict(@submissions)
  end

  private

    def set_subreddit
      @subreddit = Subreddit.find_by_display_name!(params[:display_name])
    end
end
