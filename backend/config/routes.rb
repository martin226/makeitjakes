Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  scope ENV.fetch('RAILS_RELATIVE_URL_ROOT', '') do
    # Health check endpoint for load balancers
    get "up" => "rails/health#show", as: :rails_health_check

    # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
    # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
    # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

    # Defines the root path route ("/")
    # root "posts#index"

    namespace :api do
      namespace :v1 do
        resources :resumes, only: [:create] do
          get :preview, on: :collection
        end
        get 'status/events', to: 'status#events'
      end
    end
  end
end
