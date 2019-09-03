class Api::V1::SubmissionsController < Api::V1::ApiController
  before_action :set_subreddit, only: :by_subreddit

  def show
    @submission = Submission.find(params[:reddit_fullname])
    render json: @submission, include: ["subreddit", "medium.media_provider"]
  end

  def by_subreddit
    @submissions = Submission.where(subreddit: @subreddit).limit(25)
    render json: @submissions, each_serializer: SubmissionSnippetSerializer
  end

  private

    def set_subreddit
      @subreddit = Subreddit.find_by_display_name(params[:display_name])
    end
end
