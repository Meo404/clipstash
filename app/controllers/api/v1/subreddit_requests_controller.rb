class Api::V1::SubredditRequestsController < Api::V1::ApiController
  before_action :authenticate_api_v1_user!
  before_action :set_user

  def create
    SubredditRequest.create!(user: @user,
                             reddit_fullname: params[:reddit_fullname],
                             display_name: params[:display_name],
                             comment: params[:comment],
                             status_cd: 1)

    render json: { success: true }
  end

  private

  def set_user
    @user = current_api_v1_user
  end
end