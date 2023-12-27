BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Employees" (
	"EmployeeID"	INTEGER,
	"LastName"	TEXT,
	"FirstName"	TEXT,
	"BirthDate"	TEXT,
	"Photo "	BLOB,
	"Notes"	INTEGER,
	PRIMARY KEY("EmployeeID")
);
COMMIT;
