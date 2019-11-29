Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get 'library', to: 'pages#library', as: :library
  get 'discover', to: 'pages#discover', as: :discover
  get 'nothing', to: 'pages#nothing', as: :nothing
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'tracks', to: 'posts#index', as: :tracks

end
