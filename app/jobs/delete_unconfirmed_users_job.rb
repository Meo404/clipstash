# Job to delete unconfirmed user accounts
class DeleteUnconfirmedUsersJob < ApplicationJob
  queue_as :regular_updates
  sidekiq_options retry: 3

  def perform
    DeleteUnconfirmedUsers.call(1.month.ago)
  end
end
