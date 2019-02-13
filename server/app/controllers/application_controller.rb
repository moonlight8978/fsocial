class ApplicationController < ActionController::API
  class Unauthenticated < StandardError; end

  before_action :set_locale

  rescue_from(
    Unauthenticated,
    Pundit::NotAuthorizedError,
    ActiveRecord::RecordNotFound,
    with: :render_error
  )

  rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid

  def set_locale
    locale = current_user.try(:language) || extract_locale_from_accept_language_header
    I18n.locale =
      if I18n.available_locales.include?(locale.try(:to_sym))
        locale
      else
        I18n.default_locale
      end
  end

  def current_user
    @current_user ||= current_user_id ? User.find_by_id(current_user_id) : nil
  end

  def authenticate!
    raise Unauthenticated unless current_user.present?
  end

  def signed_in?
    current_user.present?
  end

  private

  def extract_locale_from_accept_language_header
    locale_header.scan(/^[a-z]{2}/).first
  end

  def locale_header
    request_header('HTTP_ACCEPT_LANGUAGE')
  end

  def current_user_id
    Auth::Jwt.decode(extract_auth_token).try('[]', :user_id)
  end

  def extract_auth_token
    Auth::Jwt.extract_token(auth_header)
  end

  def auth_header
    request_header(Settings.auth.header)
  end

  def request_header(key)
    request.headers[key] || ''
  end

  def render_error(exception)
    key = exception.class.name.underscore
    status = Settings.http.statuses.errors[key || 'default']
    message =
      if I18n.exists?("errors.#{key}")
        I18n.t(key, scope: 'errors')
      else
        exception.message
      end
    render json: { error: message }, status: status
  end

  def render_record_invalid(exception)
    render(
      json: { errors: exception.record.errors.messages },
      status: Settings.http.statuses.errors['active_record/record_invalid']
    )
  end
end
