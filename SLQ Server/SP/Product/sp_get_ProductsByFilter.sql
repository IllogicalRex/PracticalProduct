-- Obtener productos por código de barra
ALTER PROCEDURE sp_get_ProductsByFilter
	@CodeBar AS CHAR(8) = ''
AS  
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
			P.[Status] = 1 AND
			P.CodeBar = @CodeBar
	END
GO