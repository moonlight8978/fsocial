FactoryBot.define do
  factory :sharing do
    post
    association :creator, factory: :user
  end
end
