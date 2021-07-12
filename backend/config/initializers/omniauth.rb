Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, Rails.application.credentials.dig(:github, :client_id), Rails.application.credentials.dig(:github, :secret), scope: 'user:email'
end
