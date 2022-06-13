-- Obtener categorías
CREATE PROCEDURE sp_get_Category 
	@Id AS INT = NULL
AS  
BEGIN
	IF (@Id IS NULL)
	BEGIN
		SELECT 
			Id,
			[Name]
		FROM 
			[dbo].[Category] 
	END
	ELSE 
	BEGIN
		SELECT 
			Id,
			[Name]
		FROM 
			[dbo].[Category] 
		WHERE 
			Id = @Id
	END
END
GO