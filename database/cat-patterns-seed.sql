-- Cat Crochet Patterns Seed Data Template
-- Specialized seed data focusing on cat-themed crochet patterns for SEO optimization
-- Run this after creating the main schema

-- Insert cat-specific main categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Cat Crochet Patterns', 'cat-patterns', 'Complete collection of cat crochet patterns including amigurumi cats, wearable cat accessories, and cat-themed home decor', 1),
('Amigurumi Cat Crochet Patterns', 'amigurumi-cats', 'Adorable amigurumi cat crochet patterns for stuffed animals and decorative cats', 2),
('Cat Accessory Crochet Patterns', 'cat-accessories', 'Cat-themed accessory crochet patterns including bags, hats, and clothing with cat motifs', 3),
('Cat Home Decor Crochet Patterns', 'cat-home-decor', 'Cat-inspired home decor crochet patterns for pillows, blankets, and decorative items', 4),
('Kitten Crochet Patterns', 'kitten-patterns', 'Sweet kitten crochet patterns perfect for baby items and small decorative pieces', 5);

-- Insert detailed cat breed subcategories
INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'Persian Cat Crochet Patterns', 'persian-cats', 'Fluffy Persian cat crochet patterns with long fur textures and elegant poses', id, 1 FROM categories WHERE slug = 'cat-patterns'
UNION ALL
SELECT 'Siamese Cat Crochet Patterns', 'siamese-cats', 'Distinctive Siamese cat crochet patterns featuring pointed coloration and sleek design', id, 2 FROM categories WHERE slug = 'cat-patterns'
UNION ALL
SELECT 'Maine Coon Cat Crochet Patterns', 'maine-coon-cats', 'Large Maine Coon cat crochet patterns with tufted ears and bushy tails', id, 3 FROM categories WHERE slug = 'cat-patterns'
UNION ALL
SELECT 'Tabby Cat Crochet Patterns', 'tabby-cats', 'Classic tabby cat crochet patterns with striped markings and realistic coloring', id, 4 FROM categories WHERE slug = 'cat-patterns'
UNION ALL
SELECT 'Calico Cat Crochet Patterns', 'calico-cats', 'Colorful calico cat crochet patterns featuring multi-colored fur patterns', id, 5 FROM categories WHERE slug = 'cat-patterns'
UNION ALL
SELECT 'Black Cat Crochet Patterns', 'black-cats', 'Sleek black cat crochet patterns perfect for Halloween and gothic themes', id, 6 FROM categories WHERE slug = 'cat-patterns'
UNION ALL
SELECT 'Orange Cat Crochet Patterns', 'orange-cats', 'Vibrant orange tabby cat crochet patterns with warm autumn colors', id, 7 FROM categories WHERE slug = 'cat-patterns'
UNION ALL
SELECT 'White Cat Crochet Patterns', 'white-cats', 'Pure white cat crochet patterns for elegant and minimalist designs', id, 8 FROM categories WHERE slug = 'cat-patterns';

-- Insert amigurumi cat style subcategories
INSERT INTO categories (name, slug, description, parent_id, sort_order)
SELECT 'Realistic Cat Crochet Patterns', 'realistic-cats', 'Lifelike cat crochet patterns with detailed features and realistic proportions', id, 1 FROM categories WHERE slug = 'amigurumi-cats'
UNION ALL
SELECT 'Kawaii Cat Crochet Patterns', 'kawaii-cats', 'Cute Japanese-style kawaii cat crochet patterns with big eyes and sweet expressions', id, 2 FROM categories WHERE slug = 'amigurumi-cats'
UNION ALL
SELECT 'Cartoon Cat Crochet Patterns', 'cartoon-cats', 'Fun cartoon-style cat crochet patterns inspired by popular animated characters', id, 3 FROM categories WHERE slug = 'amigurumi-cats'
UNION ALL
SELECT 'Sleeping Cat Crochet Patterns', 'sleeping-cats', 'Peaceful sleeping cat crochet patterns in curled and relaxed positions', id, 4 FROM categories WHERE slug = 'amigurumi-cats'
UNION ALL
SELECT 'Playing Cat Crochet Patterns', 'playing-cats', 'Active playing cat crochet patterns with toys and dynamic poses', id, 5 FROM categories WHERE slug = 'amigurumi-cats';

