FactoryBot.define do
  factory :user do
    sequence(:email) { |i| "email-#{i}@gmail.com" }
    sequence(:username) { |i| "username-#{i}" }
    identity { email }
    password { '1111' }

    role { :user }

    fullname { username }

    trait :admin do
      role { :admin }
    end
  end

  factory :user_with_activities do
    sequence(:email) { |i| "email_abc_#{i}@gmail.com" }
    sequence(:username) { |i| "username_abc_#{i}" }
    password { '1111' }
    fullname { username }

    after(:create) do |user|
      create_list(:post, 2, :activity, creator: user)
    end
  end
end
