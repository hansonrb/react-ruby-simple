class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  enum role: [:regular, :manager, :admin], _prefix: :is

  has_many :hours
end
