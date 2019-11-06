describe 'PUT api/v1/auth/password/', type: :request do
  let(:user) { create(:user, password: 'mypass123', confirmed_at: '2019-03-03') }
  let(:password_token) { user.send(:set_reset_password_token) }
  let(:new_password) { '123456789' }

  context 'with valid auth credentials' do
    let(:headers) do
      params = {
          user: {
              email: user.email,
              password: 'mypass123'
          }
      }
      post api_v1_user_session_path, params: params, as: :json

      {
          'access-token': response.header['access-token'],
          uid: response.header['uid'],
          client: response.header['client']
      }
    end

    let(:params) do
      {
          password: new_password,
          password_confirmation: new_password
      }
    end

    context 'with valid params' do
      it 'returns a successful response' do
        put api_v1_user_password_path, params: params, headers: headers, as: :json
        expect(response).to have_http_status(:success)
      end
    end

    context 'with invalid params' do
      it 'does not change the password if confirmation does not match' do
        params[:password_confirmation] = 'anotherpass'
        put api_v1_user_password_path, params: params, headers: headers, as: :json
        expect(response.status).to eq(422)
      end
    end
  end

  context 'with password reset token' do
    let(:params) do
      {
          password: new_password,
          password_confirmation: new_password,
          reset_password_token: password_token
      }
    end

    context 'with valid params' do
      it 'returns a successful response' do
        put api_v1_user_password_path, params: params, as: :json
        expect(response).to have_http_status(:success)
      end
    end

    context 'with invalid params' do
      it 'does not change the password if confirmation does not match' do
        params[:password_confirmation] = 'anotherpass'
        put api_v1_user_password_path, params: params, as: :json
        expect(response.status).to eq(422)
      end
    end
  end
end
