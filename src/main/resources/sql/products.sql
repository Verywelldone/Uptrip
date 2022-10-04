insert into product_item (id, description, image, name, price, stock, product_category_id)
values (1, 'A great jacket one', 'assets/img/products/jackets/jacket1.webp', 'Jacket 1', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 1),
       (2, 'A great jacket two', 'assets/img/products/jackets/jacket2.jpg', 'Jacket 2', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 1),
       (3, 'A great jacket three', 'assets/img/products/jackets/jacket3.webp', 'Jacket 3', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 1),

       (4, 'A great pair of pants one', 'assets/img/products/pants/pants1.webp', 'Pants 1', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 2),
       (5, 'A great pair of pants two', 'assets/img/products/pants/pants2.webp', 'Pants 2', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 2),
       (6, 'A great pair of pants three', 'assets/img/products/pants/pants3.webp', 'Pants 3', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 2),

       (7, 'A great short one', 'assets/img/products/shorts/shorts1.webp', 'Short 1', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 3),
       (8, 'A great short two', 'assets/img/products/shorts/shorts2.webp', 'Short 2', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 3),
       (9, 'A great short three', 'assets/img/products/shorts/shorts3.webp', 'Short 3', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 3),

       (10, 'A great T-Shirt one', 'assets/img/products/tshirts/tshirt1.jpg', 'T-shirt 1', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 4),
       (11, 'A great T-Shirt two', 'assets/img/products/tshirts/tshirt2.webp', 'T-shirt 2', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 4),
       (12, 'A great T-Shirt three', 'assets/img/products/tshirts/tshirt3.webp', 'T-shirt 3', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 4);


