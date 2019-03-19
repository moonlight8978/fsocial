FactoryBot.define do
  factory :favorite do
    post
    association :creator, factory: :user
  end
end
