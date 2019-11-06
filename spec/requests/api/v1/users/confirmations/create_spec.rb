describe 'POST api/v1/auth/confirmation', type: :request do
  let!(:user) { create(:user, confirmed_at: nil) }

  context 'with valid email' do
    let(:params) {
      {
          email: user.email,
          redirect_url: "http://localhost:3000"
      }
    }

    it 'returns a successful response' do
      post api_v1_user_confirmation_path, params: params
      expect(response).to be_successful
    end

    it 'resends confirmation email' do
      expect { post api_v1_user_confirmation_path, params: params, as: :json }
          .to change { ActionMailer::Base.deliveries.count }.by(1)
    end
  end

  context 'with invalid email' do
    let(:params) {
      {
          email: 'another@mail.com',
          redirect_url: "http://localhost:3000"
      }
    }

    it 'returns not found response' do
      post api_v1_user_confirmation_path, params: params
      expect(response.status).to eq(404)
    end
  end
end
