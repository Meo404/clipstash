require "rails_helper"

describe UrlParser::Reddit do
  context 'with valid reddit url' do
    it 'should properly find the id of a given twitch url' do
      reddit_id = 'zk4wkirgi5g21'
      expect(UrlParser::Reddit.call("https://v.redd.it/zk4wkirgi5g21")).to eq(reddit_id)
    end
  end
end
