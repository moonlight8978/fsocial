class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :trackable_type, :trackable_id, :created_at

  belongs_to :trackable

  def self.serializer_for(model, options)
    case model.class.name
    when 'Post'
      return PostSerializer
    end
    super
  end
end
