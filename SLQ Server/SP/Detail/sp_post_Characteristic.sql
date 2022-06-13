-- Insertar detalle (Características) del producto
CREATE PROCEDURE sp_post_Characteristic
	@ProductId AS INT = NULL,
	@CharacteristicName VARCHAR(50) = NULL,
	@Description VARCHAR(200) = NULL
AS  
BEGIN
	
	INSERT INTO
		ProductDetail(
			CharacteristicName, 
			[Description], 
			CreationDate, 
			ProductId
		)
	VALUES (
		@CharacteristicName, 
		@Description, 
		GETDATE(), 
		@ProductId
	);
	
	DECLARE @Id AS int =  IDENT_CURRENT('ProductDetail');
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
		Id = @Id;
END
GO