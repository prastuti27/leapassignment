BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Categories" (
	"CategoryID"	INTEGER,
	"CategoryName"	TEXT,
	"Description"	TEXT,
	PRIMARY KEY("CategoryID")
);
COMMIT;
