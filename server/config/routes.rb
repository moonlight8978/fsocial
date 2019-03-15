Rails.application.routes.draw do
  scope :api do
    namespace :v1 do
      resources :tests if Rails.env.development?

      resources :sessions, only: %i[create destroy]

      resources :users do
        member do
          post :follow
          delete :unfollow
        end
      end

      resource :profile, only: %i[show update] do
        member do
          put :password
          get :followees
          get :followers
        end
      end

      resources :posts
    end
  end
end
