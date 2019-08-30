require "rails_helper"

describe UrlParser::Youtube do

  context 'on valid youtube URLs' do
    it 'should properly find the id of a given youtube url' do
      youtube_id = 'Ab25nviakcw'
      expect(UrlParser::Youtube.call('http://youtube.googleapis.com/v/Ab25nviakcw?version=3')).to eq(youtube_id)
      expect(UrlParser::Youtube.call('https://www.youtube.com/watch?feature=g-vrec&v=Ab25nviakcw')).to eq(youtube_id)
      expect(UrlParser::Youtube.call('http://www.youtube.com/watch?feature=player_embedded&v=Ab25nviakcw#')).to eq(youtube_id)
      expect(UrlParser::Youtube.call('http://youtu.be/Ab25nviakcw')).to eq(youtube_id)
      expect(UrlParser::Youtube.call('http://www.youtube.com/watch?v=Ab25nviakcw')).to eq(youtube_id)
      expect(UrlParser::Youtube.call('<iframe width="420" height="315" src="http://www.youtube.com/embed/Ab25nviakcw" frameborder="0" allowfullscreen></iframe>')).to eq(youtube_id)
      expect(UrlParser::Youtube.call('<object width="420" height="315"><param name="movie" value="http://www.youtube-nocookie.com/v/Ab25nviakcw?version=3&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube-nocookie.com/v/Ab25nviakcw?version=3&amp;hl=en_US" type="application/x-shockwave-flash" width="420" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>')).to eq(youtube_id)
      expect(UrlParser::Youtube.call('http://i1.ytimg.com/vi/Ab25nviakcw/default.jpg')).to eq(youtube_id)
      expect(UrlParser::Youtube.call('https://www.youtube.com/watch?v=Ab25nviakcw&feature=g-all-xit')).to eq(youtube_id)
    end
  end
end

