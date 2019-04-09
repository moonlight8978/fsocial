module SerializerHelpers::PostMetadata
  extend ActiveSupport::Concern

  included do
    attribute :favorited?, key: :is_favorited
    attribute :shared?, key: :is_shared
  end

  def favorited?
    favorited_post_ids = instance_options[:favorited_post_ids]
    favorited_post_ids ? favorited_post_ids.include?(object.id) : Favorite.exists?(creator: current_user, post: object)
  end

  def shared?
    shared_post_ids = instance_options[:shared_post_ids]
    shared_post_ids ? shared_post_ids.include?(object.id) : Sharing.exists?(creator: current_user, post: object)
  end
end
