BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "OrderDetails" (
	"OrderDetailID"	INTEGER,
	"OrderID"	INTEGER,
	"ProductID"	INTEGER,
	"Quantity"	INTEGER,
	FOREIGN KEY("ProductID") REFERENCES "Products"("ProductID"),
	PRIMARY KEY("OrderDetailID"),
	FOREIGN KEY("OrderID") REFERENCES "Orders"("OrderID")
);
COMMIT;
