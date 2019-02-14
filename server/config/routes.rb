Rails.application.routes.draw do
  scope :api do
    namespace :v1 do
      resource :user
      resources :sessions, only: %i[create destroy]
    end
  end
end
