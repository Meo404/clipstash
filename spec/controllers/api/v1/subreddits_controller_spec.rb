require 'rails_helper'

RSpec.describe Api::V1::SubredditsController, type: :controller do
  before(:each) do
    request.headers["accept"] = 'application/json'
    10.times { create(:subreddit) }
  end

  describe 'GET #index' do
    subject { get :index, as: :json }

    it { is_expected.to be_successful }

    it 'returns valid json' do
      body = JSON.parse(subject.body)
      expect(body['data'].length).to eq(10)
    end
  end

  describe 'GET #popular' do
    subject { get :popular, as: :json }

    it { is_expected.to be_successful }

    it 'returns valid json' do
      body = JSON.parse(subject.body)
      expect(body['data'].length).to eq(5)
    end

    it 'lists top 5 subreddits sorted by subscribers' do
      body = JSON.parse(subject.body)
      expected_subreddit_ids = Subreddit.order(subscribers: :desc).limit(5).map(&:id)
      actual_subreddit_ids = body['data'].map { |d| d["id"].to_i }

      expect(actual_subreddit_ids).to eq(expected_subreddit_ids)
    end
  end
end
