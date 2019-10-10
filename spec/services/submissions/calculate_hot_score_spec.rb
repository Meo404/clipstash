require "rails_helper"

describe Submissions::CalculateHotScore do
  it 'correctly calculates the hot score' do
    expect(Submissions::CalculateHotScore.call(Time.parse('2019-07-01 08:00:00'), 10000)).to eq(41070.817711111114)
  end
end
