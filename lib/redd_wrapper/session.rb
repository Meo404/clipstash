module ReddWrapper
  class Session
    def initialize(*args)
      @session = initialize_session
    end

    def from_fullnames(fullnames)
      @session.from_ids(fullnames)
    end

    private

    def initialize_session
      Redd.it(
        user_agent: Rails.application.credentials[Rails.env.to_sym][:reddit][:user_agent],
        client_id: Rails.application.credentials[Rails.env.to_sym][:reddit][:client_id],
        secret: Rails.application.credentials[Rails.env.to_sym][:reddit][:secret],
        redirect_url: "http://localhost:3000"
      )
    end
  end
end
