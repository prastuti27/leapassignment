BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Orders" (
	"OrderID"	INTEGER,
	"CustomerID"	INTEGER,
	"EmployeeID"	INTEGER,
	"ShipperID"	INTEGER,
	"OrderDate"	TEXT,
	FOREIGN KEY("ShipperID") REFERENCES "Shippers"("ShipperID"),
	FOREIGN KEY("EmployeeID") REFERENCES "Employees"("EmployeeID"),
	FOREIGN KEY("CustomerID") REFERENCES "Customers"("CustomerID")
);
COMMIT;
