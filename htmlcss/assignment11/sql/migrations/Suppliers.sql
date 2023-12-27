BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Suppliers" (
	"SupplierID"	INTEGER,
	"SupplierName"	TEXT,
	"ContactName"	TEXT,
	"Address"	TEXT,
	"City"	TEXT,
	"PostalCode"	TEXT,
	"Country"	TEXT,
	"Phone"	TEXT,
	PRIMARY KEY("SupplierID")
);
COMMIT;
