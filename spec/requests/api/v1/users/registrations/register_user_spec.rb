describe 'POST api/v1/auth/', type: :request do
  let(:user)            { User.last }
  let(:failed_response) { 422 }

  describe 'POST create' do
    let(:user_name)              { 'test' }
    let(:email)                 { 'test@test.com' }
    let(:password)              { '12345678' }
    let(:password_confirmation) { '12345678' }

    let(:params) do
      {
          user: {
              user_name: user_name,
              email: email,
              password: password,
              password_confirmation: password_confirmation
          },
          confirm_success_url: "http://localhost:3000/"
      }
    end

    it 'returns a successful response' do
      post api_v1_user_registration_path, params: params, as: :json

      expect(response).to have_http_status(:success)
    end

    it 'creates the user' do
      expect {
        post api_v1_user_registration_path, params: params, as: :json
      }.to change(User, :count).by(1)
    end

    it 'returns the user' do
      post api_v1_user_registration_path, params: params, as: :json

      expect(json[:user][:id]).to eq(user.id)
      expect(json[:user][:email]).to eq(user.email)
      expect(json[:user][:user_name]).to eq(user.user_name)
      expect(json[:user][:uid]).to eq(user.uid)
      expect(json[:user][:provider]).to eq('email')
    end

    it 'sends registraion email' do
      expect { post api_v1_user_registration_path, params: params, as: :json}
          .to change { ActionMailer::Base.deliveries.count }.by(1)
    end

    context 'when the email is not correct' do
      let(:email) { 'invalid_email' }

      it 'does not create a user' do
        expect {
          post api_v1_user_registration_path, params: params, as: :json
        }.not_to change { User.count }
      end

      it 'does not return a successful response' do
        post api_v1_user_registration_path, params: params, as: :json

        expect(response.status).to eq(failed_response)
      end

      it 'does not send registraion email' do
        expect { post api_v1_user_registration_path, params: params, as: :json }
            .to change { ActionMailer::Base.deliveries.count }.by(0)
      end
    end

    context 'when the password is incorrect' do
      let(:password)              { 'short' }
      let(:password_confirmation) { 'short' }
      let(:new_user)              { User.find_by(email: email) }

      it 'does not create a user' do
        post api_v1_user_registration_path, params: params, as: :json

        expect(new_user).to be_nil
      end

      it 'does not return a successful response' do
        post api_v1_user_registration_path, params: params, as: :json

        expect(response.status).to eq(failed_response)
      end

      it 'does not send registraion email' do
        expect { post api_v1_user_registration_path, params: params, as: :json }
            .to change { ActionMailer::Base.deliveries.count }.by(0)
      end
    end

    context 'when passwords don\'t match' do
      let(:password)              { 'shouldmatch' }
      let(:password_confirmation) { 'dontmatch' }
      let(:new_user)              { User.find_by(email: email) }

      it 'does not create a user' do
        post api_v1_user_registration_path, params: params, as: :json

        expect(new_user).to be_nil
      end

      it 'does not return a successful response' do
        post api_v1_user_registration_path, params: params, as: :json

        expect(response.status).to eq(failed_response)
      end

      it 'does not send registraion email' do
        expect { post api_v1_user_registration_path, params: params, as: :json }
            .to change { ActionMailer::Base.deliveries.count }.by(0)
      end
    end
  end
end