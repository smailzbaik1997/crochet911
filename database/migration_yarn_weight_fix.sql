-- Migration to fix yarn_weight enum values
-- Run this to update your existing database with the correct enum values

-- First, check if the enum type exists and update it
DO $$
BEGIN
    -- Drop the existing enum type if it exists
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'yarn_weight') THEN
        -- Update patterns table to use varchar temporarily
        ALTER TABLE patterns 
        ALTER COLUMN yarn_weight TYPE VARCHAR(20);
        
        -- Drop the old enum
        DROP TYPE yarn_weight;
    END IF;
    
    -- Create the new enum with both formats for compatibility
    CREATE TYPE yarn_weight AS ENUM (
        'lace',
        'super_fine', 
        'fine', 
        'light', 
        'medium', 
        'bulky', 
        'super_bulky', 
        'jumbo',
        'lace (0)',
        'super fine (1)',
        'fine (2)',
        'light (3)',
        'medium (4)',
        'bulky (5)',
        'super bulky (6)',
        'jumbo (7)'
    );
    
    -- Convert the column back to enum type
    ALTER TABLE patterns 
    ALTER COLUMN yarn_weight TYPE yarn_weight 
    USING yarn_weight::yarn_weight;
    
    RAISE NOTICE 'Yarn weight enum successfully updated with descriptive values';
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error updating yarn_weight enum: %', SQLERRM;
END $$;