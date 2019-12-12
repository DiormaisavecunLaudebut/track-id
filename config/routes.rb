Rails.application.routes.draw do
  devise_for :users

  root to: 'pages#home'
  get 'library', to: 'pages#library', as: :library
  get 'discover', to: 'pages#discover', as: :discover
  get 'nothing', to: 'pages#nothing', as: :nothing

  get 'tracks', to: 'posts#index', as: :tracks

  resources :posts, only: [] do
    get 'show', to: 'posts#show', as: :show
    post 'create_view', to: 'posts#create_view', as: :create_view
    delete 'unupvote', to: 'posts#unupvote', as: :unupvote
    resources :messages, only: [:create] do
      post 'upvote', to: 'posts#upvote', as: :upvote
      delete 'unupvote', to: 'posts#unupvote', as: :unupvote
    end
  end

  require "sidekiq/web"
  authenticate :user, lambda { |u| u.admin } do
    mount Sidekiq::Web => '/sidekiq'
  end
end
