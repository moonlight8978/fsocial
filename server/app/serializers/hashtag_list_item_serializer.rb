class HashtagListItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :posts_count
end
