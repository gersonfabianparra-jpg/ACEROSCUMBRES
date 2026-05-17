-- Fotos para Ángulos Doblados
update products set image_url = 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80' where slug like 'angulo-doblado%' and slug like '%20x20%';
update products set image_url = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' where slug like 'angulo-doblado%' and slug not like '%20x20%' and slug like '%30%';
update products set image_url = 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80' where slug like 'angulo-doblado%' and slug like '%40%';
update products set image_url = 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80' where slug like 'angulo-doblado%' and slug like '%50%';
update products set image_url = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' where slug like 'angulo-doblado%' and slug like '%60%';
update products set image_url = 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80' where slug like 'angulo-doblado%' and slug like '%70%';
update products set image_url = 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80' where slug like 'angulo-doblado%' and slug like '%80%';
update products set image_url = 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80' where slug like 'angulo-doblado-100%';

-- Fotos para Canales
update products set image_url = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' where slug like 'canal-c%';
update products set image_url = 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80' where slug like 'canal-u%';

-- Fotos para Tubos
update products set image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' where slug like 'tubo-cuadrado%' and slug like '%20x20%';
update products set image_url = 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80' where slug like 'tubo-cuadrado%' and slug like '%25x25%';
update products set image_url = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' where slug like 'tubo-cuadrado%' and slug like '%30x30%';
update products set image_url = 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80' where slug like 'tubo-cuadrado%' and slug like '%40x40%';
update products set image_url = 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80' where slug like 'tubo-cuadrado%' and slug like '%50x50%';
update products set image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' where slug like 'tubo-rectangular%' and slug like '%40x20%';
update products set image_url = 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80' where slug like 'tubo-rectangular%' and slug like '%50x25%';
update products set image_url = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' where slug like 'tubo-rectangular%' and slug like '%60x30%';

-- Fotos para Cubiertas y Revestimientos
update products set image_url = 'https://images.unsplash.com/photo-1590359802044-9a8d9df0e2bc?w=600&q=80' where slug = 'plancha-industrial-ac4';
update products set image_url = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80' where slug = 'plancha-industrial-ac6';
update products set image_url = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80' where slug = 'plancha-industrial-ac8';
update products set image_url = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' where slug = 'panel-arquitectonico-liso';
update products set image_url = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80' where slug = 'panel-arquitectonico-acanalado';

-- Fotos para Paneles Aislados
update products set image_url = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' where slug like 'panel-aislado-poliestireno%';
update products set image_url = 'https://images.unsplash.com/photo-1590359802044-9a8d9df0e2bc?w=600&q=80' where slug like 'panel-aislado-poliuretano%';
update products set image_url = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80' where slug like 'panel-aislado-lana-roca%';

-- Fotos para Tejas
update products set image_url = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80' where slug = 'teja-metalica-espanola';
update products set image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' where slug = 'teja-metalica-romana';
update products set image_url = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80' where slug = 'teja-metalica-colonial';

-- Fotos para Accesorios
update products set image_url = 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80' where slug = 'tornillos-autoperforantes-x100';
update products set image_url = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' where slug = 'sello-butilo';
update products set image_url = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80' where slug = 'cumbrera-estandar';
