# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

j = 0
50000.times do |i|
    begin
        p j if j % 1000 == 0
        j+=1
        Hour.create(
            record_date: Faker::Date.between(2.years.ago, Date.today),
            hours_worked: 8 + rand(-3 .. 3),
            prefered_working_hours: 8 + rand(-3 .. 3),
            notes: [Faker::Company.name, Faker::Company.name, Faker::Company.name],
            user_id: rand(19 .. 21)
        )
    rescue => ex
        p ex
    end
end

# 1000.times do |i|
#     p i if i % 500 == 0
#     User.create(
#         name: Faker::Name.name,
#         email: Faker::Internet.email,
#         password: 'P@ssw0rd',
#         role: rand(0 .. 2),
#         prefered_working_hours: 8 + rand(-3 .. 3)
#     )
# end
