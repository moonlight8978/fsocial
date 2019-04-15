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
      after(:create) { |post| create(:post_activity, trackable: post) }
    end
  end

  factory :reply, class: Post.name do
    association :root, factory: :post
    association :creator, factory: :user

    content { Faker::Lorem.paragraph }

    trait :activity do
      after(:create) { |reply| create(:reply_activity, trackable: reply) }
    end
  end

  factory :sub_reply, class: Post.name do
    root { create(:post) }
    parent { create(:post, root: root) }
    creator { create(:user) }

    content { Faker::Lorem.paragraph }

    trait :activity do
      after(:create) { |reply| create(:reply_activity, trackable: reply) }
    end
  end

  factory :tagged_post, class: Post.name do
    transient do
      tags { [] }
    end

    creator { create(:user) }
    content do
      [
        Faker::Lorem.paragraph,
        tags.map { |name| "##{name}" }.join(' ')
      ].select(&:present?).join(' ')
    end

    after(:create) do |post, evaluator|
      evaluator.tags.each do |name|
        hashtag = Hashtag.find_by(name: name) || create(:hashtag, name: name, creator: post.creator)
        create(:tagging, post: post, hashtag: hashtag)
      end
    end

    trait :activity do
      after(:create) { |post| create(:post_activity, trackable: post) }
    end
  end
end
