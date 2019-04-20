class ActivityStreamingJob < ApplicationJob
  queue_as :default

  def perform(current_user:, activity:)
    serialized_activity = ActiveModelSerializers::SerializableResource
      .new(
        activity,
        serializer: ::ActivitySerializer,
        scope: current_user,
        scope_name: :current_user
      )
      .as_json
    current_user.followers.select(:id).each do |follower|
      ActivitiesChannel.broadcast_to(follower, serialized_activity)
    end
  end
end
