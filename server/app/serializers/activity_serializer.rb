class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :trackable_type, :trackable_id, :key, :created_at

  belongs_to :trackable

  def self.serializer_for(model, options)
    case model.class.name
    when 'Post'
      PostSerializer
    when 'Sharing'
      SharingSerializer
    when 'Favorite'
      FavoriteSerializer
    else
      super
    end
  end
end
