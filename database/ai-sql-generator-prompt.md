# AI SQL Generator Prompt for Crochet911 Database

## Instructions for AI Assistant

You are helping to generate SQL insert statements for the Crochet911 database. Use the template and data provided below to create safe, production-ready SQL code that prevents NULL constraint violations and duplicate entries.

### Database Schema Summary

**Required Fields (NOT NULL):**
- `categories`: name, slug
- `designers`: name  
- `patterns`: title, slug, description, pattern_source_url, difficulty
- `tags`: name, slug

**Important Field Names:**
- Categories table uses `parent_id` (UUID reference), NOT `parent_category`
- When specifying parent category, provide the parent category name/slug for lookup
- AI should generate: `(SELECT id FROM categories WHERE slug = 'parent-slug')`
- **Patterns have direct `category_id` foreign key - NO pattern_categories table exists**
- **Pattern-tag relationships use `pattern_tags` table (pattern_id, tag_id)**

**Enum Values - Use EXACTLY these values:**

**Difficulty Levels:** `beginner`, `easy`, `intermediate`, `advanced`, `expert`

**Yarn Weights:** `lace`, `super_fine`, `fine`, `light`, `medium`, `bulky`, `super_bulky`, `jumbo`, `lace (0)`, `super fine (1)`, `fine (2)`, `light (3)`, `medium (4)`, `bulky (5)`, `super bulky (6)`, `jumbo (7)`

❌ **INVALID:** `sport`, `dk`, `worsted` (these will cause enum errors)
✅ **CORRECT:** `light` (for sport/DK weight), `medium` (for worsted weight)

**Auto-Generated Fields:**
- All tables: id (UUID), created_at, updated_at
- Categories: sort_order (default 0)
- Patterns: view_count (default 0), like_count (default 0), is_published (default true), featured (default false)

**Table Relationships:**
- `patterns.category_id` → `categories.id` (direct foreign key, NOT many-to-many)
- `patterns.designer_id` → `designers.id` (direct foreign key)
- `pattern_tags` table handles pattern ↔ tag many-to-many relationships
- `categories.parent_id` → `categories.id` (self-referencing for subcategories)

### Data Input Template

```yaml
# PATTERN DATA TO CONVERT TO SQL
pattern:
  title: "[REQUIRED] Pattern title here"
  slug: "[AUTO-GENERATE if empty] URL-friendly version of title"
  description: "[REQUIRED] Full pattern description"
  short_description: "[AUTO-GENERATE if empty] First 100 chars of description"
  difficulty: "[REQUIRED] beginner|easy|intermediate|advanced|expert"
  yarn_weight: "[OPTIONAL] lace|super_fine|fine|light|medium|bulky|super_bulky|jumbo OR descriptive format: 'super bulky (6)'"
  yarn_details: "[OPTIONAL] Yarn requirements and details"
  hook_size: "[OPTIONAL] Crochet hook size"
  finished_size: "[OPTIONAL] Dimensions of finished project"
  gauge_info: "[OPTIONAL] Stitch gauge information"
  time_to_complete: "[OPTIONAL] Estimated completion time"
  pattern_source_url: "[REQUIRED] Link to the actual pattern"
  pattern_source_name: "[AUTO-GENERATE if empty] Extract from URL domain"
  is_free: "[DEFAULT: true] true|false"
  price: "[OPTIONAL] Price if not free"
  featured_image_url: "[OPTIONAL] Main pattern image URL"
  image_alt_text: "[AUTO-GENERATE if empty] Based on title + description"
  gallery_images: "[OPTIONAL] JSON array of additional images"
  meta_title: "[AUTO-GENERATE if empty] SEO title based on pattern title"
  meta_description: "[AUTO-GENERATE if empty] SEO description based on short_description"
  keywords: "[AUTO-GENERATE if empty] PostgreSQL array format: ARRAY['keyword1', 'keyword2', 'keyword3'] based on title, difficulty, yarn_weight"
  is_published: "[DEFAULT: true] true|false"
  featured: "[DEFAULT: false] true|false"

category:
  name: "[REQUIRED] Category display name"
  slug: "[AUTO-GENERATE if empty] URL-friendly version of name"
  description: "[AUTO-GENERATE if empty] Description based on name"
  parent_id: "[OPTIONAL] Parent category ID or name reference for subcategories"
  sort_order: "[AUTO-GENERATE if empty] Increment from existing categories"

designer:
  name: "[REQUIRED] Designer full name"
  slug: "[AUTO-GENERATE if empty] URL-friendly version of name"
  bio: "[AUTO-GENERATE if empty] Generic bio based on specialization"
  website_url: "[OPTIONAL] Designer website"
  social_media: "[OPTIONAL] JSON object with social links"
  avatar_url: "[OPTIONAL] Designer profile image"

tags:
  - "[AUTO-SELECT] Based on difficulty, yarn_weight, pattern type"
  - "[CUSTOM] Any additional tags you specify"
```

### PostgreSQL Data Type Formatting

