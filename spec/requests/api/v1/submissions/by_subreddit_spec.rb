describe 'GET api/v1/submissions/:display_name', type: :request do
  # API CONFIG uses low amounts for testing purposes
  # Check config/api_config.yml for adjustments
  let(:default_results) { Rails.configuration.api_config["submissions"]["by_subreddit"]["default_results"].to_i }

  before :each do
    media_provider = create(:media_provider)
    subreddit = create(:subreddit)

    10.times do
      submission = create(:submission, subreddit: subreddit)
      create(:medium, submission: submission, media_provider: media_provider)
    end
  end

  context 'with display_name param' do
    let(:subreddit) { Subreddit.first }
    let(:media_provider) { MediaProvider.first }

    it 'returns a successful response' do
      get "/api/v1/submissions/#{subreddit.display_name}", as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the default amount of submissions' do
      default_results.times do
        submission = create(:submission, subreddit: subreddit)
        create(:medium, submission: submission, media_provider: media_provider)
      end

      get "/api/v1/submissions/#{subreddit.display_name}", as: :json
      expect(JSON.parse(response.body)["submissions"].size).to eq(default_results)
    end

    it 'returns the correct submissions' do
      get "/api/v1/submissions/#{subreddit.display_name}", as: :json
      expect(
          JSON.parse(response.body)["submissions"].map { |s| s["reddit_fullname"] }
      ).to eq(Submissions::Search.call(subreddit, nil, nil).limit(default_results).map(&:reddit_fullname))
    end
  end

  context 'with valid sorting params' do
    let(:subreddit) { Subreddit.first }
    let(:submission) { Submission.hot.first }

    it 'returns the correct submissions based on sort method' do
      get "/api/v1/submissions/#{subreddit.display_name}", params: { sort: "top_month" }, as: :json
      expect(
          JSON.parse(response.body)["submissions"].map { |s| s["reddit_fullname"] }
      ).to eq(Submissions::Search.call(subreddit, "top_month", nil).limit(default_results).map(&:reddit_fullname))
    end

    it 'returns the correct submissions based on after score' do
      get "/api/v1/submissions/#{subreddit.display_name}", params: { after_score: submission.hot_score }, as: :json
      expected_result = Submissions::Search.call(subreddit, nil, submission.hot_score)
                            .limit(default_results)
                            .map(&:reddit_fullname)

      expect(JSON.parse(response.body)["submissions"].map { |s| s["reddit_fullname"] }).to eq(expected_result)
    end
  end

  context 'with valid pagination params' do
    let(:subreddit) { Subreddit.first }
    let(:params) { { page: 2, max_results: 5 } }

    it 'returns a successful response' do
      get "/api/v1/submissions/#{subreddit.display_name}", params: params, as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct amount of results' do
      get "/api/v1/submissions/#{subreddit.display_name}", params: params, as: :json
      expect(JSON.parse(response.body)["submissions"].size).to eq(5)
    end

    it 'returns the correct page sorted' do
      get "/api/v1/submissions/#{subreddit.display_name}", params: params, as: :json
      expect(
          JSON.parse(response.body)["submissions"].map { |s| s["reddit_fullname"] }
      ).to eq(Submissions::Search.call(subreddit, nil, nil).page(2).per(5).map(&:reddit_fullname))
    end
  end

  context 'with too high max_result param' do
    let(:subreddit) { Subreddit.first }
    let(:params) { { max_results: 100 } }

    it 'returns the default amount of submissions' do
      get "/api/v1/submissions/#{subreddit.display_name}", params: params, as: :json
      expect(JSON.parse(response.body)["submissions"].size).to eq(default_results)
    end
  end

  context 'with non existent page number' do
    let(:subreddit) { Subreddit.first }
    let(:params) { { page: 100 } }

    it 'returns no results' do
      get "/api/v1/submissions/#{subreddit.display_name}", params: params, as: :json
      expect(JSON.parse(response.body)["submissions"].size).to eq(0)
    end
  end
end