-- Insert cat accessory subcategories
INSERT INTO categories (name, slug, description, parent_id, sort_order)
SELECT 'Cat Ear Hat Crochet Patterns', 'cat-ear-hats', 'Adorable cat ear hat crochet patterns for children and cat lovers', id, 1 FROM categories WHERE slug = 'cat-accessories'
UNION ALL
SELECT 'Cat Face Bag Crochet Patterns', 'cat-face-bags', 'Cute cat face bag crochet patterns for purses and tote bags', id, 2 FROM categories WHERE slug = 'cat-accessories'
UNION ALL
SELECT 'Cat Tail Scarf Crochet Patterns', 'cat-tail-scarves', 'Playful cat tail scarf crochet patterns for winter accessories', id, 3 FROM categories WHERE slug = 'cat-accessories'
UNION ALL
SELECT 'Cat Paw Mittens Crochet Patterns', 'cat-paw-mittens', 'Cozy cat paw mitten crochet patterns with toe beans and claws', id, 4 FROM categories WHERE slug = 'cat-accessories'
UNION ALL
SELECT 'Cat Sweater Crochet Patterns', 'cat-sweaters', 'Cat-themed sweater crochet patterns with feline motifs and designs', id, 5 FROM categories WHERE slug = 'cat-accessories';

-- Insert cat home decor subcategories
INSERT INTO categories (name, slug, description, parent_id, sort_order)
SELECT 'Cat Pillow Crochet Patterns', 'cat-pillows', 'Decorative cat pillow crochet patterns for sofas and beds', id, 1 FROM categories WHERE slug = 'cat-home-decor'
UNION ALL
SELECT 'Cat Blanket Crochet Patterns', 'cat-blankets', 'Cozy cat blanket crochet patterns featuring feline designs and motifs', id, 2 FROM categories WHERE slug = 'cat-home-decor'
UNION ALL
SELECT 'Cat Wall Hanging Crochet Patterns', 'cat-wall-hangings', 'Artistic cat wall hanging crochet patterns for home decoration', id, 3 FROM categories WHERE slug = 'cat-home-decor'
UNION ALL
SELECT 'Cat Rug Crochet Patterns', 'cat-rugs', 'Functional cat rug crochet patterns for floors and cat areas', id, 4 FROM categories WHERE slug = 'cat-home-decor'
UNION ALL
SELECT 'Cat Plant Pot Cover Crochet Patterns', 'cat-plant-covers', 'Whimsical cat plant pot cover crochet patterns for indoor gardens', id, 5 FROM categories WHERE slug = 'cat-home-decor';

-- Insert specialized cat pattern designers
INSERT INTO designers (name, slug, bio, website_url) VALUES
('Whiskers & Yarn', 'whiskers-yarn', 'Specialized cat crochet pattern designer with over 8 years creating realistic and adorable feline amigurumi patterns. Expert in cat anatomy and behavior.', 'https://whiskersandyarn.com'),
('Feline Fiber Arts', 'feline-fiber', 'Professional cat breeder turned crochet designer, bringing authentic cat characteristics to every pattern. Specializes in breed-specific designs.', 'https://felinefiberarts.com'),
('Meow Craft Studio', 'meow-craft', 'Cat cafe owner and crochet artist creating patterns inspired by rescued cats. Focuses on realistic textures and expressions.', 'https://meowcraftstudio.com'),
('Purrfect Patterns', 'purrfect-patterns', 'Veterinarian and crochet designer combining medical knowledge with artistic skills to create anatomically accurate cat patterns.', 'https://purrfectpatterns.com'),
('Kitty Stitch Co', 'kitty-stitch', 'Mother-daughter team specializing in cat-themed family patterns, from baby items to adult accessories with feline motifs.', 'https://kittystitchco.com');

