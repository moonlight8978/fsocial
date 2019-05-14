class MemoryTagging < ApplicationRecord
  belongs_to :memory, optional: true
  belongs_to :blob, class_name: ActiveStorage::Blob.name

  serialize :vertices, Array

  validates :vertices, presence: true
  validates :memory, presence: true, on: :update
end
