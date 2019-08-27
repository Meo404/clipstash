module UrlParser
  # Get Twitch ID from Twitch Urls
  class Twitch
    URL_DELIMITERS = ["/", "?"].freeze

    def self.call(url)
      url.sub(%r{^https?:(//|\\\\)(www\.)?}i, "").split(Regexp.union(URL_DELIMITERS))[1]
    rescue
      ""
    end
  end
end
