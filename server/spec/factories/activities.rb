FactoryBot.define do
  factory :post_activity, class: Activity.name do
    trackable { create(:post) }
    key { 'post.create' }
    owner { trackable.creator }
  end

  factory :reply_activity, class: Activity.name do
    trackable { create(:reply) }
    key { 'reply.create' }
    owner { trackable.creator }
  end
end
