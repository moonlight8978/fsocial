class V1::Admin::UsersController < V1::Admin::DashboardController
  def index
    search = User.ransack(username_or_email_cont: params[:q])
    search.sorts = 'id asc'
    users = search.result.page(params[:page] || 1)
    render json: users, each_serializer: ::ProfileSerializer, status: Settings.http.statuses.success
  end

  def update
    user = User.where.not(id: current_user.id).find(params[:id])
    user_params = ::Admin::Users::UpdateParameters.new(params).extract
    user.update!(user_params)
    render json: user, serializer: ::ProfileSerializer, status: Settings.http.statuses.updated.success
  end
end
