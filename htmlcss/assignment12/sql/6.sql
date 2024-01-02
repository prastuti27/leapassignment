SELECT c.continent, FLOOR(AVG(y.population)) 
FROM country c
JOIN city y
ON c.code = y.countrycode
GROUP BY c.continent;
