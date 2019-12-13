describe 'POST api/v1/report_submission', type: :request do

  context 'when authenticated' do
    before :each do
      create(:user)
      create(:submission, subreddit: create(:subreddit))
    end

    context 'with valid params' do
      let(:user) { User.first }
      let(:auth_headers) { user.create_new_auth_token }
      let(:params) {{ submission_fullname: Submission.first.reddit_fullname, reason: 'Reported' }}

      it 'returns success response' do
        post "/api/v1/report_submission", params: params, headers: auth_headers, as: :json
        expect(response).to have_http_status(:success)
      end

      it 'changes submission report count by 1' do
        expect {
          post "/api/v1/report_submission", params: params, headers: auth_headers, as: :json
        }.to change { SubmissionReport.count }.by(1)
      end
    end

    context 'with invalid params' do
      let(:user) { User.first }
      let(:auth_headers) { user.create_new_auth_token }
      let(:params) {{ submission_fullname: 'some other string' }}

      it 'returns not found response' do
        post "/api/v1/report_submission", params: params, headers: auth_headers, as: :json
        expect(response).to have_http_status(:not_found)
      end

      it 'does not change submission report count' do
        expect {
          post "/api/v1/report_submission", params: params, headers: auth_headers, as: :json
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