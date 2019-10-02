require 'rails_helper'

RSpec.describe Api::V1::SubredditsController, type: :controller do
  before(:all) do
    DatabaseCleaner.clean_with :truncation
    100.times do |n|
      create(:subreddit)
    end
  end

  before(:each) do
    request.headers["accept"] = 'application/json'
  end

  describe 'GET #index' do
    subject { get :index, as: :json }

    it 'returns valid json' do
      body = JSON.parse(subject.body)
      expect(body['subreddits'].length).to eq(50)
    end

    it 'has pagination meta data' do
      body = JSON.parse(subject.body)
      expected_keys = %w(current_page next_page prev_page total_pages total_count)

      expect(body['meta'].keys).to eq(expected_keys)
    end

    subject { get :index, params: { sort: 'name' }, as: :json }
    it 'returns sorted results' do
      body = JSON.parse(subject.body)
      expected_result = Subreddit.order(display_name: :asc).first.display_name

      expect(body['subreddits'][0]['display_name']).to eq(expected_result)
    end
  end

  describe 'GET #show' do
    subject { get :show, params: { display_name: Subreddit.first.display_name } , as: :json }

    it { is_expected.to be_successful }

    it "returns the correct subreddit" do
      body = JSON.parse(subject.body)
      expect(body["subreddit"]["display_name"]).to eq(Subreddit.first.display_name)
    end
  end

  describe 'GET #popular' do
    subject { get :popular, as: :json }

    it { is_expected.to be_successful }

    it 'returns valid json' do
      body = JSON.parse(subject.body)
      expect(body['subreddits'].length).to eq(5)
    end

    it 'lists top 5 subreddits sorted by subscribers' do
      body = JSON.parse(subject.body)
      expected_subreddit_ids = Subreddit.order(subscribers: :desc).limit(5).map(&:id)
      actual_subreddit_ids = body['subreddits'].map { |d| d["id"].to_i }

      expect(actual_subreddit_ids).to eq(expected_subreddit_ids)
    end
  end
end
