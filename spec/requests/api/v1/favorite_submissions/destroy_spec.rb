describe 'DELETE api/v1/favorite_submissions', type: :request do
  before :each do
    user = create(:user)
    submission = create(:submission, subreddit: create(:subreddit))
    create(:favorite_submission, user: user, submission: submission)
  end

  context 'when authenticated' do
    context 'with valid params' do
      let(:user) { User.first }
      let(:auth_headers) { user.create_new_auth_token }
      let(:params) {{ submission_fullname: Submission.first.reddit_fullname }}

      it 'returns success response' do
        delete "/api/v1/favorite_submissions", params: params, headers: auth_headers, as: :json
        expect(response).to have_http_status(:success)
      end

      it 'removes submission from user favorites' do
        expect {
          delete "/api/v1/favorite_submissions", params: params, headers: auth_headers, as: :json
        }.to change { user.submissions.count }.from(1).to(0)
      end
    end

    context 'with invalid params' do
      let(:user) { User.first }
      let(:auth_headers) { user.create_new_auth_token }
      let(:params) {{ submission_fullname: 'some other string' }}

      it 'returns success response' do
        delete "/api/v1/favorite_submissions", params: params, headers: auth_headers, as: :json
        expect(response).to have_http_status(:success)
      end

      it 'does not change user favorite count' do
        expect {
          delete "/api/v1/favorite_submissions", params: params, headers: auth_headers, as: :json
        }.to_not change { user.submissions.count }
      end
    end
  end

  context 'when not authenticated' do
    let(:params) {{ submission_fullname: Submission.first.reddit_fullname }}

    it 'returns unauthorized response' do
      post "/api/v1/favorite_submissions", params: params, as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end