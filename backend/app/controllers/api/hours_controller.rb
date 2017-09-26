class Api::HoursController < ApplicationController
    respond_to :json
    before_action :authenticate_user!
    before_action :set_hour, only: [:show, :update, :delete]

    def index
        render json: current_user.hours
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
            render json: @hour.errors, status: :unprocessable_entity
        end
    end

    def update
        if @hour.update(hour_params)
            render json: @hour
        else
            render json: @hour.errors, status: :unprocessable_entity
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
        @hour = Hour.find(id: params[:id])
    end

    def hour_params
        params.permit(:record_date, :hours_worked)
    end
end
