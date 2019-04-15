FactoryBot.define do
  factory :hashtag do
    creator { create(:user) }

    sequence(:name) { |i| "#{Faker::Lorem.word}#{i}" }
  end
end
