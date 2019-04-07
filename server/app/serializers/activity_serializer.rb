class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :trackable_type, :trackable_id, :key

  attribute :updated_at, key: :created_at

  belongs_to :trackable do |serializer|
    serializer.object.tracked_object
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
