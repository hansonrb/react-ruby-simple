Write a simple time management system

User must be able to create an account and log in. (If a mobile application, this means that more users can use the app from the same phone).
User can add (and edit and delete) a row what he has worked on, what date, for how long.
User can add a setting (Preferred working hours per day).

If on a particular date a user has worked under the PreferredWorkingHourPerDay, these rows are red, otherwise green.

Implement at least three roles with different permission levels: a regular user would only be able to CRUD on their owned records, a user manager would be able to CRUD users, and an admin would be able to CRUD all records and users.

Filter entries by date from-to.

Export the filtered times to a sheet in HTML:
Date: 21.5
Total time: 9h
Notes:
Note1
Note2
Note3

REST API. Make it possible to perform all user actions via the API, including authentication (If a mobile application and you don’t know how to create your own backend you can use Firebase.com or similar services to create the API).
In any case, you should be able to explain how a REST API works and demonstrate that by creating functional tests that use the REST Layer directly. Please be prepared to use REST clients like Postman, cURL, etc. for this purpose.
All actions need to be done client side using AJAX, refreshing the page is not acceptable. (If a mobile app, disregard this).
Minimal UI/UX design is needed. You will not be marked on graphic design. However, do try to keep it as tidy as possible.
Bonus: unit and e2e tests.

NOTE: Please note that this is the project that will be used to evaluate your skills. The project will be evaluated as if you were delivering it to a customer. We expect you to make sure that the app is fully functional and doesn’t have any obvious missing pieces. The deadline for the project is 2 weeks from today.

