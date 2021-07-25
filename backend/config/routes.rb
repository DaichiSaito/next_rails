Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create'
  post 'authentications/firebase/login_or_signup', to: 'authentications/firebase#login_or_signup'
  resources :articles
  namespace :job_seekers do
    post 'login_or_signup', to: 'authentications#login_or_signup'
    get 'me', to: 'me#show'
    namespace :me do
      resource :profile
    end
  end
  resources :portfolios do
    resource :like, module: :portfolios
  end

  resources :job_listings do
    resource :application, module: :job_listings
  end

  resources :job_seekers, param: :name
  resources :tags
end
