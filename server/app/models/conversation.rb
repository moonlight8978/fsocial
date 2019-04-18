class Conversation < ApplicationRecord
  belongs_to :creator
  belongs_to :participant

  validate :conversation_must_be_unique, on: :create

  def conversation_must_be_unique
    existed = Conversation.where(creator: creator, participant: participant)
      .or(Conversation.where(participant: creator, creator: participant))
      .exist?
    errors.add(:participant, :taken) if existed
  end
end
