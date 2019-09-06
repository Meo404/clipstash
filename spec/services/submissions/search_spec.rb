require "rails_helper"

describe Submissions::Search do
  before :all do
    @submissions, @media = [], []
    subreddit = create(:subreddit)
    media_provider = create(:media_provider)

    100.times do
      submission = Submission.new(attributes_for(:submission).merge({ subreddit: subreddit }))
      medium = Medium.new(attributes_for(:medium).merge({ submission: submission, media_provider: media_provider }))

      @submissions << submission
      @media << medium
    end

    Submissions::UpsertSubmissions.call(@submissions, @media)
    Submissions::UpdateHotScores.call
  end

  context 'sort order' do
    it 'sorts by hot by default' do
      expected_result = Submission.where(subreddit: Subreddit.first).joins(:medium).order(hot_score: :desc)
      expect(Submissions::Search.call(Subreddit.first.id, {})).to match_array(expected_result)
    end

    it 'sorts by top weekly without time param' do
      expected_result = Submission
                            .where(subreddit: Subreddit.first)
                            .joins(:medium)
                            .where("created_utc >= ?", 1.week.ago.in_time_zone("UTC"))
                            .order(score: :desc)

      expect(Submissions::Search.call(Subreddit.first.id, { sort: "top" })).to match_array(expected_result)
    end
  end

  context 'sort time' do
    it 'sorts by top daily' do
      expected_result = Submission
                            .where(subreddit: Subreddit.first)
                            .joins(:medium)
                            .where("created_utc >= ?", 1.day.ago.in_time_zone("UTC"))
                            .order(score: :desc)

      expect(Submissions::Search.call(Subreddit.first.id, { sort: "top", time: "day" })).to match_array(expected_result)
    end

    it 'sorts by top weekly' do
      expected_result = Submission
                            .where(subreddit: Subreddit.first)
                            .joins(:medium)
                            .where("created_utc >= ?", 1.week.ago.in_time_zone("UTC"))
                            .order(score: :desc)

      expect(Submissions::Search.call(Subreddit.first.id, { sort: "top", time: "week" })).to match_array(expected_result)
    end

    it 'sorts by top monthly' do
      expected_result = Submission
                            .where(subreddit: Subreddit.first)
                            .joins(:medium)
                            .where("created_utc >= ?", 1.month.ago.in_time_zone("UTC"))
                            .order(score: :desc)

      expect(Submissions::Search.call(Subreddit.first.id, { sort: "top", time: "month" })).to match_array(expected_result)
    end

    it 'sorts by top yearly' do
      expected_result = Submission
                            .where(subreddit: Subreddit.first)
                            .joins(:medium)
                            .where("created_utc >= ?", 1.year.ago.in_time_zone("UTC"))
                            .order(score: :desc)

      expect(Submissions::Search.call(Subreddit.first.id, { sort: "top", time: "year" })).to match_array(expected_result)
    end

    it 'sorts by top alltime' do
      expected_result = Submission
                            .where(subreddit: Subreddit.first)
                            .joins(:medium)
                            .order(score: :desc)

      expect(Submissions::Search.call(Subreddit.first.id, { sort: "top", time: "all" })).to match_array(expected_result)
    end
  end

end
