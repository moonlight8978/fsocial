require_relative './factory_helpers'

FactoryBot.define do
  factory :memory do
    creator { create(:user) }
    content { Faker::Lorem.paragraph }

    after(:build) do |memory|
      memory.picture.attach(FactoryHelpers.get_attachment(filename: 'un-trump.jpg'))
      create_list(:memory_tagging, 4, memory: memory, blob: memory.picture.blob)
    end
  end
end