-- Insert cat-specific tags
INSERT INTO tags (name, slug, color) VALUES
('Free Cat Pattern', 'free-cat-pattern', '#28a745'),
('Beginner Cat Crochet', 'beginner-cat', '#17a2b8'),
('Realistic Cat Pattern', 'realistic-cat', '#6c757d'),
('Kawaii Cat Style', 'kawaii-cat', '#ff69b4'),
('Black Cat Pattern', 'black-cat', '#000000'),
('Orange Tabby Pattern', 'orange-tabby', '#ff8c00'),
('Persian Cat Pattern', 'persian-cat', '#dda0dd'),
('Siamese Cat Pattern', 'siamese-cat', '#4169e1'),
('Cat Lover Gift', 'cat-lover-gift', '#dc3545'),
('Halloween Cat', 'halloween-cat', '#ff4500'),
('Cat Amigurumi', 'cat-amigurumi', '#6f42c1'),
('Cat Home Decor', 'cat-home-decor', '#20c997');

-- Insert comprehensive cat crochet patterns
INSERT INTO patterns (
  title, slug, description, short_description, designer_id, category_id,
  difficulty, yarn_weight, yarn_details, hook_size, finished_size,
  pattern_source_url, pattern_source_name, is_free,
  featured_image_url, image_alt_text, meta_title, meta_description,
  keywords, featured
) VALUES
(
  'Realistic Persian Cat Amigurumi Pattern',
  'realistic-persian-cat-amigurumi',
  'Create a stunning realistic Persian cat with this detailed amigurumi pattern. Features long fluffy fur texture created with loop stitches, expressive eyes, and authentic Persian cat proportions. Includes step-by-step photos for fur techniques and facial features. Perfect for cat lovers who want a lifelike representation.',
  'Detailed Persian cat amigurumi with realistic fur texture and features',
  (SELECT id FROM designers WHERE slug = 'whiskers-yarn'),
  (SELECT id FROM categories WHERE slug = 'persian-cats'),
  'advanced',
  'medium',
  'Worsted weight yarn in cream, gray, and pink. Fuzzy yarn for fur texture',
  'G/6 (4.25mm) and H/8 (5.0mm)',
  '8 inches long, 6 inches tall',
  'https://example.com/persian-cat-pattern',
  'Premium Cat Patterns',
  false,
  'https://images.unsplash.com/photo-1574158622682-e40e69881006',
  'Realistic cream and gray Persian cat amigurumi with fluffy fur',
  'Persian Cat Amigurumi Crochet Pattern - Realistic Fluffy Design',
  'Crochet a realistic Persian cat amigurumi with this advanced pattern. Features authentic fur texture and detailed instructions for lifelike results.',
  ARRAY['persian cat', 'realistic amigurumi', 'cat crochet pattern', 'fluffy cat', 'advanced crochet'],
  true
),
(
  'Kawaii Black Cat with Witch Hat Halloween Pattern',
  'kawaii-black-cat-witch-hat',
  'Adorable kawaii-style black cat wearing a tiny witch hat, perfect for Halloween decorations. Features oversized cute eyes, simple construction suitable for beginners, and removable witch hat. Includes bonus mini broomstick pattern. Great for Halloween gifts or seasonal decor.',
  'Cute kawaii black cat with witch hat for Halloween decorating',
  (SELECT id FROM designers WHERE slug = 'meow-craft'),
  (SELECT id FROM categories WHERE slug = 'black-cats'),
  'beginner',
  'medium',
  'Black, purple, and white worsted weight yarn',
  'G/6 (4.25mm)',
  '5 inches tall with hat',
  'https://example.com/halloween-black-cat',
  'Free Seasonal Patterns',
  true,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  'Cute black cat amigurumi wearing purple witch hat for Halloween',
  'Free Halloween Black Cat Crochet Pattern - Kawaii Style with Witch Hat',
  'Crochet an adorable kawaii black cat with witch hat for Halloween. Free beginner-friendly pattern with step-by-step photos.',
  ARRAY['black cat', 'halloween crochet', 'kawaii amigurumi', 'witch hat', 'free pattern', 'beginner'],
  true
),
(
  'Siamese Cat Lovey Security Blanket',
  'siamese-cat-lovey-blanket',
  'Combine the elegance of Siamese cats with the comfort of a security blanket. This lovey features a detailed Siamese cat head attached to a soft granny square blanket in coordinating colors. Perfect for cat-loving children or as a unique baby gift. Includes safety considerations for infant use.',
  'Siamese cat security blanket lovey for babies and toddlers',
  (SELECT id FROM designers WHERE slug = 'kitty-stitch'),
  (SELECT id FROM categories WHERE slug = 'siamese-cats'),
  'intermediate',
  'light',
  'Baby yarn in cream, brown, and blue',
  'F/5 (3.75mm)',
  '12x12 inch blanket with 5-inch cat head',
  'https://example.com/siamese-cat-lovey',
  'Baby Cat Patterns',
  true,
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
  'Cream and brown Siamese cat lovey blanket for babies',
  'Siamese Cat Lovey Crochet Pattern - Security Blanket for Babies',
  'Crochet a beautiful Siamese cat lovey security blanket. Perfect baby gift combining comfort with adorable feline design.',
  ARRAY['siamese cat', 'baby lovey', 'security blanket', 'cat baby gift', 'free pattern'],
  false
),
(
  'Orange Tabby Cat Family Set',
  'orange-tabby-family-set',
  'Create an entire family of orange tabby cats with this comprehensive pattern set. Includes mama cat, papa cat, and three kittens in different poses. Each cat features realistic tabby markings using color-changing techniques. Perfect for cat collectors or as a family gift set.',
  'Complete orange tabby cat family with mama, papa, and three kittens',
  (SELECT id FROM designers WHERE slug = 'feline-fiber'),
  (SELECT id FROM categories WHERE slug = 'orange-cats'),
  'intermediate',
  'medium',
  'Orange, white, and black worsted weight yarn',
  'G/6 (4.25mm)',
  'Adults: 7 inches, Kittens: 4 inches',
  'https://example.com/orange-tabby-family',
  'Family Pet Patterns',
  false,
  'https://images.unsplash.com/photo-1513245543132-31f507417b26',
  'Orange tabby cat family with parents and three kittens',
  'Orange Tabby Cat Family Crochet Pattern Set - 5 Cats',
  'Crochet a complete orange tabby cat family with this pattern set. Includes detailed instructions for realistic markings and poses.',
  ARRAY['orange tabby', 'cat family', 'multiple cats', 'tabby markings', 'cat collection'],
  true
),
(
  'Cat Ear Beanie with Pom Poms',
  'cat-ear-beanie-pom-poms',
  'Cozy and cute cat ear beanie perfect for cat lovers of all ages. Features realistic cat ears with inner ear detail and fluffy pom poms for extra cuteness. Includes sizing for baby through adult. Great for winter wear or costume parties.',
  'Warm cat ear beanie with pom poms in multiple sizes',
  (SELECT id FROM designers WHERE slug = 'purrfect-patterns'),
  (SELECT id FROM categories WHERE slug = 'cat-ear-hats'),
  'easy',
  'medium',
  'Gray, pink, and white worsted weight yarn',
  'H/8 (5.0mm)',
  'Multiple sizes: Baby to Adult XL',
  'https://example.com/cat-ear-beanie',
  'Wearable Cat Patterns',
  true,
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
  'Gray cat ear beanie with pink inner ears and white pom poms',
  'Cat Ear Beanie Crochet Pattern - Free Pattern with Pom Poms',
  'Crochet a cute cat ear beanie with pom poms. Free pattern includes all sizes from baby to adult with detailed instructions.',
  ARRAY['cat ears', 'beanie', 'winter hat', 'cat accessories', 'free pattern', 'all sizes'],
  false
),
(
  'Sleeping Cat Pillow Cover',
  'sleeping-cat-pillow-cover',
  'Transform any pillow into an adorable sleeping cat with this clever pillow cover pattern. Features a curled-up cat design that wraps around a standard throw pillow. Includes detailed facial features and realistic sleeping pose. Perfect for cat-themed home decor.',
  'Pillow cover designed as a sleeping cat for home decoration',
  (SELECT id FROM designers WHERE slug = 'meow-craft'),
  (SELECT id FROM categories WHERE slug = 'cat-pillows'),
  'intermediate',
  'medium',
  'Gray, white, and black cotton yarn',
  'G/6 (4.25mm)',
  'Fits 16-inch square pillow',
  'https://example.com/sleeping-cat-pillow',
  'Home Decor Cat Patterns',
  false,
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
  'Gray sleeping cat pillow cover on white pillow',
  'Sleeping Cat Pillow Cover Crochet Pattern - Home Decor',
  'Crochet a unique sleeping cat pillow cover for your home. Detailed pattern creates realistic curled-up cat design.',
  ARRAY['cat pillow', 'home decor', 'sleeping cat', 'pillow cover', 'cat decoration'],
  false
);

