-- Actualizar detalle (Características) del producto
CREATE PROCEDURE sp_put_Characteristic
	@Id AS INT = NULL,
	@CharacteristicName VARCHAR(50) = NULL,
	@Description VARCHAR(200) = NULL
AS  
BEGIN
	
	UPDATE
		ProductDetail
	SET
		CharacteristicName = @CharacteristicName,
		[Description] = @Description,
		UpdateDate = GETDATE()
	WHERE
		Id = @Id

	SELECT @Id AS Id;
END
GO