class V1::TestsController < ApplicationController
  def index
    byebug if Rails.env.development? # rubocop:disable Lint/Debugger
  end

  def create
    byebug if Rails.env.development? # rubocop:disable Lint/Debugger
  end

  def destroy
    byebug if Rails.env.development? # rubocop:disable Lint/Debugger
  end
end
