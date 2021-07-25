FactoryBot.define do
  factory :portfolio do
    title { Faker::Lorem.sentence }
    body { Faker::Lorem.sentence }
    published_on { Time.current.to_date }
    github_url { Faker::Internet.url }
    service_url { Faker::Internet.url }
    job_seeker
  end
end
