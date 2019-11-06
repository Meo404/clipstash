describe 'POST api/v1/auth/password', type: :request do
  let!(:user) { create(:user) }

  context 'with valid params' do
    let(:params) { { email: user.email, redirect_url: 'http://localhost:3000/' } }

    it 'returns a successful response' do
      post api_v1_user_password_path, params: params, as: :json
      expect(response).to have_http_status(:success)
    end

    it 'returns the user email' do
      post api_v1_user_password_path, params: params, as: :json
      expect(json[:message]).to match(/#{user.email}/)
    end

    it 'sends an email' do
      expect { post api_v1_user_password_path, params: params, as: :json }
          .to change { ActionMailer::Base.deliveries.count }.by(1)
    end
  end

  context 'with invalid params' do
    it 'does not return a successful response' do
      post api_v1_user_password_path, params: { email: 'notvalid@example.com',
                                         redirect_url: 'http://localhost:3000/' }, as: :json
      expect(response.status).to eq(404)
    end

    it 'does not send an email' do
      expect {
        post api_v1_user_password_path, params: { email: 'notvalid@example.com',
                                           redirect_url: 'http://localhost:3000/' }, as: :json
      }.to change { ActionMailer::Base.deliveries.count }.by(0)
    end
  end
end