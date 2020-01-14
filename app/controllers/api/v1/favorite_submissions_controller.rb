# frozen_string_literal: true

class Api::V1::FavoriteSubmissionsController < Api::V1::ApiController
  include Api::Concerns::FilterParams

  before_action :authenticate_api_v1_user!
  before_action :set_user
  before_action :set_max_results, only: [:index]
  after_action :track_favorite_submissions_view, only: [:index]
  after_action :track_favorite_submission_added, only: [:create]
  after_action :track_favorite_submission_removed, only: [:destroy]

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
end
