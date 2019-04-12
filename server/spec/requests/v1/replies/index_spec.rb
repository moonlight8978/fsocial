require 'rails_helper'

RSpec.describe 'V1::Replies', type: :request do
  describe 'GET /v1/posts/:post_id/replies' do
    let(:headers) { setup_auth(token) }

    subject { get v1_post_replies_path(postt), headers: headers }

    describe 'auth' do
      let(:postt) { create(:post) }
      let(:replies) { create_list(:reply, 3, root: postt) }

      include_examples 'accept all requests'
    end

    describe 'response' do
      let(:token) { '' }

      context 'when post is not found' do
        let(:postt) { double(:post, id: 23) }

        include_examples 'not found'
      end

      context 'when post is sub replies' do
        let(:postt) { create(:sub_reply) }

        include_examples 'not found'
      end

      context 'when post is root post' do
        let(:postt) { create(:post) }
        let!(:replies) { create_list(:reply, 7, root: postt) }
        let!(:sub_replies) { create_list(:sub_reply, 3, root: postt, parent: replies.first) }

        it 'return correct number of replies' do
          subject
          expect(response_body.length).to eq(7)
        end

        include_examples 'match response schema', 'reply/list'

        include_examples 'correct data', proc {
          include(*replies.map { |reply| include(id: reply.id) })
        }
      end

      context 'when post is root reply' do
        let(:reply) { create(:reply) }
        let(:postt) { reply }
        let!(:more_replies) { create_list(:reply, 4, root: reply) }
        let!(:sub_replies) { create_list(:sub_reply, 7, root: reply.root, parent: reply) }

        it 'return correct number of replies' do
          subject
          expect(response_body.length).to eq(7)
        end

        include_examples 'match response schema', 'reply/list'

        include_examples 'correct data', proc {
          include(*sub_replies.map { |sub_reply| include(id: sub_reply.id) })
        }
      end
    end
  end
end
