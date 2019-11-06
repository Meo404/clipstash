describe 'GET api/v1/subreddits/index', type: :request do
  # API CONFIG uses low amounts for testing purposes
  # Check config/api_config.yml for adjustments
  let(:default_results) { Rails.configuration.api_config["subreddits"]["index"]["default_results"].to_i }

  before :each do
    10.times { create(:subreddit, status_cd: 1) }
  end

  it 'does not retrieve inactive subreddits' do
    Subreddit.update_all(status_cd: 0)

    get api_v1_subreddits_path, as: :json
    expect(JSON.parse(response.body)["subreddits"].size).to eq(0)
  end

  context 'without params' do
    it 'returns a successful response' do
      get api_v1_subreddits_path, as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the default amount of subreddits' do
      default_results.times { create(:subreddit, status_cd: 1) }

      get api_v1_subreddits_path, as: :json
      expect(JSON.parse(response.body)["subreddits"].size).to eq(default_results)
    end

    it 'sorts subreddits by subscribers' do
      get api_v1_subreddits_path, as: :json
      expect(
          JSON.parse(response.body)["subreddits"].map { |h| h["subscribers"] }
      ).to eq(Subreddit.actives.popular.limit(default_results).map(&:subscribers))
    end

    it 'returns the correct keys' do
      get api_v1_subreddits_path, as: :json
      expected_keys = %w(id display_name display_name_prefixed subscribers icon icon_size)

      expect(JSON.parse(response.body)["subreddits"][0].keys).to eq(expected_keys)
    end
  end

  context 'with valid params' do
    let(:params) { { page: 2, max_results: 5 } }

    it 'returns a successful response' do
      get api_v1_subreddits_path, params: params, as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct amount of results' do
      get api_v1_subreddits_path, params:params, as: :json
      expect(JSON.parse(response.body)["subreddits"].size).to eq(5)
    end

    it 'returns the correct page sorted' do
      get api_v1_subreddits_path, params: params, as: :json
      expect(
          JSON.parse(response.body)["subreddits"].map { |h| h["subscribers"] }
      ).to eq(Subreddit.popular.page(2).per(5).map(&:subscribers))
    end
  end

  context 'with too high max_result param' do
    let(:params) { { max_results: 100 } }

    it 'returns the default amount of subreddits' do
      get api_v1_subreddits_path, params: params, as: :json
      expect(JSON.parse(response.body)["subreddits"].size).to eq(default_results)
    end
  end

  context 'with non existent page number' do
    let(:params) { { page: 100 } }

    it 'returns no results' do
      get api_v1_subreddits_path, params: params, as: :json
      expect(JSON.parse(response.body)["subreddits"].size).to eq(0)
    end
  end
end