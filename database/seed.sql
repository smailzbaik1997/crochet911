-- Seed data for Crochet911 categories and sample patterns
-- Run this after creating the schema

-- Insert main categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Animal Crochet Patterns', 'animals', 'Adorable amigurumi animal crochet patterns and wearable animal-themed designs for all skill levels', 1),
('Holiday & Seasonal Crochet Patterns', 'holidays-seasonal', 'Festive crochet patterns for every season and holiday celebration', 2),
('Flower & Plant Crochet Patterns', 'flowers-plants', 'Beautiful botanical crochet patterns including roses, succulents, and garden flowers', 3),
('Fantasy & Mythical Crochet Patterns', 'fantasy-mythical', 'Magical creature crochet patterns featuring unicorns, dragons, and mythical beings', 4),
('Clothing & Accessory Crochet Patterns', 'clothing-accessories', 'Fashionable wearable crochet patterns and stylish accessories', 5),
('Blanket & Afghan Crochet Patterns', 'blankets-afghans', 'Cozy blanket crochet patterns and decorative afghan designs', 6),
('Home Decor Crochet Patterns', 'home-decor', 'Decorative crochet patterns for beautiful home accessories', 7),
('Food & Drink Crochet Patterns', 'food-drink', 'Delicious-looking food crochet patterns and play kitchen items', 8),
('Baby & Kids Crochet Patterns', 'baby-kids', 'Adorable crochet patterns designed specifically for babies and children', 9),
('Toy & Doll Crochet Patterns', 'toys-dolls', 'Fun toy crochet patterns and loveable doll designs', 10),
('Bag & Purse Crochet Patterns', 'bags-purses', 'Practical and stylish bag crochet patterns for everyday use', 11),
('Jewelry & Small Accessory Crochet Patterns', 'jewelry-accessories', 'Delicate jewelry crochet patterns and small accessory designs', 12),
('Cultural & Flag Crochet Patterns', 'cultural-flags', 'Cultural crochet patterns and flag designs from around the world', 13),
('Religious & Spiritual Crochet Patterns', 'religious-spiritual', 'Sacred and spiritual symbol crochet patterns for meaningful projects', 14),
('Pet & Pet Accessory Crochet Patterns', 'pets-accessories', 'Crochet patterns designed for your furry friends and their accessories', 15),
('Nature & Outdoor Crochet Patterns', 'nature-outdoors', 'Nature-inspired crochet patterns featuring outdoor themes', 16),
('Stitch Style Crochet Patterns', 'stitch-styles', 'Crochet patterns organized by specific techniques and stitch styles', 17),
('Utility & Everyday Crochet Patterns', 'utility-everyday', 'Practical everyday crochet patterns for household items', 18),
('Seasonal Wear Crochet Patterns', 'seasonal-wear', 'Clothing crochet patterns designed for different seasons', 19),
('Special Occasion Crochet Patterns', 'special-occasions', 'Crochet patterns perfect for life''s special moments and celebrations', 20);

-- Insert animal subcategories
INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'Cat Crochet Patterns', 'cats', 'Feline-inspired crochet patterns including amigurumi cats and wearable designs', id, 1 FROM categories WHERE slug = 'animals'
UNION ALL
SELECT 'Dog Crochet Patterns', 'dogs', 'Canine-inspired crochet patterns for dog lovers and pet accessories', id, 2 FROM categories WHERE slug = 'animals'
UNION ALL
SELECT 'Frog Crochet Patterns', 'frogs', 'Amphibian crochet patterns featuring cute frogs and pond creatures', id, 3 FROM categories WHERE slug = 'animals'
UNION ALL
SELECT 'Owl Crochet Patterns', 'owls', 'Wise owl crochet patterns for bird enthusiasts and woodland themes', id, 4 FROM categories WHERE slug = 'animals'
UNION ALL
SELECT 'Bear Crochet Patterns', 'bears', 'Cuddly bear crochet patterns including teddy bears and woodland animals', id, 5 FROM categories WHERE slug = 'animals'
UNION ALL
SELECT 'Rabbit Crochet Patterns', 'rabbits', 'Bunny and rabbit crochet patterns perfect for Easter and spring projects', id, 6 FROM categories WHERE slug = 'animals'
UNION ALL
SELECT 'Elephant Crochet Patterns', 'elephants', 'Elephant-themed crochet patterns for safari and jungle collections', id, 7 FROM categories WHERE slug = 'animals'
UNION ALL
SELECT 'Turtle Crochet Patterns', 'turtles', 'Turtle and tortoise crochet patterns for ocean and pond themes', id, 8 FROM categories WHERE slug = 'animals'
UNION ALL
SELECT 'Fox Crochet Patterns', 'foxes', 'Clever fox crochet patterns for woodland and forest collections', id, 9 FROM categories WHERE slug = 'animals'
UNION ALL
SELECT 'Dolphin Crochet Patterns', 'dolphins', 'Marine mammal crochet patterns featuring dolphins and ocean life', id, 10 FROM categories WHERE slug = 'animals';

