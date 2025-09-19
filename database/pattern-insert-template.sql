INSERT INTO categories (name, slug, description, sort_order) 
INSERT INTO categories (name, slug, description, sort_order) 
SELECT 
    'Animal Crochet Patterns',
    'animals',
    'Adorable amigurumi animal crochet patterns and wearable animal-themed designs for all skill levels',
    1
WHERE 'Animal Crochet Patterns' IS NOT NULL AND 'animals' IS NOT NULL
AND NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Animal Crochet Patterns' OR slug = 'animals');

INSERT INTO categories (name, slug, description, parent_id, sort_order) 
SELECT 'Cat Crochet Patterns', 'cats', 'Feline-inspired crochet patterns including amigurumi cats and wearable designs', (SELECT id FROM categories WHERE slug = 'animals'), 1
WHERE 'Cat Crochet Patterns' IS NOT NULL AND 'cats' IS NOT NULL
AND NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Cat Crochet Patterns' OR slug = 'cats');

INSERT INTO designers (name, slug, bio, website_url, social_media, avatar_url) 
SELECT 'Sarah Johnson', 'sarah-johnson', 'Expert amigurumi designer with over 10 years of experience creating adorable animal crochet patterns and comprehensive tutorials.', 'https://sarahjohnsondesigns.com', '{"instagram": "@sarahcrochet", "pinterest": "sarahdesigns", "youtube": "SarahCrochetTutorials"}', 'https://example.com/designer-avatar.jpg'
WHERE 'Sarah Johnson' IS NOT NULL AND 'sarah-johnson' IS NOT NULL
AND NOT EXISTS (SELECT 1 FROM designers WHERE name = 'Sarah Johnson' OR slug = 'sarah-johnson');

INSERT INTO tags (name, slug, color) 
SELECT 'Free Pattern', 'free-pattern', '#28a745'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Free Pattern' OR slug = 'free-pattern');

INSERT INTO tags (name, slug, color) 
SELECT 'Beginner Friendly', 'beginner-friendly', '#17a2b8'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Beginner Friendly' OR slug = 'beginner-friendly');

INSERT INTO tags (name, slug, color) 
SELECT 'Amigurumi', 'amigurumi', '#6f42c1'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Amigurumi' OR slug = 'amigurumi');

INSERT INTO tags (name, slug, color) 
SELECT 'Cat Pattern', 'cat-pattern', '#fd7e14'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Cat Pattern' OR slug = 'cat-pattern');

INSERT INTO tags (name, slug, color) 
SELECT 'Quick Project', 'quick-project', '#ffc107'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Quick Project' OR slug = 'quick-project');

INSERT INTO tags (name, slug, color) 
SELECT 'Gift Idea', 'gift-idea', '#dc3545'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Gift Idea' OR slug = 'gift-idea');

INSERT INTO tags (name, slug, color) 
SELECT 'Intermediate', 'intermediate', '#6c757d'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Intermediate' OR slug = 'intermediate');

INSERT INTO tags (name, slug, color) 
SELECT 'Advanced', 'advanced', '#343a40'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Advanced' OR slug = 'advanced');

INSERT INTO tags (name, slug, color) 
SELECT 'Home Decor', 'home-decor', '#20c997'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Home Decor' OR slug = 'home-decor');

INSERT INTO tags (name, slug, color) 
SELECT 'Baby Safe', 'baby-safe', '#e83e8c'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Baby Safe' OR slug = 'baby-safe');

INSERT INTO patterns (
    title,
    slug,
    description,
    short_description,
    designer_id,
    category_id,
    difficulty,
    yarn_weight,
    yarn_details,
    hook_size,
    finished_size,
    gauge_info,
    time_to_complete,
    pattern_source_url,
    pattern_source_name,
    is_free,
    price,
    featured_image_url,
    image_alt_text,
    gallery_images,
    meta_title,
    meta_description,
    keywords,
    view_count,
    like_count,
    is_published,
    featured
) VALUES (
    'Adorable Sitting Cat Amigurumi',
    'adorable-sitting-cat-amigurumi',
    'Create this adorable sitting cat amigurumi with detailed step-by-step instructions. Perfect for beginners, this pattern includes clear photos and helpful tips to ensure your success. The finished cat has a sweet expression and sits perfectly on shelves or desks. Made with soft worsted weight yarn, this cuddly companion is approximately 6 inches tall and makes a wonderful gift for cat lovers of all ages.',
    'Beginner-friendly sitting cat amigurumi with step-by-step photos and clear instructions',
    (SELECT id FROM designers WHERE slug = 'sarah-johnson'),
    (SELECT id FROM categories WHERE slug = 'cats'),
    'beginner',
    'medium',
    'Worsted weight cotton yarn in orange, white, and black. Approximately 100g orange, 50g white, 25g black.',
    '5.0mm (H)',
    'Approximately 6 inches tall and 4 inches wide when sitting',
    '14 stitches and 16 rows = 4 inches in single crochet',
    '4-6 hours for beginners',
    'https://example.com/adorable-sitting-cat-pattern',
    'Free Crochet Pattern Library',
    true,
    NULL,
    'https://images.unsplash.com/photo-1574231164645-d6f0e8553590?w=600&h=400&fit=crop',
    'Orange tabby sitting cat amigurumi crochet pattern with white chest and black details',
    '["https://example.com/image1.jpg", "https://example.com/image2.jpg", "https://example.com/image3.jpg"]',
    'Free Adorable Sitting Cat Amigurumi Crochet Pattern - Beginner Friendly',
    'Learn to crochet an adorable sitting cat amigurumi with this free beginner pattern. Includes step-by-step photos, clear instructions, and helpful tips for success.',
    ARRAY['amigurumi', 'cat crochet pattern', 'beginner crochet', 'free pattern', 'sitting cat', 'orange tabby', 'crochet tutorial'],
    0,
    0,
    true,
    false
) ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    short_description = EXCLUDED.short_description,
    designer_id = EXCLUDED.designer_id,
    category_id = EXCLUDED.category_id,
    difficulty = EXCLUDED.difficulty,
    yarn_weight = EXCLUDED.yarn_weight,
    yarn_details = EXCLUDED.yarn_details,
    hook_size = EXCLUDED.hook_size,
    finished_size = EXCLUDED.finished_size,
    gauge_info = EXCLUDED.gauge_info,
    time_to_complete = EXCLUDED.time_to_complete,
    pattern_source_url = EXCLUDED.pattern_source_url,
    pattern_source_name = EXCLUDED.pattern_source_name,
    is_free = EXCLUDED.is_free,
    price = EXCLUDED.price,
    featured_image_url = EXCLUDED.featured_image_url,
    image_alt_text = EXCLUDED.image_alt_text,
    gallery_images = EXCLUDED.gallery_images,
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description,
    keywords = EXCLUDED.keywords,
    view_count = EXCLUDED.view_count,
    like_count = EXCLUDED.like_count,
    is_published = EXCLUDED.is_published,
    featured = EXCLUDED.featured,
    updated_at = NOW();

INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'adorable-sitting-cat-amigurumi' 
AND t.slug IN (
    'free-pattern',
    'beginner-friendly', 
    'amigurumi',
    'cat-pattern',
    'gift-idea'
)
ON CONFLICT (pattern_id, tag_id) DO NOTHING;