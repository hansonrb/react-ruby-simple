class Hour < ApplicationRecord
    belongs_to :user

    validates_presence_of :user, :record_date, :hours_worked
    validates :record_date, uniqueness: { scope: :user }
    validates :hours_worked, numericality: { greater_than: 0, less_than_or_equal_to: 24 }

    serialize :notes, Array
end
