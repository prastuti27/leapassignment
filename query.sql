-- SELECT City, COUNT(*)FROM Customers GROUP BY City ;

-- SELECT CustomerID, ContactName, CustomerName, Address,City
-- FROM Customers
-- WHERE City = 'London'
-- 
-- UNION
-- 
-- SELECT CustomerID, ContactName, CustomerName, Address,City
-- FROM Customers
-- WHERE City = 'Paris'
-- 
-- 
-- UNION
-- 
-- SELECT CustomerID, ContactName, CustomerName, Address ,City
-- FROM Customers
-- WHERE City = 'Madrid'
-- Order by City


-- SELECT CustomerID, ContactName, CustomerName, Address ,City
-- FROM Customers
-- WHERE City IN ('London', 'Paris', 'Madrid');


-- SELECT ContactName, CustomerName,CustomerID,Address FROM Customers
-- WHERE CustomerID
-- not in (
-- select CustomerID 
-- from orders);


-- SELECT ContactName, CustomerName,CustomerID,Address FROM Customers
-- WHERE CustomerID
-- in (
-- select CustomerID 
-- from orders);

-- SELECT ContactName, CustomerName, CustomerID, Address 
-- FROM Customers C
-- WHERE  NOT EXISTS (
--     SELECT CustomerID 
--     FROM Orders O 
--     WHERE O.CustomerID = C.CustomerID
-- );

-- SELECT ContactName, CustomerName, CustomerID, Address 
-- FROM Customers C
-- WHERE  EXISTS (
--     SELECT CustomerID 
--     FROM Orders O 
--     WHERE O.CustomerID = C.CustomerID
-- );



SELECT C.CustomerName, C.ContactName,C.Address,O.OrderID,O.OrderDate from Customers C
INNER join Orders O on C.CustomerID = O.CustomerID



-- 
-- SELECT C.CustomerName, C.ContactName,C.Address,O.OrderID,O.OrderDate from Customers C
-- INNER join Orders O on C.CustomerID = O.CustomerID

-- SELECT C.CustomerName, C.ContactName, C.Address, COUNT(O.OrderID) AS OrdersCount
-- FROM Customers C
-- INNER  JOIN Orders O ON C.CustomerID = O.CustomerID
-- GROUP BY C.CustomerID; 


-- SELECT  City, Count(*)
-- FROM Customers C
-- GROUP by City

SELECT C.CustomerID, C.CustomerName, C.ContactName, C.Address
FROM Customers C
LEFT JOIN Orders O ON C.CustomerID = O.CustomerID
WHERE O.CustomerID IS NULL;
