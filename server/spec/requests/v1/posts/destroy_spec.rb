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
      let!(:conversation) do
        create(:tagged_post, :activity, tags: %w[depzai 20cm]).tap do |postt|
          replies = create_list(:reply, 5, :activity, root: postt)
          sub_replies = create_list(:sub_reply, 5, :activity, root: postt, parent: replies.first)
          create_list(:report_post, 2, reportable: postt)
          create_list(:report_post, 2, reportable: replies.first)
          create_list(:report_post, 2, reportable: sub_replies.first)
        end
      end

      context 'when post is root post' do
        let(:postt) { conversation }

        include_examples 'deleted'

        it 'destroy all replies and sub replies' do
          expect { subject }.to change(Post, :count).by(-11)
        end

        it 'destroy all activities related' do
          expect { subject }.to change(Activity, :count).by(-11)
        end

        include_examples 'change db', Tagging, -2

        it 'reduce the posts count of hashtag' do
          expect { subject }.to change(Hashtag.find_by(name: 'depzai').posts.reload, :count).by(-1)
        end

        include_examples 'change db', Report, -6
      end

      context 'when post is root reply' do
        let(:postt) { conversation.replies.first }

        include_examples 'deleted'

        it 'destroy all its sub replies' do
          expect { subject }.to change(Post, :count).by(-6)
        end

        it 'destroy all activities related' do
          expect { subject }.to change(Activity, :count).by(-6)
        end

        include_examples 'change db', Report, -4
      end

      context 'when post is sub reply' do
        let(:postt) { conversation.replies.first.sub_replies.first }

        include_examples 'deleted'

        it 'destroy requested post only' do
          expect { subject }.to change(Post, :count).by(-1)
        end

        it 'destroy all activities related' do
          expect { subject }.to change(Activity, :count).by(-1)
        end

        include_examples 'change db', Report, -2
      end
    end
  end
end
