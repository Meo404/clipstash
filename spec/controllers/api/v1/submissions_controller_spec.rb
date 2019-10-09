require 'rails_helper'

RSpec.describe Api::V1::SubmissionsController, type: :controller do
  API_CONFIG = Rails.configuration.api_config

  before(:each) do
    request.headers["accept"] = 'application/json'

    @subreddit = create(:subreddit)
    media_provider = create(:media_provider)
    50.times do
      submission = create(:submission, subreddit: @subreddit)
      create(:medium, submission: submission, media_provider: media_provider)
    end
  end

  describe 'includes FilterParamsConcern' do
    it { expect(Api::V1::SubmissionsController.ancestors.include? Api::Concerns::FilterParams).to eq(true) }
  end

  describe 'GET #show' do
    subject { get :show, params: { slug: Submission.first.slug } , as: :json }

    it { is_expected.to be_successful }

    it "returns the correct submission" do
      expect(JSON.parse(subject.body)["submission"]["slug"]).to eq(Submission.first.slug)
    end
  end

  describe 'GET #recommended' do
    subject { get :recommended, as: :json }

    it { is_expected.to be_successful }

    it "returns the configured amount of submissions by hot_score" do
      body = JSON.parse(subject.body)
      actual_submissions = body['submissions'].map { |d| d["reddit_fullname"] }
      expected_submissions = Submission
                                 .hot
                                 .limit(API_CONFIG["submissions"]["recommended"]["default_results"])
                                 .map(&:reddit_fullname)

      expect(actual_submissions).to eq(expected_submissions)
    end

    include_examples "pagination examples"
  end

  describe 'GET #by_subreddit' do

    subject { get :by_subreddit, params: { display_name: @subreddit.display_name } , as: :json }

    it { is_expected.to be_successful }

    it "doesn't show associations" do
      body = JSON.parse(subject.body)
      expect(body["submissions"][0]).not_to have_key("medium")
      expect(body["submissions"][0]).not_to have_key("subreddit")
    end

    include_examples "result key length",
                     "submissions", API_CONFIG["submissions"]["by_subreddit"]["default_results"]
    include_examples "pagination examples"
  end
end
