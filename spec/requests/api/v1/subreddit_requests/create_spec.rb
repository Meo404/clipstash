describe 'POST api/v1/request_subreddit', type: :request do

  context 'when authenticated' do
    before :each do
      create(:user)
    end

    context 'with valid params' do
      let(:user) { User.first }
      let(:auth_headers) { user.create_new_auth_token }
      let(:params) {{ reddit_fullname: "t5_2rs5i", display_name: "Test subreddit", comment: "Test comment" }}

      it 'returns success response' do
        post "/api/v1/request_subreddit", params: params, headers: auth_headers, as: :json
        expect(response).to have_http_status(:success)
      end

      it 'changes submission report count by 1' do
        expect {
          post "/api/v1/request_subreddit", params: params, headers: auth_headers, as: :json
        }.to change { SubredditRequest.count }.by(1)
      end
    end

    context 'with invalid params' do
      let(:user) { User.first }
      let(:auth_headers) { user.create_new_auth_token }
      let(:params) {{ reddit_fullname: "", display_name: ""}}

      it 'returns not found response' do
        post "/api/v1/request_subreddit", params: params, headers: auth_headers, as: :json
        expect(response).to have_http_status(:bad_request)
      end

      it 'does not change submission report count' do
        expect {
          post "/api/v1/request_subreddit", params: params, headers: auth_headers, as: :json
        }.to_not change { SubredditRequest.count }
      end
    end

    context 'with duplicate subreddit' do
      let(:user) { User.first }
      let(:auth_headers) { user.create_new_auth_token }
      let(:subreddit) { create(:subreddit) }
      let(:params) {{ reddit_fullname: subreddit.reddit_fullname, display_name: "Test"}}

      it 'returns not found response' do
        post "/api/v1/request_subreddit", params: params, headers: auth_headers, as: :json
        expect(response).to have_http_status(:bad_request)
      end

      it 'does not change submission report count' do
        expect {
          post "/api/v1/request_subreddit", params: params, headers: auth_headers, as: :json
        }.to_not change { SubredditRequest.count }
      end
    end
  end

  context 'when not authenticated' do
    let(:params) {{ reddit_fullname: "t5_2rs5i", display_name: "Test subreddit", comment: "Test comment" }}

    it 'returns unauthorized response' do
      post "/api/v1/request_subreddit", params: params, as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end