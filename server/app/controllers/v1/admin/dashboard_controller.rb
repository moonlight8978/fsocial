class V1::Admin::DashboardController < ApplicationController
  before_action :authenticate!, :authorize_admin!

  private

  def authorize_admin!
    authorize :dashboard, :base?
  end
end