-- Insert holiday subcategories
INSERT INTO categories (name, slug, description, parent_id, sort_order)
SELECT 'Christmas Crochet Patterns', 'christmas', 'Christmas crochet patterns including trees, stockings, Santa, and ornaments', id, 1 FROM categories WHERE slug = 'holidays-seasonal'
UNION ALL
SELECT 'Halloween Crochet Patterns', 'halloween', 'Halloween crochet patterns featuring pumpkins, bats, ghosts, and witches', id, 2 FROM categories WHERE slug = 'holidays-seasonal'
UNION ALL
SELECT 'Easter Crochet Patterns', 'easter', 'Easter crochet patterns with bunnies, eggs, chicks, and spring themes', id, 3 FROM categories WHERE slug = 'holidays-seasonal'
UNION ALL
SELECT 'Valentine''s Day Crochet Patterns', 'valentines', 'Valentine''s Day crochet patterns featuring hearts, roses, and cupids', id, 4 FROM categories WHERE slug = 'holidays-seasonal'
UNION ALL
SELECT 'Thanksgiving Crochet Patterns', 'thanksgiving', 'Thanksgiving crochet patterns with turkeys, autumn leaves, and harvest themes', id, 5 FROM categories WHERE slug = 'holidays-seasonal';

-- Insert flower subcategories
INSERT INTO categories (name, slug, description, parent_id, sort_order)
SELECT 'Rose Crochet Patterns', 'roses', 'Beautiful rose crochet patterns for romantic and floral projects', id, 1 FROM categories WHERE slug = 'flowers-plants'
UNION ALL
SELECT 'Sunflower Crochet Patterns', 'sunflowers', 'Bright sunflower crochet patterns perfect for summer decorations', id, 2 FROM categories WHERE slug = 'flowers-plants'
UNION ALL
SELECT 'Tulip Crochet Patterns', 'tulips', 'Spring tulip crochet patterns for seasonal and garden themes', id, 3 FROM categories WHERE slug = 'flowers-plants'
UNION ALL
SELECT 'Lily Crochet Patterns', 'lilies', 'Elegant lily crochet patterns for sophisticated floral designs', id, 4 FROM categories WHERE slug = 'flowers-plants'
UNION ALL
SELECT 'Daisy Crochet Patterns', 'daisies', 'Simple daisy crochet patterns perfect for beginners and spring projects', id, 5 FROM categories WHERE slug = 'flowers-plants'
UNION ALL
SELECT 'Succulent Crochet Patterns', 'succulents', 'Modern succulent crochet patterns for contemporary home decor', id, 6 FROM categories WHERE slug = 'flowers-plants'
UNION ALL
SELECT 'Cactus Crochet Patterns', 'cacti', 'Desert cactus crochet patterns for southwestern and modern themes', id, 7 FROM categories WHERE slug = 'flowers-plants';

-- Insert sample designers
INSERT INTO designers (name, slug, bio, website_url) VALUES
('Sarah Pattern', 'sarah-pattern', 'Expert amigurumi designer with over 10 years of experience creating adorable animal crochet patterns and tutorials.', 'https://sarahpattern.com'),
('Mike Stitch', 'mike-stitch', 'Specializes in home decor and blanket crochet patterns. Known for innovative stitch combinations and modern designs.', 'https://mikestitch.com'),
('Emma Yarn', 'emma-yarn', 'Baby and children''s crochet pattern specialist. Creates safe and cuddly designs perfect for little ones.', 'https://emmayarn.com'),
('Luna Craft', 'luna-craft', 'Fantasy and mythical creature crochet pattern expert. Brings imagination to life through detailed patterns.', 'https://lunacraft.com'),
('Rose Garden', 'rose-garden', 'Botanical crochet pattern designer specializing in flower and plant patterns for home decor.', 'https://rosegarden.com');

-- Insert sample tags
INSERT INTO tags (name, slug, color) VALUES
('Free Crochet Pattern', 'free-pattern', '#28a745'),
('Beginner Crochet Pattern', 'beginner-friendly', '#17a2b8'),
('Quick Crochet Project', 'quick-project', '#ffc107'),
('Crochet Gift Idea', 'gift-idea', '#dc3545'),
('Amigurumi Pattern', 'amigurumi', '#6f42c1'),
('Wearable Crochet', 'wearable', '#fd7e14'),
('Home Decor Crochet', 'home-decor', '#20c997'),
('Baby Safe Crochet', 'baby-safe', '#e83e8c');

