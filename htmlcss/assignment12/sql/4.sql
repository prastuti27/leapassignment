SELECT 
    CEIL(AVG(CAST(salary AS DECIMAL)) - AVG(CAST(REPLACE(salary, '0', '') AS DECIMAL)))
FROM EMPLOYEES;