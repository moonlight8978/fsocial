FactoryBot.define do
  factory :post do
    association :creator, factory: :user

    content { Faker::Lorem.paragraph }

    trait :with_root do
      association :root, factory: :post
    end

    trait :with_root_and_parent do
      association :root, factory: :post
      association :parent, factory: :post
    end

    trait :destroyed do
      deleted_at { 1.day.ago }
    end

    trait :activity do
      after(:create) { |post| Activity.create(trackable: post, key: 'post.create', owner: post.creator) }
    end
  end
end
