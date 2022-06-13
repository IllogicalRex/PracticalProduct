-- Eliminar producto (Eliminado lógico)
CREATE PROCEDURE sp_delete_deleteProduct
	@Id AS INT = NULL
AS  
BEGIN
	UPDATE
		Product
	SET
		[Status] = 0
	WHERE
		Id = @Id

	SELECT @Id AS Id;
END

GO