describe 'GET api/v1/related_submissions/:slug', type: :request do
  # API CONFIG uses low amounts for testing purposes
  # Check config/api_config.yml for adjustments
  let(:default_results) {Rails.configuration.api_config["submissions"]["related"]["default_results"].to_i}

  before :each do
    media_provider = create(:media_provider)
    subreddit = create(:subreddit)

    15.times do
      submission = create(:submission, subreddit: subreddit)
      create(:medium, submission: submission, media_provider: media_provider)
    end
  end

  context 'with slug param' do
    let(:submission) {Submission.hot.first}

    it 'returns a successful response' do
      get "/api/v1/related_submissions/#{submission.slug}", as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct submissions' do
      get "/api/v1/related_submissions/#{submission.slug}", as: :json
      expect(
          JSON.parse(response.body)["submissions"].map {|s| s["reddit_fullname"]}
      ).to eq(Submissions::Search::FindRelatedSubmissions.call(submission.slug, nil)
                  .page(1)
                  .per(default_results)
                  .map(&:reddit_fullname)
           )
    end
  end

  context 'with valid sorting params' do
    let(:submission) {Submission.hot.first}

    it 'returns the correct submissions based on sort method' do
      get "/api/v1/related_submissions/#{submission.slug}", params: {sort: "top_month"}, as: :json
      expect(
          JSON.parse(response.body)["submissions"].map {|s| s["score"]}
      ).to eq(Submissions::Search::FindRelatedSubmissions.call(submission.slug, "top_month")
                  .page(1)
                  .per(default_results)
                  .map(&:score)
           )
    end
  end

  context 'with valid pagination params' do
    let(:submission) {Submission.hot.first}
    let(:params) {{page: 2, max_results: 5}}

    it 'returns a successful response' do
      get "/api/v1/related_submissions/#{submission.slug}", params: params, as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct amount of results' do
      get "/api/v1/related_submissions/#{submission.slug}", params: params, as: :json
      expect(JSON.parse(response.body)["submissions"].size).to eq(5)
    end

    it 'returns the correct page sorted' do
      get "/api/v1/related_submissions/#{submission.slug}", params: params, as: :json
      expect(
          JSON.parse(response.body)["submissions"].map {|s| s["reddit_fullname"]}
      ).to eq(Submissions::Search::FindRelatedSubmissions.call(submission.slug, nil)
                  .page(2)
                  .per(5)
                  .map(&:reddit_fullname)
           )
    end
  end

  context 'with too high max_result param' do
    let(:submission) {Submission.hot.first}
    let(:params) {{max_results: 100}}

    it 'returns the default amount of submissions' do
      get "/api/v1/related_submissions/#{submission.slug}", params: params, as: :json
      expect(JSON.parse(response.body)["submissions"].size).to eq(default_results)
    end
  end

  context 'with non existent page number' do
    let(:submission) {Submission.hot.first}
    let(:params) {{page: 100}}

    it 'returns no results' do
      get "/api/v1/related_submissions/#{submission.slug}", params: params, as: :json
      expect(JSON.parse(response.body)["submissions"].size).to eq(0)
    end
  end
end