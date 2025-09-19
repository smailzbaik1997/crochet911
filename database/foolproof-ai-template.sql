-- Foolproof AI SQL Generation Template for Crochet911 Database
-- This template prevents ALL conflicts and errors when generating SQL with AI
-- Follow this EXACT structure to avoid syntax errors, constraint violations, and data type issues

-- ====================================================================
-- TEMPLATE INSTRUCTIONS FOR AI:
-- 1. Replace ALL placeholder values with actual data
-- 2. Use EXACT syntax shown below (no modifications to structure)
-- 3. Follow enum value restrictions exactly
-- 4. Always include required fields with valid values
-- 5. Use WHERE NOT EXISTS for duplicate prevention
-- 6. NEVER use ON CONFLICT with INSERT ... SELECT
-- ====================================================================

-- STEP 1: Insert Designer (if needed)
-- CRITICAL: Only slug is unique in designers table, NOT name
INSERT INTO designers (name, slug, bio, website_url, social_media, avatar_url)
SELECT 
    '[DESIGNER_NAME]',                          -- Replace with actual designer name
    '[DESIGNER_SLUG]',                          -- Replace with URL-friendly slug
    '[DESIGNER_BIO]',                           -- Replace with bio or auto-generate
    '[WEBSITE_URL]',                            -- Replace with website URL or NULL
    '[SOCIAL_MEDIA_JSON]',                      -- Replace with JSON or NULL
    '[AVATAR_URL]'                              -- Replace with avatar URL or NULL
WHERE NOT EXISTS (
    SELECT 1 FROM designers WHERE slug = '[DESIGNER_SLUG]'
);

-- STEP 2: Insert Parent Category (if needed)
-- Categories have unique constraints on both name AND slug
INSERT INTO categories (name, slug, description, parent_id, sort_order)
SELECT 
    '[PARENT_CATEGORY_NAME]',                   -- Replace with parent category name
    '[PARENT_CATEGORY_SLUG]',                   -- Replace with parent category slug
    '[PARENT_CATEGORY_DESCRIPTION]',            -- Replace with description
    NULL,                                       -- Parent categories have NULL parent_id
    COALESCE((SELECT MAX(sort_order) + 1 FROM categories WHERE parent_id IS NULL), 1)
WHERE NOT EXISTS (
    SELECT 1 FROM categories 
    WHERE name = '[PARENT_CATEGORY_NAME]' OR slug = '[PARENT_CATEGORY_SLUG]'
);

-- STEP 3: Insert Subcategory (if needed)
-- Links to parent category via parent_id
INSERT INTO categories (name, slug, description, parent_id, sort_order)
SELECT 
    '[CATEGORY_NAME]',                          -- Replace with category name
    '[CATEGORY_SLUG]',                          -- Replace with category slug
    '[CATEGORY_DESCRIPTION]',                   -- Replace with description
    (SELECT id FROM categories WHERE slug = '[PARENT_CATEGORY_SLUG]'), -- Reference parent
    COALESCE((SELECT MAX(sort_order) + 1 FROM categories WHERE parent_id = 
        (SELECT id FROM categories WHERE slug = '[PARENT_CATEGORY_SLUG]')), 1)
WHERE NOT EXISTS (
    SELECT 1 FROM categories 
    WHERE name = '[CATEGORY_NAME]' OR slug = '[CATEGORY_SLUG]'
);

-- STEP 4: Insert Required Tags with Colors
-- CRITICAL: Tags table requires color field (hex color code)
INSERT INTO tags (name, slug, color)
SELECT 'Free Pattern', 'free-pattern', '#28a745'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE slug = 'free-pattern');

INSERT INTO tags (name, slug, color)
SELECT 'Beginner Friendly', 'beginner-friendly', '#17a2b8'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE slug = 'beginner-friendly');

INSERT INTO tags (name, slug, color)
SELECT 'Amigurumi', 'amigurumi', '#6f42c1'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE slug = 'amigurumi');

INSERT INTO tags (name, slug, color)
SELECT 'Gift Idea', 'gift-idea', '#dc3545'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE slug = 'gift-idea');

INSERT INTO tags (name, slug, color)
SELECT 'Quick Project', 'quick-project', '#ffc107'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE slug = 'quick-project');

