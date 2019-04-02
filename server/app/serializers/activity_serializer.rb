class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :trackable_type, :trackable_id, :key

  attribute :updated_at, key: :created_at

  belongs_to :trackable do |serializer|
    case serializer.object.trackable_type
    when 'Post'
      serializer.object.post
    when 'Sharing'
      serializer.object.sharing
    when 'Favorite'
      serializer.object.favorite
    else
      serializer.object.trackable
    end
  end

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
