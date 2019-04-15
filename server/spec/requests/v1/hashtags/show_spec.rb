require 'rails_helper'

RSpec.describe 'V1::Hashtags', type: :request do
  describe 'GET /v1/hashtags/:id' do
    subject { get v1_hashtag_path(hashtag.name) }

    context 'when hashtag is not found' do
      let(:hashtag) { double(:hashtag, name: 'not_exist') }

      include_examples 'not found'
    end

    context 'when hashtag is exist' do
      let(:hashtag) { create(:hashtag) }
      let!(:posts) { create_list(:tagged_post, 5, :activity, tags: [hashtag.name]) }

      include_examples 'success'
      include_examples 'match response schema', 'hashtag/detail'
      include_examples 'correct data', proc {
        include(activities: include(*posts.map do |postt|
          include(trackable: include(id: postt.id))
        end))
      }
    end
  end
end
