-- Eliminar detalle (Característica)
CREATE PROCEDURE sp_delete_Characteristic
	@Id AS INT = NULL
AS  
BEGIN
	
	DELETE FROM
		ProductDetail
	WHERE 
		Id = @Id;

	SELECT @Id AS Id;
END
GO