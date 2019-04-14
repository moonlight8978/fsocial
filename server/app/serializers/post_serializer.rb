class PostOverallSerializer < ActiveModel::Serializer
  include SerializerHelpers::Auth

  attributes(
    :id,
    :content,
    :updated_at,
    :created_at,
    :root_id,
    :parent_id,
    :can_update,
    :can_destroy,
    :favorites_count,
    :shares_count,
    :replies_count
  )

  attribute :favorited?, key: :is_favorited
  attribute :shared?, key: :is_shared

  belongs_to :creator, serializer: ProfileOverallSerializer

  def favorited?
    favorited_post_ids = instance_options[:favorited_post_ids]
    favorited_post_ids ? favorited_post_ids.include?(object.id) : Favorite.exists?(creator: current_user, post: object)
  end

  def shared?
    shared_post_ids = instance_options[:shared_post_ids]
    shared_post_ids ? shared_post_ids.include?(object.id) : Sharing.exists?(creator: current_user, post: object)
  end
end

class PostSerializer < PostOverallSerializer
  has_many :medias, serializer: ::AttachmentSerializer

  class Item < PostSerializer
    belongs_to :root, serializer: PostOverallSerializer do |serializer|
      serializer.object.root
    end
    belongs_to :creator, serializer: FollowingUserSerializer
  end
end
