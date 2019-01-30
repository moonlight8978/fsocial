module RequestHelpers
  def v1_headers
    {
      'Accept': 'application/json;version=1',
      'Content-Type': 'application/json',
      'Accept-Language': 'en'
    }
  end
end
