class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  enum role: [:regular, :manager, :admin], _prefix: :is

  scope :regular_users,  -> { where(role: :regular) }
  scope :manager_users,  -> { where(role: :manager) }
  scope :admin_users,    -> { where(role: :admin) }

  has_many :hours
end
