require 'rails_helper'

RSpec.describe 'V1::Hashtags', type: :request do
  describe 'GET /v1/hashtags/popular' do
    let!(:hashtags) do
      hashtag1 = create(:hashtag) # hashtag1 has 3 post
      hashtag2 = create(:hashtag) # hashtag2 has 2 post
      hashtag3 = create(:hashtag) # hashtag3 has 3 post
      hashtag4 = create(:hashtag) # hashtag4 has 5 post
      hashtag5 = create(:hashtag) # hashtag5 has 4 post
      rest_hashtags = create_list(:hashtag, 5) # hashtag1 has 1 post

      create_list(:tagged_post, 3, tags: [hashtag1.name, hashtag3.name])
      create_list(:tagged_post, 2, tags: [hashtag2.name])
      create_list(:tagged_post, 4, tags: [hashtag4.name, hashtag5.name])
      create_list(:tagged_post, 1, tags: [hashtag4.name])

      [hashtag1, hashtag2, hashtag3, hashtag4, hashtag5]
    end

    subject { get popular_v1_hashtags_path }

    include_examples 'success'
    include_examples 'match response schema', 'hashtag/list'

    it 'return 5 hashtags has most posts' do
      subject

      expected_hashtags = [hashtags[3], hashtags[4], hashtags[2], hashtags[0], hashtags[1]]
      expect(response_body.pluck(:id)).to eq(expected_hashtags.pluck(:id))
    end
  end
end
