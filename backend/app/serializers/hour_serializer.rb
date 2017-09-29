class HourSerializer < ActiveModel::Serializer
  attributes :id, :record_date, :hours_worked, :prefered_working_hours, :user_id, :notes, :user_name
end
