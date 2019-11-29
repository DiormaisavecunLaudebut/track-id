class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[home library nothing discover]

  def home
  end

  def library
  end

  def nothing
  end

  def discover
  end
end
