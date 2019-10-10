describe 'GET api/v1/submissions/show', type: :request do
  context 'with valid slug' do
    before :each do
      create(:submission, subreddit: create(:subreddit))
      create(:medium, submission: Submission.first, media_provider: create(:media_provider))
    end

    let(:submission) { Submission.first }

    it 'returns a successful response' do
      get "/api/v1/submission/#{submission.slug}", as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct submission' do
      get "/api/v1/submission/#{submission.slug}", as: :json
      expect(JSON.parse(response.body)["submission"]["reddit_fullname"]).to eq(submission.reddit_fullname)
    end
  end

  context 'with invalid slug' do
    it 'returns a not found response' do
      get "/api/v1/submission/test", as: :json
      expect(response).to have_http_status(:not_found)
    end

    it 'returns not found error message' do
      get "/api/v1/submission/test", as: :json
      expect(JSON.parse(response.body)["error"]).to eq("Not Found")
    end
  end
end
