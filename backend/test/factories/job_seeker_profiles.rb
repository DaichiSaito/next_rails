FactoryBot.define do
  factory :job_seeker_profile do
    job_seeker { nil }
    name { Faker::Name.name }
  end
end
