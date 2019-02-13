Rails.application.routes.draw do
  scope :api do
    namespace :v1 do
      resource :user
      resources :sessions
    end
  end
end
