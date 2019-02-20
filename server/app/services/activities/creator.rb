module Activities
  class Creator
    attr_reader :model, :class_name

    def initialize(model, class_name = model.class.name)
      @model = model
      @class_name = class_name
    end

    def perform(action:, owner:, params: nil, recipient: nil)
      model.activities.create do |activity|
        activity.owner = owner
        activity.recipient = recipient
        activity.params = params
        activity.key = [class_name.underscore, action].join('.')
      end
    end
  end
end
