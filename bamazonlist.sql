CREATE DATABASE bamazon;
USE bamazon;
DROP TABLE IF EXISTS products;
CREATE TABLE products
(
    item_id VARCHAR(10) NOT NULL,
    product_name VARCHAR(40),
    department_name VARCHAR(20),
    price DECIMAL(10,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);
ALTER TABLE products MODIFY COLUMN item_id VARCHAR
(10) NOT NULL;
select *
from products;

INSERT INTO products
VALUE
('AW5','Apple Watch 5','watch','649.00','320'
),
('AP2W','AirPods 2 wireless charging','ear phone ','299.00','211'),
('APP','AirPods Pro','ear phone','399.00','182'),
('IP11','iPhone 11 128gb','mobile phone','1279.00','166'),
('IPDM','iPad mini 256gb','tablet','819.00','152'),
('IP11P','iPhone 11 Pro 256gb','mobile phone','1999.00','132'),
('IPD','iPad 128gb','tablet','689.00','120'),
('IPDP','iPad Pro 256gb','tablet','1449.00','98'),
('IP11PMX','iPhone 11 Pro Max 256gb','mobile phone ','2149.00','87'),
('MB13P','13\'\' MacBook Pro 256gb','laptop','2299.00','78'),
('MBA','MacBook Air 13 inch 256gb ','laptop','1999.00','65'),
('MP16P','16\'\' MacBook Pro 512gb','laptop','3799.00','48'),
('AWE','Apple Watch Edition','watch','1259.00','29');

select *
from products
order by item_id;


