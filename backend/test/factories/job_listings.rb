FactoryBot.define do
  factory :job_listing do
    company
    title { Faker::Lorem.sentence }
    body { Faker::Lorem.sentence }
  end
end
