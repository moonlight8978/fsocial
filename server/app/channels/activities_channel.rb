class ActivitiesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'activities'
  end

  def unsubscribed
    stop_all_streams
  end
end
