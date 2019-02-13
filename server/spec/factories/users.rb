FactoryBot.define do
  factory :user do
    sequence(:email) { |i| "email-#{i}@gmail.com" }
    sequence(:username) { |i| "username-#{i}" }
    identity { email }
    password { '1111' }
    role { :user }

    trait :admin do
      role { :admin }
    end
  end
end
