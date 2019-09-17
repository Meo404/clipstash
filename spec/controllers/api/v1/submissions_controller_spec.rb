require 'rails_helper'

RSpec.describe Api::V1::SubmissionsController, type: :controller do
  before(:each) do
    request.headers["accept"] = 'application/json'

    @subreddit = create(:subreddit)
    media_provider = create(:media_provider)
    30.times do
      submission = create(:submission, subreddit: @subreddit)
      create(:medium, submission: submission, media_provider: media_provider)
    end
  end

  describe 'GET #show' do
    subject { get :show, params: { reddit_fullname: Submission.first.reddit_fullname } , as: :json }

    it { is_expected.to be_successful }

    it "returns the correct submission" do
      expect(JSON.parse(subject.body)["submission"]["reddit_fullname"]).to eq(Submission.first.reddit_fullname)
    end
  end

  describe 'GET #by_subreddit' do
    subject { get :by_subreddit, params: { display_name: @subreddit.display_name } , as: :json }

    it { is_expected.to be_successful }

    it "doesn't show associations" do
      body = JSON.parse(subject.body)
      expect(body["submissions"][0]).not_to have_key("medium")
      expect(body["submissions"][0]).not_to have_key("subreddit")
    end

    it 'has pagination meta data' do
      body = JSON.parse(subject.body)
      expect(body['meta']).to have_key("current_page")
      expect(body['meta']).to have_key("next_page")
      expect(body['meta']).to have_key("prev_page")
      expect(body['meta']).to have_key("total_pages")
      expect(body['meta']).to have_key("total_count")
    end
  end
end
