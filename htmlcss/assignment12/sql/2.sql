SELECT city
FROM STATION
WHERE MOD(id, 2) = 0
GROUP by city
ORDER by city;