**CRITICAL: Use correct PostgreSQL syntax for special data types:**

1. **Arrays (keywords field)**: Use `ARRAY['item1', 'item2', 'item3']` format
   - ❌ WRONG: `'word1, word2, word3'` (causes malformed array error)
   - ✅ CORRECT: `ARRAY['amigurumi', 'beginner', 'crochet pattern', 'free pattern']`

2. **JSON Objects (social_media, gallery_images)**: Use single quotes around JSON
   - ❌ WRONG: `{"key": "value"}`
   - ✅ CORRECT: `'{"instagram": "@username", "youtube": "channel_name"}'`

3. **Boolean Values**: Use lowercase without quotes
   - ✅ CORRECT: `true`, `false`
   - ❌ WRONG: `'true'`, `'false'`

4. **NULL Values**: Use `NULL` without quotes
   - ✅ CORRECT: `NULL`
   - ❌ WRONG: `'NULL'`, `'null'`

**CRITICAL: Table Names and Relationships**
- ❌ **DO NOT USE**: `pattern_categories` (this table does not exist)
- ✅ **CORRECT**: Patterns have direct `category_id` field linking to categories
- ✅ **CORRECT**: Use `pattern_tags` table for pattern-tag relationships
- Pattern belongs to ONE category via `category_id` foreign key
- Pattern can have MULTIPLE tags via `pattern_tags` junction table

### Auto-Generation Rules

When fields are missing or empty, generate them using these rules:

1. **Slugs**: Convert names/titles to lowercase, replace spaces with hyphens, remove special characters
2. **Short descriptions**: Use PostgreSQL's LEFT() function: `LEFT(description, 150) || '...'`
3. **Pattern source name**: Extract domain from pattern_source_url (e.g., "docs.google.com" → "docs.google.com")
4. **Image alt text**: "[Pattern title] crochet pattern - [difficulty] level"
5. **Meta title**: "[Pattern title] - Free Crochet Pattern | Crochet911"
6. **Meta description**: Use PostgreSQL LEFT() with concatenation: `LEFT(short_description, 150) || '... Download this [difficulty] crochet pattern for free.'`
7. **Keywords**: Always include: pattern title words, difficulty level, "crochet pattern", "free pattern" - FORMAT: ARRAY['word1', 'word2', 'word3']
8. **Category description**: "[Category name] featuring [type] crochet patterns for all skill levels"
9. **Designer bio**: "Talented crochet pattern designer specializing in [category type] patterns."
10. **Tags**: Auto-select from: free-pattern, beginner-friendly, amigurumi, gift-idea, quick-project, home-decor
11. **Sort order**: Use COALESCE with subquery: `COALESCE((SELECT MAX(sort_order) + 1 FROM categories), 1)`
12. **Tags must include color**: Always provide a color field like `'#28a745'` for each tag

### PostgreSQL Function Usage

**Use these PostgreSQL functions for dynamic content:**
- `LEFT(text, length)` - Truncate text to specific length
- `COALESCE(value1, value2)` - Return first non-null value  
- `NOW()` - Current timestamp
- String concatenation with `||` operator
- **Example**: `LEFT('Get your hands on this adorable...', 150) || '...'`

### Output Requirements

Generate SQL that:
- Uses the safe template from `pattern-insert-template.sql`
- Includes NULL protection with `WHERE ... IS NOT NULL` conditions
- Prevents duplicates with `NOT EXISTS` checks
- Handles parent-child category relationships correctly
- **Sets pattern.category_id directly (NO pattern_categories table)**
- Links patterns to tags via `pattern_tags` table only
- Uses proper conflict resolution with CORRECT constraint columns

### CRITICAL: Correct SQL Syntax for Data Insertion

**FUNDAMENTAL RULE: `ON CONFLICT` can ONLY be used with `INSERT ... VALUES`, NOT with `INSERT ... SELECT`**

**✅ CORRECT - Use WHERE NOT EXISTS with SELECT statements:**

```sql
-- ✅ CORRECT - Categories table
INSERT INTO categories (name, slug, description, parent_id, sort_order)
SELECT 'Category Name', 'category-slug', 'Description here', NULL, 1
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Category Name' OR slug = 'category-slug');

-- ✅ CORRECT - Designers table (IMPORTANT: DO NOT use ON CONFLICT with SELECT)
INSERT INTO designers (name, slug, bio, website_url, social_media, avatar_url)
SELECT 'Designer Name', 'designer-slug', 'Bio here', 'https://website.com', NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM designers WHERE slug = 'designer-slug');

-- ✅ CORRECT - Tags table (MUST include color field)
INSERT INTO tags (name, slug, color)
SELECT 'Tag Name', 'tag-slug', '#28a745'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Tag Name' OR slug = 'tag-slug');

-- ✅ CORRECT - Patterns table with ON CONFLICT (only for VALUES, not SELECT)
INSERT INTO patterns (
    title, slug, description, short_description, difficulty, 
    yarn_weight, pattern_source_url, category_id, designer_id, 
    meta_title, meta_description, keywords
) VALUES (
    'Pattern Title', 'pattern-slug', 'Description here', 'Short desc',
    'beginner', 'medium', 'https://pattern-url.com',
    (SELECT id FROM categories WHERE slug = 'category-slug'),
    (SELECT id FROM designers WHERE slug = 'designer-slug'),
    'SEO Title', 'SEO Description', ARRAY['keyword1', 'keyword2']
)
ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    updated_at = NOW();

-- ✅ CORRECT - Pattern Tags (no ON CONFLICT with SELECT)
INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t
WHERE p.slug = 'pattern-slug' 
AND t.slug IN ('tag1', 'tag2')
AND NOT EXISTS (
    SELECT 1 FROM pattern_tags pt 
    WHERE pt.pattern_id = p.id AND pt.tag_id = t.id
);
```

