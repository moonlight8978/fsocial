class HashtagSerializer < ActiveModel::Serializer
  attributes :id, :name, :description

  belongs_to :creator, serializer: ::ProfileOverallSerializer

  has_many :activities, serializer: ::ActivitySerializer do |serializer|
    serializer.object.activities
      .includes(post: [creator: [avatar_attachment: :blob]])
      .order(updated_at: :desc)
      .page(serializer.page)
  end

  def page
    instance_options[:page] || 1
  end
end