-- Link cat patterns to appropriate tags
INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'realistic-persian-cat-amigurumi' AND t.slug IN ('persian-cat-pattern', 'realistic-cat-pattern', 'cat-amigurumi');

INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'kawaii-black-cat-witch-hat' AND t.slug IN ('free-cat-pattern', 'beginner-cat', 'black-cat-pattern', 'kawaii-cat-style', 'halloween-cat');

INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'siamese-cat-lovey-blanket' AND t.slug IN ('free-cat-pattern', 'siamese-cat-pattern', 'cat-lover-gift');

INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'orange-tabby-family-set' AND t.slug IN ('orange-tabby-pattern', 'cat-amigurumi', 'cat-lover-gift');

INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'cat-ear-beanie-pom-poms' AND t.slug IN ('free-cat-pattern', 'beginner-cat', 'cat-lover-gift');

INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'sleeping-cat-pillow-cover' AND t.slug IN ('cat-home-decor', 'realistic-cat-pattern');

-- Additional sample patterns for comprehensive coverage
INSERT INTO patterns (
  title, slug, description, short_description, designer_id, category_id,
  difficulty, yarn_weight, yarn_details, hook_size, finished_size,
  pattern_source_url, pattern_source_name, is_free,
  featured_image_url, image_alt_text, meta_title, meta_description,
  keywords, featured
) VALUES
(
  'Maine Coon Cat with Tufted Ears',
  'maine-coon-tufted-ears',
  'Majestic Maine Coon cat pattern featuring the breed''s distinctive tufted ears and bushy tail. Uses advanced techniques for realistic fur texture and impressive size. Includes detailed instructions for creating the characteristic ear tufts and facial features.',
  'Large Maine Coon cat with distinctive tufted ears and bushy tail',
  (SELECT id FROM designers WHERE slug = 'feline-fiber'),
  (SELECT id FROM categories WHERE slug = 'maine-coon-cats'),
  'advanced',
  'bulky',
  'Brown, cream, and black bulky weight yarn',
  'J/10 (6.0mm)',
  '12 inches long, 8 inches tall',
  'https://example.com/maine-coon-pattern',
  'Large Breed Cat Patterns',
  false,
  'https://images.unsplash.com/photo-1574158622682-e40e69881006',
  'Large brown Maine Coon cat with tufted ears',
  'Maine Coon Cat Crochet Pattern - Large Breed with Tufted Ears',
  'Crochet a majestic Maine Coon cat with distinctive tufted ears. Advanced pattern for realistic large breed representation.',
  ARRAY['maine coon', 'large cat', 'tufted ears', 'realistic cat', 'advanced crochet'],
  true
),
(
  'Calico Cat Granny Square Blanket',
  'calico-cat-granny-square-blanket',
  'Beautiful granny square blanket featuring calico cat motifs in each square. Combines traditional granny square technique with modern cat designs. Perfect for cat lovers who want a functional and decorative piece.',
  'Granny square blanket with calico cat motifs in each square',
  (SELECT id FROM designers WHERE slug = 'kitty-stitch'),
  (SELECT id FROM categories WHERE slug = 'cat-blankets'),
  'intermediate',
  'medium',
  'Orange, black, white, and cream worsted weight yarn',
  'G/6 (4.25mm)',
  '48x60 inches (adjustable)',
  'https://example.com/calico-granny-blanket',
  'Cat Blanket Patterns',
  true,
  'https://images.unsplash.com/photo-1513245543132-31f507417b26',
  'Colorful granny square blanket with calico cat designs',
  'Calico Cat Granny Square Blanket Crochet Pattern - Free',
  'Crochet a beautiful calico cat granny square blanket. Free pattern combines traditional squares with modern cat motifs.',
  ARRAY['calico cat', 'granny square', 'cat blanket', 'free pattern', 'home decor'],
  false
);

-- Insert additional pattern tags for new patterns
INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'maine-coon-tufted-ears' AND t.slug IN ('realistic-cat-pattern', 'cat-amigurumi');

INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'calico-cat-granny-square-blanket' AND t.slug IN ('free-cat-pattern', 'cat-home-decor', 'cat-lover-gift');