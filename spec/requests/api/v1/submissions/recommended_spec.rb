describe 'GET api/v1/submissions/recommended', type: :request do
  # API CONFIG uses low amounts for testing purposes
  # Check config/api_config.yml for adjustments
  let(:default_results) { Rails.configuration.api_config["submissions"]["recommended"]["default_results"].to_i }

  before :each do
    media_provider = create(:media_provider)

    10.times do
      subreddit = create(:subreddit)
      submission = create(:submission, subreddit: subreddit)
      create(:medium, submission: submission, media_provider: media_provider)
    end
  end

  context 'without params' do
    let(:subreddit) { Subreddit.first }
    let(:media_provider) { MediaProvider.first }

    it 'returns a successful response' do
      get "/api/v1/recommended_submissions/", as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the default amount of submissions' do
      default_results.times do
        submission = create(:submission, subreddit: subreddit)
        create(:medium, submission: submission, media_provider: media_provider)
      end

      get "/api/v1/recommended_submissions/", as: :json
      expect(JSON.parse(response.body)["submissions"].size).to eq(default_results)
    end

    it 'sorts submissions by hot_score' do
      get "/api/v1/recommended_submissions/", as: :json
      expect(
          JSON.parse(response.body)["submissions"].map { |s| s["hot_score"] }
      ).to eq(Submission.hot.has_medium.limit(default_results).map(&:hot_score))
    end
  end

  context 'with valid params' do
    let(:params) { { page: 2, max_results: 5 } }

    it 'returns a successful response' do
      get "/api/v1/recommended_submissions/", params: params, as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct amount of results' do
      get "/api/v1/recommended_submissions/", params:params, as: :json
      expect(JSON.parse(response.body)["submissions"].size).to eq(5)
    end

    it 'returns the correct page sorted' do
      get "/api/v1/recommended_submissions/", params: params, as: :json
      expect(
          JSON.parse(response.body)["submissions"].map { |s| s["reddit_fullname"] }
      ).to eq(Submission.hot.has_medium.page(2).per(5).map(&:reddit_fullname))
    end
  end

  context 'with too high max_result param' do
    let(:params) { { max_results: 100 } }

    it 'returns the default amount of submissions' do
      get "/api/v1/recommended_submissions/", params: params, as: :json
      expect(JSON.parse(response.body)["submissions"].size).to eq(default_results)
    end
  end

  context 'with non existent page number' do
    let(:params) { { page: 100 } }

    it 'returns no results' do
      get "/api/v1/recommended_submissions/", params: params, as: :json
      expect(JSON.parse(response.body)["submissions"].size).to eq(0)
    end
  end
end