-- Insert sample patterns
INSERT INTO patterns (
  title, slug, description, short_description, designer_id, category_id,
  difficulty, yarn_weight, yarn_details, hook_size, finished_size,
  pattern_source_url, pattern_source_name, is_free,
  featured_image_url, image_alt_text, meta_title, meta_description,
  keywords, featured
) VALUES
(
  'Adorable Amigurumi Cat',
  'adorable-amigurumi-cat',
  'This sweet little cat is perfect for beginners learning amigurumi. With simple stitches and clear instructions, you''ll have a cuddly companion in no time. The pattern includes detailed photos for each step and tips for perfect shaping.',
  'Beginner-friendly amigurumi cat with step-by-step photos',
  (SELECT id FROM designers WHERE slug = 'sarah-pattern'),
  (SELECT id FROM categories WHERE slug = 'cats'),
  'beginner',
  'medium',
  'Worsted weight cotton yarn in gray, white, and pink',
  'G/6 (4.25mm)',
  'Approximately 6 inches tall',
  'https://example.com/cat-pattern',
  'Free Pattern Library',
  true,
  'https://images.unsplash.com/photo-1574158622682-e40e69881006',
  'Gray and white crocheted amigurumi cat sitting upright',
  'Free Amigurumi Cat Crochet Pattern - Beginner Friendly',
  'Learn to crochet an adorable amigurumi cat with this free beginner pattern. Includes step-by-step photos and detailed instructions.',
  ARRAY['amigurumi', 'cat', 'beginner', 'free pattern', 'crochet'],
  true
),
(
  'Christmas Tree Ornament Set',
  'christmas-tree-ornament-set',
  'Create a beautiful set of Christmas tree ornaments with this versatile pattern. Includes instructions for 5 different ornament styles: snowflakes, bells, stars, candy canes, and mini wreaths. Perfect for holiday decorating or gift-giving.',
  'Set of 5 Christmas ornament patterns for holiday decorating',
  (SELECT id FROM designers WHERE slug = 'mike-stitch'),
  (SELECT id FROM categories WHERE slug = 'christmas'),
  'easy',
  'fine',
  'Metallic thread and cotton yarn in festive colors',
  'E/4 (3.5mm)',
  '3-4 inches each ornament',
  'https://example.com/christmas-ornaments',
  'Holiday Patterns Plus',
  false,
  'https://images.unsplash.com/photo-1512389142860-9c449e58a543',
  'Colorful crocheted Christmas ornaments hanging on tree',
  'Christmas Crochet Ornaments Pattern - 5 Festive Designs',
  'Crochet beautiful Christmas ornaments with this pattern set. Includes snowflakes, bells, stars, candy canes, and wreaths.',
  ARRAY['christmas', 'ornaments', 'holiday', 'decorations', 'crochet'],
  true
),
(
  'Baby Unicorn Lovey Blanket',
  'baby-unicorn-lovey-blanket',
  'This magical unicorn lovey combines a soft security blanket with an adorable unicorn head. Made with baby-safe materials and designed for little hands to grasp and cuddle. The perfect first friend for your little one.',
  'Soft unicorn security blanket perfect for babies',
  (SELECT id FROM designers WHERE slug = 'emma-yarn'),
  (SELECT id FROM categories WHERE slug = 'fantasy-mythical'),
  'intermediate',
  'light',
  'Baby yarn in white, pink, and gold',
  'F/5 (3.75mm)',
  '12x12 inch blanket with 6-inch unicorn head',
  'https://example.com/unicorn-lovey',
  'Baby Dreams Patterns',
  true,
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
  'White and pink crocheted unicorn lovey blanket for babies',
  'Baby Unicorn Lovey Crochet Pattern - Security Blanket',
  'Crochet a magical unicorn lovey blanket for your baby. Soft, cuddly, and perfect for naptime comfort.',
  ARRAY['baby', 'unicorn', 'lovey', 'security blanket', 'crochet'],
  false
);

-- Link patterns to tags
INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'adorable-amigurumi-cat' AND t.slug IN ('free-pattern', 'beginner-friendly', 'amigurumi', 'gift-idea');

INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'christmas-tree-ornament-set' AND t.slug IN ('gift-idea', 'home-decor', 'quick-project');

INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'baby-unicorn-lovey-blanket' AND t.slug IN ('free-pattern', 'baby-safe', 'gift-idea');