-- 1 --
SELECT * FROM owners 
LEFT JOIN vehicles 
ON owners.id = vehicles.owner_id;

-- 2 --
SELECT first_name, last_name, COUNT(*) 
FROM owners 
JOIN vehicles 
ON owners.id = vehicles.owner_id 
GROUP BY owners.id 
ORDER BY owners.first_name;

-- 3 --
SELECT 
  first_name, last_name, 
  ROUND(AVG(price)) AS average_price, 
  COUNT(owner_id) 
FROM owners o 
JOIN vehicles v ON o.id = v.owner_id 
GROUP BY o.id 
HAVING COUNT(owner_id) > 1 AND ROUND(AVG(price)) > 10000 
ORDER BY first_name DESC;