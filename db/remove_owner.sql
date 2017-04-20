UPDATE Vehicles
SET ownerId = null
WHERE ownerId = $1 AND id = $2