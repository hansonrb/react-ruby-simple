class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :null_session

  def not_authorized
    render json: {errors: [message: "Not Authorized"]}, status: :unauthorized
  end
end
