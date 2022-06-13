-- Obtener detalles por producto
CREATE PROCEDURE sp_get_Characteristic
	@ProductId AS INT = NULL
AS  
BEGIN
	
	SELECT 
		Id,
		CharacteristicName,
		[Description],
		CreationDate,
		UpdateDate,
		ProductId
	FROM 
		[dbo].[ProductDetail]
	WHERE
		ProductId = @ProductId
END
GO