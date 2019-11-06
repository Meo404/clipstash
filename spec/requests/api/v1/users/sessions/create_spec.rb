describe 'POST api/v1/auth/sign_in', type: :request do
  let(:password) { 'password' }
  let(:user) { create(:user, password: password, confirmed_at: '2019-11-03') }

  context 'with correct params' do
    before do
      params = {
          user:
              {
                  email: user.email,
                  password: password
              }
      }
      post api_v1_user_session_path, params: params, as: :json
    end

    it 'returns success' do
      expect(response).to be_successful
    end

    it 'returns the user' do
      expect(json[:user][:id]).to eq(user.id)
      expect(json[:user][:email]).to eq(user.email)
      expect(json[:user][:user_name]).to eq(user.user_name)
      expect(json[:user][:uid]).to eq(user.uid)
      expect(json[:user][:provider]).to eq('email')
    end

    it 'returns a valid client and access token' do
      token = response.header['access-token']
      client = response.header['client']
      expect(user.reload.valid_token?(token, client)).to be_truthy
    end
  end

  context 'with incorrect params' do
    it 'return errors upon failure' do
      params = {
          user: {
              email: user.email,
              password: 'wrong_password!'
          }
      }
      post api_v1_user_session_path, params: params, as: :json

      expect(response).to be_unauthorized
      expected_response = {
          error: 'Invalid login credentials. Please try again.'
      }.with_indifferent_access
      expect(json).to eq(expected_response)
    end
  end
end