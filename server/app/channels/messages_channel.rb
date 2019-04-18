class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "messages"
  end

  def unsubscribed
    byebug
    stop_all_streams
  end

  def create
    byebug
  end
end
