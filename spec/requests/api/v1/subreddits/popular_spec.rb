describe 'GET api/v1/subreddits/popular', type: :request do
  # API CONFIG uses low amounts for testing purposes
  # Check config/api_config.yml for adjustments
  DEFAULT_RESULTS = Rails.configuration.api_config["subreddits"]["popular"]["default_results"].to_i

  before :each do
    10.times { create(:subreddit) }
  end

  context 'without params' do
    it 'returns a successful response' do
      get "/api/v1/popular_subreddits", as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the default amount of subreddits' do
      DEFAULT_RESULTS.times { create(:subreddit) }

      get "/api/v1/popular_subreddits", as: :json
      expect(JSON.parse(response.body)["subreddits"].size).to eq(DEFAULT_RESULTS)
    end

    it 'sorts subreddits by subscribers' do
      get "/api/v1/popular_subreddits", as: :json
      expect(
          JSON.parse(response.body)["subreddits"].map { |s| s["id"] }
      ).to eq(Subreddit.popular.limit(DEFAULT_RESULTS).map(&:id))
    end

    it 'returns the correct keys' do
      get "/api/v1/popular_subreddits", as: :json
      expected_keys = %w(id display_name display_name_prefixed icon icon_size)

      expect(JSON.parse(response.body)["subreddits"][0].keys).to eq(expected_keys)
    end
  end

  context 'with valid params' do
    let(:params) { { page: 2, max_results: 5 } }

    it 'returns a successful response' do
      get "/api/v1/popular_subreddits", params: params, as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct amount of results' do
      get "/api/v1/popular_subreddits", params:params, as: :json
      expect(JSON.parse(response.body)["subreddits"].size).to eq(5)
    end

    it 'returns the correct page sorted' do
      get "/api/v1/popular_subreddits", params: params, as: :json
      expect(
          JSON.parse(response.body)["subreddits"].map { |s| s["id"] }
      ).to eq(Subreddit.popular.page(2).per(5).map(&:id))
    end
  end

  context 'with too high max_result param' do
    let(:params) { { max_results: 100 } }

    it 'returns the default amount of subreddits' do
      get "/api/v1/popular_subreddits", params: params, as: :json
      expect(JSON.parse(response.body)["subreddits"].size).to eq(DEFAULT_RESULTS)
    end
  end

  context 'with non existent page number' do
    let(:params) { { page: 100 } }

    it 'returns no results' do
      get "/api/v1/popular_subreddits", params: params, as: :json
      expect(JSON.parse(response.body)["subreddits"].size).to eq(0)
    end
  end
end