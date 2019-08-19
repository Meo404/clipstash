require 'rails_helper'

RSpec.describe Api::V1::SubredditsController, type: :controller do
  before(:each) do
    request.headers["accept"] = 'application/json'
    3.times { create(:subreddit) }
  end

  describe '#index' do
    subject { get :index, as: :json }

    it { is_expected.to be_successful }

    it 'returns valid json' do
      body = JSON.parse(subject.body)
      expect(body['data'].length).to eq(3)
    end
  end
end
