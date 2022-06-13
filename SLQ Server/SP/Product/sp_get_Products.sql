-- Obtener Productos
CREATE PROCEDURE sp_get_Products 
	@Id AS INT = NULL
AS  
BEGIN
	IF (@Id IS NULL)
	BEGIN
		SELECT 
			P.[Id]
			,P.[CodeBar]
			,P.[Name]
			,C.[Name] AS Category
			,P.[Status]
			,P.Brand
			,P.CreationDate
			,P.UpdateDate
		FROM 
			[dbo].[Product] P
			INNER JOIN Category C ON C.Id = P.Category
		WHERE 
			P.[Status] = 1
	END
	ELSE 
	BEGIN
		SELECT 
			P.[Id]
			,P.[CodeBar]
			,P.[Name]
			,C.[Name] AS Category
			,P.[Status]
			,P.Brand
			,P.CreationDate
			,P.UpdateDate
		FROM 
			[dbo].[Product] P
			INNER JOIN Category C ON C.Id = P.Category
		WHERE 
			P.Id = @Id AND
			P.[Status] = 1
	END
END
GO