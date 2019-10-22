require "rails_helper"

describe Submissions::Search::FindSubmissions do
  before(:each) do
    @subreddit = create(:subreddit)
    media_provider = create(:media_provider)

    10.times do
      submission = create(:submission, subreddit: @subreddit)
      create(:medium, submission: submission, media_provider: media_provider)
    end
  end

  context "when no sorting is provided" do
    it "uses hot sorting" do
      expected_result = Submissions::Search::FindSubmissions.call(@subreddit.id, "hot")
      expect(Submissions::Search::FindSubmissions.call(@subreddit.id, nil)).to eq(expected_result)
    end
  end

  context "when hot sorting" do
    it "returns all submissions by hot score" do
      expected_result = Submission.by_subreddit(@subreddit.id).has_medium.hot
      expect(Submissions::Search::FindSubmissions.call(@subreddit.id, "hot")).to eq(expected_result)
    end
  end

  context "when searching with top_all sorting" do
    it "returns all submissions sorted by score" do
      expected_result = Submission.by_subreddit(@subreddit.id).has_medium.top
      expect(Submissions::Search::FindSubmissions.call(@subreddit.id, "top_all")).to eq(expected_result)
    end
  end

  context "when searching with top_year sorting" do
    let(:date) { 1.year.ago.in_time_zone("UTC") }

    it "returns all submissions of the last year sorted by score" do
      expected_result = Submission
                            .by_subreddit(@subreddit.id)
                            .has_medium
                            .created_after(date)
                            .top

      expect(Submissions::Search::FindSubmissions.call(@subreddit.id, "top_year").to_a).to eq(expected_result.to_a)
    end
  end

  context "when searching with top_month sorting" do
    let(:date) { 1.month.ago.in_time_zone("UTC") }

    it "returns all submissions of the last month sorted by score" do
      expected_result = Submission
                            .by_subreddit(@subreddit.id)
                            .has_medium
                            .created_after(date)
                            .top

      expect(
          Submissions::Search::FindSubmissions.call(@subreddit.id, "top_month").to_a
      ).to eq(expected_result.to_a)
    end
  end

  context "when searching with top_week sorting" do
    let(:date) { 1.week.ago.in_time_zone("UTC") }

    it "returns all submissions of the last week sorted by score" do
      expected_result = Submission
                            .by_subreddit(@subreddit.id)
                            .has_medium
                            .created_after(date)
                            .top

      expect(Submissions::Search::FindSubmissions.call(@subreddit.id, "top_week").to_a).to eq(expected_result.to_a)
    end
  end

  context "when searching with top_day sorting" do
    let(:date) { 1.day.ago.in_time_zone("UTC") }

    it "returns all submissions of the last day sorted by score" do
      expected_result = Submission
                            .by_subreddit(@subreddit.id)
                            .has_medium
                            .created_after(date)
                            .top

      expect(Submissions::Search::FindSubmissions.call(@subreddit.id, "top_day").to_a).to eq(expected_result.to_a)
    end
  end
end
