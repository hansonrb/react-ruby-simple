class Api::UsersController < ApplicationController
    respond_to :json
    before_action :set_user, only: [:update, :destroy, :show]

    def index
        if current_user.is_admin?
            paginate_json User
                .where("lower(name) like ? or lower(email) like ?", "%#{params[:filter] || ''}%", "%#{params[:filter] || ''}%")
                .order(:name)
        elsif current_user.is_manager?
            paginate_json User.regular_users
                .where("lower(name) like ? or lower(email) like ?", "%#{params[:filter] || ''}%", "%#{params[:filter] || ''}%")
                .order(:name)
        else
            render json: [current_user]
        end
    end

    def show
        render json: @user
    end

    def create
        @user = User.new(user_params)
        if @user.save
            render json: @user
        else
            render json: { errors: @user.errors, success: false }, status: :unprocessable_entity
        end
    end

    def update
        if current_user.is_admin? ||
            (current_user.is_manager? && @user.is_regular?) ||
            current_user.id == @user.id
            if @user.update(user_params)
                render json: @user
            else
                render json: { errors: @user.errors, success: false }, status: :unprocessable_entity
            end
        else
            return not_authorized
        end
    end

    def destroy
        if current_user.is_admin?
            unless @current_user.id == @user.id # do not delete self
                destroyed = @user.destroy
                render json: {user_id: destroyed.id}, status: 202
            else
                return not_authorized
            end
        elsif current_user.is_manager?
            if @user.is_regular?
                destroyed = @user.destroy
                render json: {user_id: destroyed.id}, status: 202
            else
                return not_authorized
            end
        else
            return not_authorized
        end
    end

    private
    def set_user
        @user = User.find(params[:id])
    end

    def user_params
        params.permit(:name, :email, :password, :role, :prefered_working_hours)
    end
end
