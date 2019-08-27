require "rails_helper"

describe UrlParser::Twitch do
  context 'with valid twitch url' do
    it 'should properly find the id of a given twitch url' do
      twitch_id = 'KindYummyCarrotPeteZaroll'
      expect(UrlParser::Twitch.call('clips.twitch.tv/KindYummyCarrotPeteZaroll?some=1')).to eq(twitch_id)
      expect(UrlParser::Twitch.call('http://clips.twitch.tv/KindYummyCarrotPeteZaroll?some=1')).to eq(twitch_id)
      expect(UrlParser::Twitch.call('https://clips.twitch.tv/KindYummyCarrotPeteZaroll?some=1')).to eq(twitch_id)
      expect(UrlParser::Twitch.call('clips.twitch.tv/KindYummyCarrotPeteZaroll')).to eq(twitch_id)
      expect(UrlParser::Twitch.call('http://clips.twitch.tv/KindYummyCarrotPeteZaroll')).to eq(twitch_id)
      expect(UrlParser::Twitch.call('https://clips.twitch.tv/KindYummyCarrotPeteZaroll')).to eq(twitch_id)
    end
  end
end
