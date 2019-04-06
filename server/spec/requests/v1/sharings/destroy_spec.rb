require 'rails_helper'

RSpec.describe 'V1::Sharings', type: :request do
  describe 'DELELE /v1/posts/:post_id/sharing' do
    let(:headers) { setup_auth(token) }

    subject { delete v1_post_sharing_path(postt.id), headers: headers }

    context 'when user is not signed in' do
      let(:token) { '' }
      let(:postt) { double(:post, id: 0) }

      include_examples 'unauthenticated'
    end

    context 'when user signed in' do
      let(:current_user) { create(:user) }
      let(:token) { Users::TokenGenerator.new(current_user).perform }

      context 'when post is not exist' do
        let(:postt) { double(:post, id: 0) }

        include_examples 'not found'
      end

      context 'when post is exist' do
        let(:postt) { create(:post) }

        context 'when post is not shared yet' do
          include_examples 'does not change db', Sharing
          include_examples 'does not change db', Activity

          include_examples 'no content'
        end

        context 'when post is already shared' do
          let!(:sharing) { create(:sharing, post: postt, creator: current_user) }
          let!(:activity) { Activities::Creator.new(sharing).perform(action: 'create', owner: current_user) }

          include_examples 'change db', Sharing, -1
          include_examples 'change db', Activity, -1

          include_examples 'success'
        end
      end
    end
  end
end
