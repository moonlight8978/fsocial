Rails.configuration.middleware.insert(0, Rack::VCR) if Rails.env.test?
