BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Customers" (
	"CustomerID"	INTEGER,
	"CustomerName"	TEXT,
	"ContactName"	TEXT,
	"Address"	TEXT,
	"City"	TEXT,
	"PostalCode"	TEXT,
	"Country"	TEXT,
	PRIMARY KEY("CustomerID")
);
COMMIT;
