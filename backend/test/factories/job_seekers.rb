FactoryBot.define do
  factory :job_seeker do
    uid { SecureRandom.hex }
    email { Faker::Internet.email }
    after(:create) do |js|
      FactoryBot.create(:job_seeker_profile, job_seeker: js)
    end
  end
end
