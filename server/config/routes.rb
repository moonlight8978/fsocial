Rails.application.routes.draw do
  scope :api do
    namespace :v1 do
      resources :tests if Rails.env.development?

      resources :sessions, only: %i[create destroy]

      resources :users do
        member do
          post :follow
          delete :unfollow
          get :followers, controller: :followings
          get :followees, controller: :followings
          get :activities
          get :statistics
        end
      end

      resource :profile, only: %i[show update] do
        member do
          put :password
          get :followees
          get :followers
          get :followees_suggestion
          get :activities
        end
      end

      resources :posts, only: %i[create destroy update show], shallow: true do
        resource :sharing, only: %i[create destroy update]
        resource :favorite, only: %i[create destroy update]
        resources :replies, only: %i[create update show index]
      end

      resources :hashtags, only: :show do
        collection do
          get :popular
        end
      end
    end
  end
end
