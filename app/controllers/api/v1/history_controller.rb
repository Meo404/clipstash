# frozen_string_literal: true

class Api::V1::HistoryController < Api::V1::ApiController
  include Api::Concerns::FilterParams

  before_action :authenticate_api_v1_user!
  before_action :set_user
  before_action :set_max_results, only: [:index]
  after_action :track_history_view, only: [:index]

  def index
    submissions = UserHistory::FindSubmissions.call(@user.id, params[:page], params[:max_results])
    render json: submissions, include: [], meta: pagination_dict(submissions)
  end

  private

    def set_user
      @user = current_api_v1_user
    end
end
