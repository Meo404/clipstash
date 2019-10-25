RSpec.describe SubmissionUpdateJob, type: :job do
  subject(:job) { described_class.perform_later(subreddit_id, search_method) }

  let(:subreddit_id) { 1 }
  let(:search_method) { "TOP_DAILY" }

  it "enqueues job to update submissions" do
    ActiveJob::Base.queue_adapter = :test

    expect { job }.to have_enqueued_job(described_class)
                          .with(subreddit_id, "TOP_DAILY")
  end
end
