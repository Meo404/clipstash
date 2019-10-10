require "rails_helper"

describe Submissions::Search do
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
      expected_result = Submissions::Search.call(@subreddit.id, "hot", nil)
      expect(Submissions::Search.call(@subreddit.id, nil, nil)).to eq(expected_result)
    end
  end

  context "when hot sorting" do
    context "when no after score is provided" do
      it "returns all submissions by hot score" do
        expected_result = Submission.by_subreddit(@subreddit.id).has_medium.hot
        expect(Submissions::Search.call(@subreddit.id, "hot", nil)).to eq(expected_result)
      end
    end

    context "when after score is provided" do
      it "returns all submissions having a lower hot score" do
        after_score = Submission.first.hot_score
        expected_result = Submission
                              .by_subreddit(@subreddit.id)
                              .has_medium
                              .where("hot_score < ?", after_score.to_f.round_down(3))
                              .hot

        expect(Submissions::Search.call(@subreddit.id, "hot", after_score)).to eq(expected_result)
      end
    end
  end

  context "when searching with top_all sorting" do
    context "when no after score is provided" do
      it "returns all submissions sorted by score" do
        expected_result = Submission.by_subreddit(@subreddit.id).has_medium.top
        expect(Submissions::Search.call(@subreddit.id, "top_all", nil)).to eq(expected_result)
      end
    end

    context "when after score is provided" do
      it "returns all submissions having a lower score" do
        score = Submission.first.score
        expected_result = Submission.by_subreddit(@subreddit.id).has_medium.where("score < ?", score.to_i).top

        expect(Submissions::Search.call(@subreddit.id, "top_all", score)).to eq(expected_result)
      end
    end
  end

  context "when searching with top_year sorting" do
    let(:date) { 1.year.ago.in_time_zone("UTC") }

    context "when no after score is provided" do
      it "returns all submissions of the last year sorted by score" do
        expected_result = Submission
                              .by_subreddit(@subreddit.id)
                              .has_medium
                              .created_after(date)
                              .top

        expect(Submissions::Search.call(@subreddit.id, "top_year", nil).to_a).to eq(expected_result.to_a)
      end
    end

    context "when after score is provided" do
      it "returns all submissions of the last year having a lower score" do
        score = Submission.first.score
        expected_result = Submission
                              .by_subreddit(@subreddit.id)
                              .has_medium
                              .created_after(date)
                              .where("score < ?", score.to_i)
                              .top

        expect(Submissions::Search.call(@subreddit.id, "top_all", score).to_a).to eq(expected_result.to_a)
      end
    end
  end

  context "when searching with top_month sorting" do
    let(:date) { 1.month.ago.in_time_zone("UTC") }

    context "when no after score is provided" do
      it "returns all submissions of the last month sorted by score" do
        expected_result = Submission
                              .by_subreddit(@subreddit.id)
                              .has_medium
                              .created_after(date)
                              .top

        expect(Submissions::Search.call(@subreddit.id, "top_month", nil).to_a).to eq(expected_result.to_a)
      end
    end

    context "when after score is provided" do
      it "returns all submissions of the last month having a lower score" do
        score = Submission.first.score
        expected_result = Submission
                              .by_subreddit(@subreddit.id)
                              .has_medium
                              .created_after(date)
                              .where("score < ?", score.to_i)
                              .top

        expect(Submissions::Search.call(@subreddit.id, "top_month", score).to_a).to eq(expected_result.to_a)
      end
    end
  end

  context "when searching with top_week sorting" do
    let(:date) { 1.week.ago.in_time_zone("UTC") }

    context "when no after score is provided" do
      it "returns all submissions of the last week sorted by score" do
        expected_result = Submission
                              .by_subreddit(@subreddit.id)
                              .has_medium
                              .created_after(date)
                              .top

        expect(Submissions::Search.call(@subreddit.id, "top_week", nil).to_a).to eq(expected_result.to_a)
      end
    end

    context "when after score is provided" do
      it "returns all submissions of the last week having a lower score" do
        score = Submission.first.score
        expected_result = Submission
                              .by_subreddit(@subreddit.id)
                              .has_medium
                              .created_after(date)
                              .where("score < ?", score.to_i)
                              .top

        expect(Submissions::Search.call(@subreddit.id, "top_week", score).to_a).to eq(expected_result.to_a)
      end
    end
  end

  context "when searching with top_day sorting" do
    let(:date) { 1.day.ago.in_time_zone("UTC") }

    context "when no after score is provided" do
      it "returns all submissions of the last day sorted by score" do
        expected_result = Submission
                              .by_subreddit(@subreddit.id)
                              .has_medium
                              .created_after(date)
                              .top

        expect(Submissions::Search.call(@subreddit.id, "top_day", nil).to_a).to eq(expected_result.to_a)
      end
    end

    context "when after score is provided" do
      it "returns all submissions of the last day having a lower score" do
        score = Submission.first.score
        expected_result = Submission
                              .by_subreddit(@subreddit.id)
                              .has_medium
                              .created_after(date)
                              .where("score < ?", score.to_i)
                              .top

        expect(Submissions::Search.call(@subreddit.id, "top_day", score).to_a).to eq(expected_result.to_a)
      end
    end
  end
end
