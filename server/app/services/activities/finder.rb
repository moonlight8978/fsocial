module Activities
  class Finder
    attr_reader :model, :klass, :class_name

    def initialize(model, class_name = model.class.name)
      @model = model
      @klass = model.class
      @class_name = class_name
    end

    def tracked
      keys = klass.tracked_actions.map { |action| [class_name, action].join('.') }
      klass.where(key: keys)
    end

    def untracked
      keys = klass.tracked_actions.map { |action| [class_name, action].join('.') }
      klass.where.not(key: keys)
    end
  end
end
