describe 'GET api/v1/submission_history', type: :request do
  # API CONFIG uses low amounts for testing purposes
  # Check config/api_config.yml for adjustments
  let(:default_results) { Rails.configuration.api_config["history"]["index"]["default_results"].to_i }

  before :each do
    user = create(:user)
    visit = Ahoy::Visit.create(user_id: user.id)
    media_provider = create(:media_provider)

    10.times do
      subreddit = create(:subreddit)
      submission = create(:submission, subreddit: subreddit)
      create(:medium, submission: submission, media_provider: media_provider)
      Ahoy::Event.create(
          visit_id: visit.id,
          user_id: user.id,
          name: 'submission_view',
          properties: {
              submission_fullname: submission.reddit_fullname,
              time: Faker::Time.between(DateTime.now - 100, DateTime.now)
          })
    end
  end

  context 'when authenticated' do
    let(:user) { User.first }
    let(:auth_headers) { user.create_new_auth_token }

    it 'returns a successful response' do
      get "/api/v1/submission_history/", headers: auth_headers, as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the default amount of submissions' do
      get "/api/v1/submission_history", headers: auth_headers, as: :json
      expect(JSON.parse(response.body)["submissions"].size).to eq(default_results)
    end

    it 'returns submission history by the user' do
      get "/api/v1/submission_history", headers: auth_headers, as: :json
      expect(
          JSON.parse(response.body)["submissions"].map { |s| s["reddit_fullname"] }
      ).to eq(Ahoy::Event
                  .where(name: "submission_view", user_id: user.id)
                  .order(time: :desc)
                  .pluck("properties->'submission_fullname'")
                  .uniq[0..default_results-1])
    end
  end

  context 'when not authenticated' do
    it 'returns a unauthorized response' do
      get "/api/v1/submission_history/",  as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end