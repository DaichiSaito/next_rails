FirebaseIdToken.configure do |config|
  uri = URI.parse(ENV['REDIS_URL'])
  config.redis = Redis.new(host: uri.host, port: uri.port)
  config.project_ids = ['go-to-gym-dev']
end
