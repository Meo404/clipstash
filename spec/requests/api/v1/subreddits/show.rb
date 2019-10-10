describe 'GET api/v1/subreddits/show', type: :request do
  context 'with valid display name' do
    let(:subreddit) { create(:subreddit, display_name: "testsub") }

    it 'returns a successful response' do
      get "/api/v1/subreddits/#{subreddit.display_name}", as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct subreddit' do
      get "/api/v1/subreddits/#{subreddit.display_name}", as: :json
      expect(JSON.parse(response.body)["subreddit"]["display_name"]).to eq(subreddit.display_name)
    end
  end

  context 'with invalid display name' do
    before :each do
      create(:subreddit, display_name: "testsub")
    end

    it 'returns a not found response' do
      get "/api/v1/subreddits/test", as: :json
      expect(response).to have_http_status(:not_found)
    end

    it 'returns not found error message' do
      get "/api/v1/subreddits/test", as: :json
      expect(JSON.parse(response.body)["error"]).to eq("Not Found")
    end
  end
end