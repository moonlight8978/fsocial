Rails.application.routes.draw do
  scope :api do
    namespace :v1 do
      resources :tests if Rails.env.development?

      resources :users
      resources :sessions, only: %i[create destroy]

      resources :posts
    end
  end
end
