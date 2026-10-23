-- ProdManager Pro · Base de datos de inventario (SQL Server)
-- Equivalente relacional de db.json · ejecutar en SQL Server Management Studio

IF DB_ID('prodmanager_pro') IS NULL
  CREATE DATABASE prodmanager_pro;
GO
USE prodmanager_pro;
GO

IF OBJECT_ID('dbo.products', 'U') IS NOT NULL
  DROP TABLE dbo.products;
GO

CREATE TABLE dbo.products (
  id         INT IDENTITY(1,1) PRIMARY KEY,
  sku        NVARCHAR(20)   NOT NULL UNIQUE,
  name       NVARCHAR(120)  NOT NULL,
  category   NVARCHAR(30)   NOT NULL
             CHECK (category IN (N'Abarrotes', N'Bebidas', N'Limpieza', N'Cuidado Personal', N'Lácteos', N'Snacks')),
  price      DECIMAL(10,2)  NOT NULL CHECK (price > 0),
  stock      INT            NOT NULL DEFAULT 0 CHECK (stock >= 0),
  min_stock  INT            NOT NULL DEFAULT 0 CHECK (min_stock >= 0),
  supplier   NVARCHAR(100)  NOT NULL,
  created_at DATETIME2      NOT NULL DEFAULT SYSDATETIME()
);
GO

INSERT INTO dbo.products (sku, name, category, price, stock, min_stock, supplier, created_at) VALUES
(N'ABR-001', N'Arroz Costeño Extra 5 kg',     N'Abarrotes',        24.90,  48, 10, N'Alicorp S.A.A.',  '2026-10-01T09:00:00'),
(N'ABR-002', N'Aceite Primor 1 L',            N'Abarrotes',        10.50,   6, 12, N'Alicorp S.A.A.',  '2026-10-01T09:05:00'),
(N'ABR-003', N'Azúcar Rubia Cartavio 1 kg',   N'Abarrotes',         4.20,  75, 20, N'Cartavio S.A.A.', '2026-10-02T10:00:00'),
(N'BEB-001', N'Inca Kola 1.5 L',              N'Bebidas',           6.80,  36, 15, N'Lindley S.A.',    '2026-10-02T10:30:00'),
(N'BEB-002', N'Agua San Luis 625 ml',         N'Bebidas',           1.80, 120, 30, N'Lindley S.A.',    '2026-10-03T08:15:00'),
(N'LAC-001', N'Leche Gloria Evaporada 400 g', N'Lácteos',           4.50,   8, 24, N'Gloria S.A.',     '2026-10-03T08:40:00'),
(N'LAC-002', N'Yogurt Laive Fresa 1 L',       N'Lácteos',           7.90,  18, 10, N'Laive S.A.',      '2026-10-04T11:00:00'),
(N'LIM-001', N'Detergente Bolívar 2.6 kg',    N'Limpieza',         32.90,  14,  6, N'Alicorp S.A.A.',  '2026-10-05T09:20:00'),
(N'LIM-002', N'Lejía Clorox 1 L',             N'Limpieza',          5.30,   0, 10, N'Clorox Perú',     '2026-10-05T09:45:00'),
(N'CUP-001', N'Shampoo H&S 375 ml',           N'Cuidado Personal', 18.90,  22,  8, N'P&G Perú',        '2026-10-06T14:00:00');
GO

-- Consultas de ejemplo (las mismas que hace la app)
SELECT * FROM dbo.products;                                        -- Listado
SELECT * FROM dbo.products WHERE stock = 0;                        -- Agotados
SELECT * FROM dbo.products WHERE stock > 0 AND stock < min_stock;  -- Stock bajo
SELECT SUM(price * stock) AS valor_inventario FROM dbo.products;   -- Valor del inventario
