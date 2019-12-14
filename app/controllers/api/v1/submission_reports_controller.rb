class Api::V1::SubmissionReportsController < Api::V1::ApiController
  before_action :authenticate_api_v1_user!
  before_action :set_user

  def create
    SubmissionReport.create!(user: @user,
                             submission: Submission.find(params[:submission_fullname]),
                             reason: params[:reason],
                             status_cd: 1)

    render json: { success: true }
  end

  private

    def set_user
      @user = current_api_v1_user
    end
end
