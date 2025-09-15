-- Sample patterns with working images for testing
-- Run this if your database is empty

-- First, let's make sure we have some categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Cat Crochet Patterns', 'cats', 'Adorable cat crochet patterns including amigurumi cats and cat-themed accessories', 1),
('Dog Crochet Patterns', 'dogs', 'Cute dog crochet patterns and puppy amigurumi designs', 2),
('Home Decor Crochet Patterns', 'home-decor', 'Beautiful home decoration crochet patterns', 3)
ON CONFLICT (slug) DO NOTHING;

-- Add a sample designer
INSERT INTO designers (name, slug, bio) VALUES
('Sample Designer', 'sample-designer', 'A talented crochet pattern designer')
ON CONFLICT (slug) DO NOTHING;

-- Add sample patterns with reliable placeholder images
INSERT INTO patterns (
  title, 
  slug, 
  description, 
  short_description,
  difficulty, 
  yarn_weight,
  yarn_details,
  hook_size,
  finished_size,
  pattern_source_url,
  pattern_source_name,
  is_free,
  featured_image_url,
  image_alt_text,
  is_published,
  featured,
  category_id,
  designer_id
) VALUES
-- Cat Patterns
(
  'Cute Amigurumi Cat',
  'cute-amigurumi-cat',
  'This adorable amigurumi cat pattern is perfect for beginners. Create your own cuddly feline friend with this step-by-step tutorial. The pattern includes detailed instructions and photos.',
  'Beginner-friendly amigurumi cat pattern with step-by-step instructions.',
  'beginner',
  'medium',
  'Worsted weight yarn in orange, white, and black',
  '5.0mm (H)',
  '6 inches tall',
  'https://example.com/cat-pattern',
  'Free Crochet Pattern',
  true,
  'https://images.unsplash.com/photo-1574231164645-d6f0e8553590?w=400&h=300&fit=crop',
  'Orange tabby amigurumi cat crochet pattern',
  true,
  true,
  (SELECT id FROM categories WHERE slug = 'cats'),
  (SELECT id FROM designers WHERE slug = 'sample-designer')
),
(
  'Cat Ear Headband',
  'cat-ear-headband',
  'A fun and stylish cat ear headband perfect for costume parties or everyday wear. This pattern is suitable for intermediate crocheters.',
  'Stylish cat ear headband crochet pattern for costume or everyday wear.',
  'intermediate',
  'light',
  'DK weight yarn in black or desired color',
  '4.0mm (G)',
  'One size fits most adults',
  'https://example.com/headband-pattern',
  'Premium Pattern',
  false,
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
  'Black cat ear headband crochet pattern',
  true,
  false,
  (SELECT id FROM categories WHERE slug = 'cats'),
  (SELECT id FROM designers WHERE slug = 'sample-designer')
),
-- Dog Pattern
(
  'Puppy Amigurumi',
  'puppy-amigurumi',
  'Create an adorable puppy with this comprehensive amigurumi pattern. Perfect for dog lovers and makes a great gift.',
  'Adorable puppy amigurumi pattern perfect for dog lovers.',
  'intermediate',
  'medium',
  'Worsted weight yarn in brown, white, and black',
  '5.0mm (H)',
  '7 inches long',
  'https://example.com/puppy-pattern',
  'Free Pattern Library',
  true,
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
  'Brown and white puppy amigurumi crochet pattern',
  true,
  true,
  (SELECT id FROM categories WHERE slug = 'dogs'),
  (SELECT id FROM designers WHERE slug = 'sample-designer')
),
-- Home Decor Pattern
(
  'Modern Plant Pot Cover',
  'modern-plant-pot-cover',
  'Give your plants a stylish makeover with this modern crochet plant pot cover. Features a clean geometric design.',
  'Modern geometric plant pot cover with clean design.',
  'easy',
  'medium',
  'Cotton worsted weight yarn in neutral colors',
  '5.0mm (H)',
  'Fits 6-8 inch pots',
  'https://example.com/pot-cover-pattern',
  'Modern Crochet Co',
  true,
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
  'Modern geometric crochet plant pot cover pattern',
  true,
  false,
  (SELECT id FROM categories WHERE slug = 'home-decor'),
  (SELECT id FROM designers WHERE slug = 'sample-designer')
),
(
  'Minimalist Wall Hanging',
  'minimalist-wall-hanging',
  'Create a beautiful minimalist wall hanging with this modern crochet pattern. Perfect for contemporary home decor.',
  'Clean and modern crochet wall hanging pattern.',
  'intermediate',
  'medium',
  'Cotton yarn in white or cream',
  '5.0mm (H)',
  '12 inches wide x 16 inches long',
  'https://example.com/wall-hanging-pattern',
  'Clean Design Studio',
  false,
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
  'Minimalist white crochet wall hanging pattern',
  true,
  true,
  (SELECT id FROM categories WHERE slug = 'home-decor'),
  (SELECT id FROM designers WHERE slug = 'sample-designer')
)
ON CONFLICT (slug) DO NOTHING;