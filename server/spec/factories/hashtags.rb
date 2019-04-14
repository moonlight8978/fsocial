FactoryBot.define do
  factory :hashtag do
    sequence(:name) { |i| "#{Faker::Lorem.word}#{i}" }
  end
end
