# frozen_string_literal: true

class Api::V1::FavoriteSubmissionsController < Api::V1::ApiController
  include Api::Concerns::FilterParams

  before_action :authenticate_api_v1_user!
  before_action :set_user
  before_action :set_max_results, only: [:index]

  def index
    submissions = @user.submissions.page(params[:page]).per(params[:max_results])
    render json: submissions, include: [], meta: pagination_dict(submissions)
  end

  def create
    FavoriteSubmission.create!(user: @user, submission: Submission.find(params[:submission_fullname]))
    render json: { success: true }
  end

  def destroy
    FavoriteSubmission.where(user: @user, submission_fullname: params[:submission_fullname]).destroy_all
    render json: { success: true }
  end

  private

    def set_user
      @user = current_api_v1_user
    end
end
