class Api::HoursController < ApplicationController
    respond_to :json
    before_action :set_hour, only: [:show, :update, :destroy]

    def index
        res = Hour.order('record_date desc') if current_user.is_admin?
        res = current_user.hours.order('record_date desc') unless current_user.is_admin?

        res = res.where("record_date >= ?", params[:from_date]) if params[:from_date].present?
        res = res.where("record_date <= ?", params[:to_date]) if params[:to_date].present?
        paginate_json res
    end

    def show
        render json: @hour
    end

    def create
        @hour = Hour.new(hour_params)
        @hour.prefered_working_hours = current_user.prefered_working_hours
        @hour.user_id = current_user.id

        if @hour.save
            render json: @hour
        else
            render json: { errors: @hour.errors, success: false }, status: :unprocessable_entity
        end
    end

    def update
        if @hour.update(hour_params)
            render json: @hour
        else
            render json: { errors: @hour.errors, success: false }, status: :unprocessable_entity
        end
    end

    def destroy
        if @hour
            destroyed = @hour.destroy
            render json: {user_id: destroyed.id}, status: 202
        else
            return not_authorized
        end
    end

    private
    def set_hour
        @hour = Hour.find(params[:id])
    end

    def hour_params
        params.permit(:record_date, :hours_worked, notes: [])
    end
end
