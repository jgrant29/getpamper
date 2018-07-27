class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  protected

  def redirect_subdomain
    if request.host == 'getpampered.io'
      redirect_to 'http://www.getpampered.io' + request.path, status: 301
    end
  end
end
