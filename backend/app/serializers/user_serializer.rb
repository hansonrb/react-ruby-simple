class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :role, :uid, :prefered_working_hours
end
