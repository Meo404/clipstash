module UrlParser
  # Get Reddit ID from v.redd.it Urls
  class Reddit
    def self.call(url)
      url.sub(%r{^https?:(//|\\\\)(www\.)?}i, "").split("/")[1]
    rescue
      ""
    end
  end
end
