require 'rails_helper'

RSpec.describe Api::V1::SubmissionsController, type: :controller do
  before(:each) do
    request.headers["accept"] = 'application/json'

    media_provider = create(:media_provider)
    subreddit = create(:subreddit)
    30.times do
      submission = create(:submission, subreddit: subreddit)
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

  describe 'GET #by:subreddit' do
    subject { get :by_subreddit, params: { display_name: Subreddit.first.display_name } , as: :json }

    it { is_expected.to be_successful }

    it "returns 25 submissions" do
      body = JSON.parse(subject.body)
      expect(body["submissions"].length).to eq(25)
    end

    it "doesn't show associations" do
      body = JSON.parse(subject.body)
      expect(body["submissions"][0]).not_to have_key("medium")
      expect(body["submissions"][0]).not_to have_key("subreddit")
    end
  end
end
