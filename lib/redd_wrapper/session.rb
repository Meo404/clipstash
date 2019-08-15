module ReddWrapper
  class Session
    def initialize(*args)
      @session = initialize_session
    end

    private

    def initialize_session
      Redd.it(
        user_agent: "Project-Free Development",
        client_id: Rails.application.credentials.reddit[:client_id],
        secret: Rails.application.credentials.reddit[:secret],
        redirect_url: "http://localhost:3000"
      )
    end
  end
end
