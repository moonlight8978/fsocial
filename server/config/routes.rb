Rails.application.routes.draw do
  namespace :api do
    scope module: :v1, as: :v1, constraints: ApiConstraints::Versioning.new(1) do
      resource :user
      resources :sessions
    end
  end
end
