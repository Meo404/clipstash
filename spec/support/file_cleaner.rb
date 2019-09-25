RSpec.configure do |config|
  config.after(:each) do
    FileUtils.rm_rf(Dir["#{Rails.root}/spec/support/uploads"])
  end
end