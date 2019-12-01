Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get 'library', to: 'pages#library', as: :library
  get 'discover', to: 'pages#discover', as: :discover
  get 'nothing', to: 'pages#nothing', as: :nothing

  get 'tracks', to: 'posts#index', as: :tracks
  resources :posts, only: [] do
    post 'create_view', to: 'posts#create_view', as: :create_view
  end
end
