SELECT * 
FROM vehicles
JOIN Users on Vehicles.ownerId = Users.id
WHERE Users.firstname LIKE $1