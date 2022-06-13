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