require "rails_helper"

describe DeleteUnconfirmedUsers do
  before(:each) do
    5.times do
      create(:user, confirmed_at: DateTime.now, created_at: 1.month.ago)
      create(:user, confirmed_at: nil, created_at: 1.month.ago)
      create(:user, confirmed_at: DateTime.now, created_at: 7.days.ago)
      create(:user, confirmed_at: nil, created_at: 7.days.ago)
    end
  end

  it 'deletes unconfirmed user accountsm, registered >= 1.month.ago' do
    expect{ DeleteUnconfirmedUsers.call }.to change{ User.count }.to(15)
  end
end