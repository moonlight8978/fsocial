require_relative './factory_helpers'

FactoryBot.define do
  factory :memory_tagging do
    blob { FactoryHelpers.create_blob(filename: 'un-trump.jpg') }
    vertices { Array.new(4).map { { x: rand(200), y: rand(400) } } }
    description { Faker::Lorem.paragraph }
  end
end
