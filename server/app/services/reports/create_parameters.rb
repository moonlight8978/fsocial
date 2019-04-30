class Reports::CreateParameters
  attr_reader :params, :controller, :reportable_type

  def initialize(params, reportable_type, controller = nil)
    @params = params
    @controller = controller
    @reportable_type = reportable_type
  end

  def perform!
    params.require(:report).permit(:message)
      .merge(
        reportable: reportable_class.find(params[:id]),
        reporter: controller.current_user
      )
      .permit!
  end

  def reportable_class
    case reportable_type
    when Post.name
      Post
    when User.name
      User
    else
      raise 'Not a valid reportable type'
    end
  end
end
