SELECT * 
FROM Vehicles
JOIN Users on vehicles.ownerId = Users.id
WHERE Users.email = $1;