BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Products" (
	"ProductID"	INTEGER,
	"ProductName"	INTEGER,
	"SupplierID"	INTEGER,
	"CategoryID"	INTEGER,
	"Unit"	TEXT,
	"Price"	INTEGER,
	PRIMARY KEY("ProductID"),
	FOREIGN KEY("SupplierID") REFERENCES "Suppliers"("SupplierID"),
	FOREIGN KEY("CategoryID") REFERENCES "Categories"("CategoryID")
);
COMMIT;
