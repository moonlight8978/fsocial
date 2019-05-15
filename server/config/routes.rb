Rails.application.routes.draw do
  mount ActionCable.server => '/api/cable'

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

        member do
          post :report
          delete :reports, action: :destroy_reports
        end
      end

      resources :hashtags, only: :show do
        collection do
          get :popular
        end
      end

      resources :reports, only: [] do
        collection do
          get :posts
        end
      end

      resources :memories do
        collection do
          post :upload
        end
      end

      namespace :admin do
        resources :users
      end
    end
  end
end
