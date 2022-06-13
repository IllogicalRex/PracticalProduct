CREATE DATABASE PracticalProduct
GO

USE PracticalProduct
GO

CREATE TABLE Category (
	Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(100) NOT NULL
)

CREATE TABLE Product (
	Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	CodeBar CHAR(8) NOT NULL,
	[Name] VARCHAR(100) NOT NULL,
	Category int not null FOREIGN KEY REFERENCES Category(Id),
	[Status] int not null,
	Brand VARCHAR(100) NOT NULL,
	CreationDate DATETIME NOT NULL,
	UpdateDate DATETIME
)

CREATE TABLE ProductDetail (
	Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	CharacteristicName VARCHAR(50) NOT NULL,
	[Description] VARCHAR(200) NOT NULL,
	CreationDate DateTime not null,
	UpdateDate DateTime null,
	ProductId int not null FOREIGN KEY REFERENCES Product(Id),
)

INSERT INTO Category([Name]) VALUES ('Electrónica')
INSERT INTO Category([Name]) VALUES ('Electrodomésticos')
INSERT INTO Category([Name]) VALUES ('Muebles')
INSERT INTO Category([Name]) VALUES ('Telefonía')
INSERT INTO Category([Name]) VALUES ('Computación')

select * from Category

INSERT INTO Product (CodeBar, [Name], Category, [Status])
	VALUES ('A-0010-Z', 'IPhone 11', 3, 1)


GO

-- Obtener todos los productos
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
EXEC sp_get_allProducts 
GO

-- Obtener producto por id
select * From Product;
go
alter PROCEDURE sp_post_product
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

EXEC sp_post_product


-- Obtener producto por id
select * From Product;
go
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

go

select * From Product;
go
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
EXEC sp_get_Category 
GO


-- Obtener características
SELECT * FROM ProductDetail
GO
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
EXEC sp_get_Characteristic 6
GO
-------------------------------------------------------------
SELECT * FROM ProductDetail
GO
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
EXEC sp_get_Characteristic 6
GO

------------------------------------------------------------------
SELECT * FROM ProductDetail
GO
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
EXEC sp_post_Characteristic 1,'Prueba', 'prueba'
GO

----------------------------------------------------------------------------------
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
EXEC sp_post_Characteristic 1,'Prueba', 'prueba'