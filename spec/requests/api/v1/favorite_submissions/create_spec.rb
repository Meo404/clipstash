describe 'POST api/v1/favorite_submissions', type: :request do

  context 'when authenticated' do
    before :each do
      create(:user)
      create(:submission, subreddit: create(:subreddit))
    end

    context 'with valid params' do
      let(:user) { User.first }
      let(:auth_headers) { user.create_new_auth_token }
      let(:params) {{ submission_fullname: Submission.first.reddit_fullname }}

      it 'returns success response' do
        post "/api/v1/favorite_submissions", params: params, headers: auth_headers, as: :json
        expect(response).to have_http_status(:success)
      end

      it 'adds submission to user favorites' do
        expect {
          post "/api/v1/favorite_submissions", params: params, headers: auth_headers, as: :json
        }.to change { user.submissions.count }.by(1)
      end
    end

    context 'with invalid params' do
      let(:user) { User.first }
      let(:auth_headers) { user.create_new_auth_token }
      let(:params) {{ submission_fullname: 'some other string' }}

      it 'returns not found response' do
        post "/api/v1/favorite_submissions", params: params, headers: auth_headers, as: :json
        expect(response).to have_http_status(:not_found)
      end

      it 'does not change user favorite count' do
        expect {
          post "/api/v1/favorite_submissions", params: params, headers: auth_headers, as: :json
        }.to_not change { user.submissions.count }
      end
    end
  end

  context 'when not authenticated' do
    before :each do
      create(:submission, subreddit: create(:subreddit))
    end

    let(:params) {{ submission_fullname: Submission.first.reddit_fullname }}

    it 'returns unauthorized response' do
      post "/api/v1/favorite_submissions", params: params, as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end