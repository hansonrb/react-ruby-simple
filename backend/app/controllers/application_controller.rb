class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :null_session

  def not_authorized
    render json: {errors: [message: "Not Authorized"], success: false}, status: :unauthorized
  end

  def paginate_json(data)
    paginated = data.page(params[:page] || 1)

    render json: {
        paginate: {
            current: params[:page] || 1,
            total: paginated.total_count,
            total_page: (paginated.total_count / 50.0).ceil
        },
        data: paginated
    }
  end
end
