require 'rails_helper'

RSpec.describe 'V1::Posts', type: :request do
  describe 'DELETE /v1/posts/:id' do
    let(:headers) { setup_auth(token) }

    subject { delete v1_post_path(postt), headers: headers }

    context 'when user is not creator' do
      let(:postt) { create(:post) }

      context 'when user is not signed' do
        let(:token) { '' }

        include_examples 'unauthenticated'
      end

      context 'when user is not creator' do
        let(:token) { Users::TokenGenerator.new(create(:user)).perform }

        include_examples 'unauthorized'
      end

      context 'when user is admin' do
        let(:token) { Users::TokenGenerator.new(create(:user, :admin)).perform }

        include_examples 'deleted'
      end
    end

    context 'when user is creator' do
      let(:token) { Users::TokenGenerator.new(create(:user, :admin)).perform }

      context 'when post is root post' do
        let(:postt) { create(:post, :activity) }
        let!(:replies) { create_list(:reply, 5, :activity, root: postt) }
        let!(:sub_replies) { create_list(:sub_reply, 5, :activity, root: postt, parent: replies.first) }

        include_examples 'deleted'

        it 'destroy all replies and sub replies' do
          expect { subject }.to change(Post, :count).by(-11)
        end
      end

      context 'when post is root reply' do

      end

      context 'when post is sub reply' do

      end
    end
  end
end