-- STEP 5: Insert Pattern with ALL Required Fields
-- CRITICAL: Use ON CONFLICT only with INSERT ... VALUES (not SELECT)
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
    '[PATTERN_TITLE]',                          -- Replace with pattern title
    '[PATTERN_SLUG]',                           -- Replace with URL-friendly slug
    '[PATTERN_DESCRIPTION]',                    -- Replace with full description
    '[SHORT_DESCRIPTION]',                      -- Replace with short description (150 chars)
    (SELECT id FROM designers WHERE slug = '[DESIGNER_SLUG]'),
    (SELECT id FROM categories WHERE slug = '[CATEGORY_SLUG]'),
    '[DIFFICULTY]',                             -- Must be: beginner|easy|intermediate|advanced|expert
    '[YARN_WEIGHT]',                            -- Must be: light|medium|bulky|super_fine|fine|super_bulky|jumbo
    '[YARN_DETAILS]',                           -- Replace with yarn requirements
    '[HOOK_SIZE]',                              -- Replace with hook size
    '[FINISHED_SIZE]',                          -- Replace with finished dimensions
    '[GAUGE_INFO]',                             -- Replace with gauge info or NULL
    '[TIME_TO_COMPLETE]',                       -- Replace with time estimate or NULL
    '[PATTERN_SOURCE_URL]',                     -- Replace with actual pattern URL
    '[PATTERN_SOURCE_NAME]',                    -- Replace with source name
    true,                                       -- is_free: true|false
    NULL,                                       -- price: NULL for free patterns
    '[FEATURED_IMAGE_URL]',                     -- Replace with image URL or NULL
    '[IMAGE_ALT_TEXT]',                         -- Replace with descriptive alt text
    '[GALLERY_IMAGES_JSON]',                    -- Replace with JSON array or NULL
    '[META_TITLE]',                             -- Replace with SEO title
    '[META_DESCRIPTION]',                       -- Replace with SEO description
    ARRAY['[KEYWORD1]', '[KEYWORD2]', '[KEYWORD3]'], -- Replace with actual keywords
    0,                                          -- view_count: always start at 0
    0,                                          -- like_count: always start at 0
    true,                                       -- is_published: true|false
    false                                       -- featured: true|false
)
ON CONFLICT (slug) DO UPDATE SET 
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

-- STEP 6: Link Pattern to Tags
-- CRITICAL: Use table aliases to avoid ambiguity errors
INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = '[PATTERN_SLUG]'
AND t.slug IN (
    'free-pattern',
    'beginner-friendly',
    'amigurumi',
    'gift-idea'
    -- Add more tag slugs as needed
)
AND NOT EXISTS (
    SELECT 1 FROM pattern_tags pt 
    WHERE pt.pattern_id = p.id AND pt.tag_id = t.id
);

-- ====================================================================
-- REPLACEMENT GUIDE FOR AI:
-- ====================================================================
-- [DESIGNER_NAME]           → Actual designer name (e.g., "Sarah Johnson")
-- [DESIGNER_SLUG]           → URL-friendly slug (e.g., "sarah-johnson")
-- [DESIGNER_BIO]            → Designer bio or auto-generate
-- [WEBSITE_URL]             → Designer website or NULL
-- [SOCIAL_MEDIA_JSON]       → JSON like '{"instagram": "@handle"}' or NULL
-- [AVATAR_URL]              → Avatar image URL or NULL
--
-- [PARENT_CATEGORY_NAME]    → Parent category name (e.g., "Animal Patterns")
-- [PARENT_CATEGORY_SLUG]    → Parent category slug (e.g., "animals")
-- [PARENT_CATEGORY_DESCRIPTION] → Category description
--
-- [CATEGORY_NAME]           → Subcategory name (e.g., "Cat Patterns")
-- [CATEGORY_SLUG]           → Subcategory slug (e.g., "cats")
-- [CATEGORY_DESCRIPTION]    → Subcategory description
--
-- [PATTERN_TITLE]           → Pattern title
-- [PATTERN_SLUG]            → URL-friendly pattern slug
-- [PATTERN_DESCRIPTION]     → Full pattern description
-- [SHORT_DESCRIPTION]       → First 150 characters + "..."
-- [DIFFICULTY]              → beginner|easy|intermediate|advanced|expert
-- [YARN_WEIGHT]             → light|medium|bulky|super_fine|fine|super_bulky|jumbo
-- [YARN_DETAILS]            → Yarn requirements
-- [HOOK_SIZE]               → Hook size (e.g., "5.0mm (H)") - Max 50 chars
-- [FINISHED_SIZE]           → Finished dimensions - Max 300 chars
-- [GAUGE_INFO]              → Gauge information or NULL - Max 300 chars
-- [TIME_TO_COMPLETE]        → Time estimate or NULL - Max 150 chars
-- [PATTERN_SOURCE_URL]      → Actual pattern URL
-- [PATTERN_SOURCE_NAME]     → Source website name
-- [FEATURED_IMAGE_URL]      → Main image URL or NULL
-- [IMAGE_ALT_TEXT]          → Descriptive alt text
-- [GALLERY_IMAGES_JSON]     → JSON array like '["url1", "url2"]' or NULL
-- [META_TITLE]              → SEO title
-- [META_DESCRIPTION]        → SEO description
-- [KEYWORD1], [KEYWORD2]... → Individual keywords for the array
--
-- ====================================================================
-- VALID ENUM VALUES (USE EXACTLY THESE):
-- ====================================================================
-- DIFFICULTY: beginner, easy, intermediate, advanced, expert
-- YARN_WEIGHT: lace, super_fine, fine, light, medium, bulky, super_bulky, jumbo
--              lace (0), super fine (1), fine (2), light (3), medium (4), 
--              bulky (5), super bulky (6), jumbo (7)
--
-- ❌ INVALID: sport, dk, worsted, aran (these will cause enum errors)
-- ✅ CORRECT: light (for sport/DK), medium (for worsted/aran)
-- ====================================================================
-- FIELD LENGTH LIMITS (Important for AI generation):
-- ====================================================================
-- hook_size: 50 characters max
-- finished_size: 300 characters max  
-- gauge_info: 300 characters max
-- time_to_complete: 150 characters max
-- short_description: 500 characters max
-- meta_title: 200 characters max
-- meta_description: 500 characters max
-- image_alt_text: 300 characters max
-- ====================================================================