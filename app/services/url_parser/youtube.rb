module UrlParser
  # Get YouTube ID from various YouTube Urls
  # Ruby port from JavaScript version: https://gist.github.com/takien/4077195/
  class Youtube
    def self.call(url)
      url.gsub(/(>|<)/i, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2].split(/[^0-9a-z_\-]/i)[0]
    rescue
      ""
    end
  end
end
