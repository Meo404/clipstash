# Service to delete unconfirmed User Accounts
class DeleteUnconfirmedUsers < ApplicationService
  def initialize(older_than = 1.month.ago)
    @older_than = older_than
  end

  def call
    User.where("created_at >= ?", @older_than).where(confirmed_at: nil).delete_all
  end
end
