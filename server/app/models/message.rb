class Message < ApplicationRecord
  belongs_to :creator
  belongs_to :conversation, touch: true

  validates :content, presence: true
end
