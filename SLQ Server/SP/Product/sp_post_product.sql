-- Insertar producto
ALTER PROCEDURE sp_post_product
	@CodeBar AS CHAR(8) = NULL,
	@Name AS VARCHAR(100) = NULL,
	@Category AS INT = NULL,
	@Brand AS VARCHAR(100) = NULL
AS  
BEGIN
	
	INSERT INTO	
	Product (
		[CodeBar]
		,[Name]
		,[Category]
		,[Status]
		,Brand
		,CreationDate
	) 
	VALUES (
		@CodeBar,
		@Name,
		@Category,
		1,
		@Brand,
		GETDATE()
	);

	SELECT SCOPE_IDENTITY() AS Id
END