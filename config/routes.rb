Rails.application.routes.draw do
  devise_for :users

      root                       to:     'pages#home'
      get         'library',     to:     'pages#library',      as: :library
      get         'discover',    to:     'pages#discover',     as: :discover
      get         'nothing',     to:     'pages#nothing',      as: :nothing
      get         'tracks',      to:     'posts#index',        as: :tracks

  resources :posts, only: [:new, :create] do
      post       'tracked',      to:     'posts#tracked',      as: :tracked
      delete     'untracked',    to:     'posts#untracked',    as: :untracked
      get        'actions',      to:     'posts#actions',      as: :actions
      get        'show',         to:     'posts#show',         as: :show
      post       'create_view',  to:     'posts#create_view',  as: :create_view
      delete     'unupvote',     to:     'posts#unupvote',     as: :unupvote
    resources :messages, only: [:create] do
      post       'upvote',       to:     'messages#upvote',    as: :upvote
      delete     'unupvote',     to:     'messages#unupvote',  as: :unupvote
    end
  end
  resources :users, only: [] do
      get        'dashboard',    to:     'users#dashboard',    as: :dashboard
  end

  resources :relationships, only: [:create, :destroy]

  require "sidekiq/web"
  authenticate :user, lambda { |u| u.admin } do
    mount Sidekiq::Web => '/sidekiq'
  end
end
