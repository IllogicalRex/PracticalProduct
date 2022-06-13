-- Actualizar producto
CREATE PROCEDURE sp_put_updateProduct
	@Id AS INT = NULL,
	@Name AS VARCHAR(100) = NULL,
	@Category AS INT = NULL,
	@Status AS INT = NULL,
	@Brand AS VARCHAR(100) = NULL
AS  
BEGIN
	UPDATE
		Product
	SET
		[Name] = @Name,
		Category = @Category,
		[Status] = @Status,
		UpdateDate = GETDATE(),
		Brand = @Brand
	WHERE
		Id = @Id

	SELECT @Id AS Id;
END
GO