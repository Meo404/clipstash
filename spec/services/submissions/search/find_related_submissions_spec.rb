require "rails_helper"

describe Submissions::Search::FindRelatedSubmissions do
  before(:each) do
    subreddit = create(:subreddit)
    media_provider = create(:media_provider)

    50.times do
      submission = create(:submission, subreddit: subreddit)
      create(:medium, submission: submission, media_provider: media_provider)
    end

    Submissions::UpdateHotScores.call
    @random_submission = Submission.order(Arel.sql('random()')).first
  end

  context "when no sorting is provided" do
    it "uses hot sorting" do
      expected_result = Submissions::Search::FindRelatedSubmissions.call(@random_submission.slug, "hot")
      expect(Submissions::Search::FindRelatedSubmissions.call(@random_submission.slug, nil)).to eq(expected_result)
    end
  end

  context "when hot sorting" do
    it "returns related submissions with lower hot score" do
      expected_result = Submission
                            .by_subreddit(@random_submission.subreddit_id)
                            .where("hot_score < ?", @random_submission.hot_score.to_f.round_down(3))
                            .where.not(slug: @random_submission.slug)
                            .has_medium
                            .hot
                            .map(&:reddit_fullname)

      expect(
          Submissions::Search::FindRelatedSubmissions.call(@random_submission.slug, "hot").map(&:reddit_fullname)
      ).to eq(expected_result)
    end
  end

  context "when searching with top_all sorting" do
    it "returns all submissions sorted by score" do
      expected_result = Submission
                            .by_subreddit(@random_submission.subreddit_id)
                            .where("score <= ?", @random_submission.score.to_i)
                            .where.not(slug: @random_submission.slug)
                            .has_medium
                            .top
                            .map(&:reddit_fullname)

      expect(
          Submissions::Search::FindRelatedSubmissions.call(@random_submission.slug, "top_all").map(&:reddit_fullname)
      ).to eq(expected_result)
    end
  end

  context "when searching with top_year sorting" do
    let(:date) { 1.year.ago.in_time_zone("UTC") }

    it "returns all submissions of the last year sorted by score" do
      expected_result = Submission
                            .by_subreddit(@random_submission.subreddit_id)
                            .where("score <= ?", @random_submission.score.to_i)
                            .where.not(slug: @random_submission.slug)
                            .created_after(date)
                            .has_medium
                            .top
                            .map(&:reddit_fullname)

      expect(
          Submissions::Search::FindRelatedSubmissions.call(@random_submission.slug, "top_year").map(&:reddit_fullname)
      ).to eq(expected_result)
    end
  end

  context "when searching with top_month sorting" do
    let(:date) { 1.month.ago.in_time_zone("UTC") }

    it "returns all submissions of the last month sorted by score" do
      expected_result = Submission
                            .by_subreddit(@random_submission.subreddit_id)
                            .where("score <= ?", @random_submission.score.to_i)
                            .where.not(slug: @random_submission.slug)
                            .created_after(date)
                            .has_medium
                            .top
                            .map(&:reddit_fullname)

      expect(
          Submissions::Search::FindRelatedSubmissions.call(@random_submission.slug, "top_month").map(&:reddit_fullname)
      ).to eq(expected_result)
    end
  end

  context "when searching with top_week sorting" do
    let(:date) { 1.week.ago.in_time_zone("UTC") }

    it "returns all submissions of the last week sorted by score" do
      expected_result = Submission
                            .by_subreddit(@random_submission.subreddit_id)
                            .where("score <= ?", @random_submission.score.to_i)
                            .where.not(slug: @random_submission.slug)
                            .created_after(date)
                            .has_medium
                            .top
                            .map(&:reddit_fullname)

      expect(
          Submissions::Search::FindRelatedSubmissions.call(@random_submission.slug, "top_week").map(&:reddit_fullname)
      ).to eq(expected_result)
    end
  end

  context "when searching with top_day sorting" do
    let(:date) { 1.day.ago.in_time_zone("UTC") }

    it "returns all submissions of the last day sorted by score" do
      expected_result = Submission
                            .by_subreddit(@random_submission.subreddit_id)
                            .where("score <= ?", @random_submission.score.to_i)
                            .where.not(slug: @random_submission.slug)
                            .created_after(date)
                            .has_medium
                            .top
                            .map(&:reddit_fullname)

      expect(
          Submissions::Search::FindRelatedSubmissions.call(@random_submission.slug, "top_day").map(&:reddit_fullname)
      ).to eq(expected_result)
    end
  end
end
