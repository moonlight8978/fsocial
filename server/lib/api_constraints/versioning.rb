class ApiConstraints::Versioning
  def initialize(version)
    @version = version.to_s
  end

  def matches?(request)
    requested_version = get_accept_header(request).match(/version=(\d+)/).try('[]', 1)
    requested_version == @version
  end

  private

  def get_accept_header(request)
    request.headers['Accept'] || ''
  end
end
