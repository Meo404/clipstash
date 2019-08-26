require "rails_helper"

describe Submissions::CalculateHotScore do
  it 'correctly calculates the hot score' do
    expect(Submissions::CalculateHotScore.call(Time.parse('2019-01-01'), 1000)).to eq(40721.73771111111)
    expect(Submissions::CalculateHotScore.call(Time.parse('2018-01-01'), 500)).to eq(40020.636681115444)
    expect(Submissions::CalculateHotScore.call(Time.parse('2019-07-01 08:00:00'), 10000)).to eq(41070.817711111114)
  end
end
