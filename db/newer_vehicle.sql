SELECT * 
FROM Vehicles
JOIN Users on Vehicles.ownerId = Users.id
WHERE Vehicles.year BETWEEN 2000 AND 2256
ORDER BY Vehicles.year DESC;
