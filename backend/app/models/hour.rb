class Hour < ApplicationRecord
    belongs_to :user

    serialize :notes, Array
end
