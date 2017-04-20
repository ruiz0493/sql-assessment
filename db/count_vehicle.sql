SELECT count(*) as count 
FROM Vehicles
JOIN Users on Vehicles.ownerId = Users.id
WHERE Users.id = $1;