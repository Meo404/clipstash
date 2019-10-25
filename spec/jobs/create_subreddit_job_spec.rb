RSpec.describe CreateSubredditJob, type: :job do
  subject(:job) { described_class.perform_later(display_name) }

  let(:display_name) { "TestSubreddit" }

  it "enqueues job to update submissions" do
    ActiveJob::Base.queue_adapter = :test

    expect { job }.to have_enqueued_job(described_class)
                          .with(display_name)
                          .on_queue("default")
  end
end
