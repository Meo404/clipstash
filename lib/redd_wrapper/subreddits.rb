module ReddWrapper
  class Subreddits < ReddWrapper::Session
    def initialize(display_name)
      @display_name = display_name
      super
    end

    def get
      @session.subreddit(@display_name)
    end

    def search(query, params = {})
      @session.subreddit(@display_name).search(query, params)
    end
  end
end
