describe 'GET api/v1/subreddits/recommended', type: :request do
  # API CONFIG uses low amounts for testing purposes
  # Check config/api_config.yml for adjustments
  let(:default_results) { Rails.configuration.api_config["subreddits"]["recommended"]["default_results"].to_i }

  before :each do
    media_provider = create(:media_provider)

    10.times do
      subreddit = create(:subreddit, status_cd: 1)
      submission = create(:submission,
                          subreddit: subreddit,
                          created_utc: Faker::Time.between(DateTime.now - 25, DateTime.now))
      create(:medium, submission: submission, media_provider: media_provider)
    end
  end

  it 'does not retrieve inactive subreddits' do
    Subreddit.update_all(status_cd: 0)

    get "/api/v1/recommended_subreddits/", as: :json
    expect(JSON.parse(response.body)["subreddits"].size).to eq(0)
  end

  context 'without params' do
    it 'returns a successful response' do
      get "/api/v1/recommended_subreddits/", as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the default amount of subreddits' do
      default_results.times { create(:subreddit) }

      get "/api/v1/recommended_subreddits/", as: :json
      expect(JSON.parse(response.body)["subreddits"].size).to eq(default_results)
    end

    it 'sorts subreddits by subscribers' do
      get "/api/v1/recommended_subreddits/", as: :json
      expect(
          JSON.parse(response.body)["subreddits"].map { |s| s["id"] }
      ).to eq(Subreddit.popular.limit(default_results).map(&:id))
    end

    it 'returns top 4 submissions of subreddits' do
      get "/api/v1/recommended_subreddits/", as: :json
      response_data = JSON.parse(response.body)["subreddits"]

      expect(
          response_data[0]["submissions"].map { |s| s["reddit_fullname"] }
      ).to eq(Submission.hot.where(subreddit_id: response_data[0]["id"]).limit(4).map(&:reddit_fullname))
    end
  end

  context 'with valid params' do
    let(:params) { { page: 2, max_results: 5 } }

    it 'returns a successful response' do
      get "/api/v1/recommended_subreddits/", params: params, as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct amount of results' do
      get "/api/v1/recommended_subreddits/", params: params, as: :json
      expect(JSON.parse(response.body)["subreddits"].size).to eq(5)
    end

    it 'returns the correct page sorted' do
      get "/api/v1/recommended_subreddits/", params: params, as: :json
      expect(
          JSON.parse(response.body)["subreddits"].map { |s| s["id"] }
      ).to eq(Subreddit.popular.page(2).per(5).map(&:id))
    end
  end

  context 'with too high max_result param' do
    let(:params) { { max_results: 100 } }

    it 'returns the default amount of subreddits' do
      get "/api/v1/recommended_subreddits/", params: params, as: :json
      expect(JSON.parse(response.body)["subreddits"].size).to eq(default_results)
    end
  end

  context 'with non existent page number' do
    let(:params) { { page: 100 } }

    it 'returns no results' do
      get "/api/v1/recommended_subreddits/", params: params, as: :json
      expect(JSON.parse(response.body)["subreddits"].size).to eq(0)
    end
  end

  it 'only returns subreddits with submissions in the last month' do
    10.times do
      submission = create(:submission,
             subreddit: Subreddit.first,
             created_utc: 1.year.ago.in_time_zone("UTC"))
      create(:medium, submission: submission, media_provider: MediaProvider.first)
    end

    get "/api/v1/recommended_subreddits/", params: { max_results: 25 }, as: :json
    expect(JSON.parse(response.body)["subreddits"].size).to eq(10)
  end
end