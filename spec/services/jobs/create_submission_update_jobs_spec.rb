require "rails_helper"

describe Jobs::CreateSubmissionUpdateJobs do
  before(:each) do
    create(:subreddit, status_cd: 1)
  end

  context "with priority queue method" do
    let(:subreddit) {Subreddit.first}

    it "should enqueue update job on priority queue" do
      ActiveJob::Base.queue_adapter = :test

      expect {
        Jobs::CreateSubmissionUpdateJobs.call("TOP_DAILY")
      }.to have_enqueued_job(SubmissionsUpdateJob)
               .with(subreddit.id, "TOP_DAILY")
               .on_queue("priority_updates")

    end
  end

  context "with regular queue method" do
    let(:subreddit) {Subreddit.first}

    it "should enqueue update job on regular queue" do
      ActiveJob::Base.queue_adapter = :test

      expect {
        Jobs::CreateSubmissionUpdateJobs.call("TOP_YEARLY")
      }.to have_enqueued_job(SubmissionsUpdateJob)
               .with(subreddit.id, "TOP_YEARLY")
               .on_queue("regular_updates")

    end
  end
end