**❌ WRONG - These cause syntax errors:**
```sql
-- SYNTAX ERROR: ON CONFLICT cannot be used with INSERT ... SELECT
INSERT INTO designers (...) 
SELECT ...
ON CONFLICT (slug) DO NOTHING;  -- ERROR: syntax error at or near "ON"

-- WRONG: name is not a unique constraint in designers table
ON CONFLICT (name) DO NOTHING;  -- ERROR: no unique constraint on name

-- WRONG: Missing required color field in tags
INSERT INTO tags (name, slug) VALUES (...);  -- ERROR: color field required
```

**CRITICAL SYNTAX RULES:**
1. **INSERT ... SELECT**: Use `WHERE NOT EXISTS` for duplicate prevention
2. **INSERT ... VALUES**: Can use `ON CONFLICT` for upsert behavior
3. **Designers table**: Only [slug](file://c:UserspcDesktopprojectdirectorycrochet911srclib
ealtime-hooks.ts#L10-L10) is unique, NOT [name](file://c:UserspcDesktopprojectdirectorycrochet911srclib
ealtime-hooks.ts#L35-L35)
4. **Tags table**: Must include `color` field (required)
5. **Always use table aliases** in complex queries to avoid ambiguity

### Safety Checks

Before generating SQL, verify:
- All required fields have non-NULL values
- Slugs are unique and URL-safe
- Pattern source URL is valid
- Difficulty level matches enum values
- Yarn weight matches enum values (if provided)
- Category relationships are logical
- **Arrays use ARRAY['item1', 'item2'] syntax, not comma-separated strings**
- **JSON fields are properly quoted with single quotes**
- **Boolean values are lowercase without quotes**
- **Table aliases are used to avoid column ambiguity in complex queries**

### CRITICAL: Avoiding Column Ambiguity

**NEVER use ambiguous column references in WHERE clauses.** This error occurs:

❌ **WRONG - Causes "column reference is ambiguous" error:**
```sql
WHERE pattern_id = pattern_id AND tag_id = tag_id
```

✅ **CORRECT - Use table aliases or explicit table references:**
```sql
-- Option 1: Use table aliases
INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT p.id, t.id 
FROM patterns p, tags t 
WHERE p.slug = 'pattern-slug' 
AND t.slug IN ('tag1', 'tag2')
AND NOT EXISTS (
    SELECT 1 FROM pattern_tags pt 
    WHERE pt.pattern_id = p.id AND pt.tag_id = t.id
)
ON CONFLICT (pattern_id, tag_id) DO NOTHING;

-- Option 2: Use explicit table names
INSERT INTO pattern_tags (pattern_id, tag_id)
SELECT patterns.id, tags.id 
FROM patterns, tags 
WHERE patterns.slug = 'pattern-slug' 
AND tags.slug IN ('tag1', 'tag2')
AND NOT EXISTS (
    SELECT 1 FROM pattern_tags 
    WHERE pattern_tags.pattern_id = patterns.id 
    AND pattern_tags.tag_id = tags.id
)
ON CONFLICT (pattern_id, tag_id) DO NOTHING;
```

**Key Points:**
- Always use table aliases (p, t, pt) or full table names (patterns, tags, pattern_tags)
- Never compare a column name directly to itself (pattern_id = pattern_id)
- In subqueries, use different aliases or explicit table references
- This prevents PostgreSQL from confusing column names with variables

### Example Usage

**Input:**
```yaml
pattern:
  title: "Cute Bunny Amigurumi"
  description: "Make this adorable bunny with basic crochet skills..."
  difficulty: "beginner"
  pattern_source_url: "https://example.com/bunny-pattern"
  
category:
  name: "Rabbit Crochet Patterns"
  parent_id: "Animal Crochet Patterns"  # Reference to parent category name
  
designer:
  name: "Jane Smith"
```

**Expected Output:**
Complete SQL insert statements with all missing fields auto-generated according to the rules above.

---

## Prompt for AI

Please generate SQL insert statements for the Crochet911 database using the data I provide below. Follow the auto-generation rules for any missing fields, ensure all required fields are populated, and use the safe template approach to prevent NULL constraints and duplicates.

**My Data:**