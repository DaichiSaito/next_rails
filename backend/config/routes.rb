Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create'
  post 'authentications/firebase/login_or_signup', to: 'authentications/firebase#login_or_signup'
  resources :articles
end
