import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          parent_id: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          parent_id?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          parent_id?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      designers: {
        Row: {
          id: string
          name: string
          slug: string
          bio: string | null
          website_url: string | null
          social_media: any | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          bio?: string | null
          website_url?: string | null
          social_media?: any | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          bio?: string | null
          website_url?: string | null
          social_media?: any | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      patterns: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          short_description: string | null
          designer_id: string | null
          category_id: string | null
          difficulty: 'beginner' | 'easy' | 'intermediate' | 'advanced' | 'expert'
          yarn_weight: 'lace' | 'super_fine' | 'fine' | 'light' | 'medium' | 'bulky' | 'super_bulky' | 'jumbo' | null
          yarn_details: string | null
          hook_size: string | null
          finished_size: string | null
          gauge_info: string | null
          time_to_complete: string | null
          pattern_source_url: string
          pattern_source_name: string | null
          is_free: boolean
          price: number | null
          featured_image_url: string | null
          image_alt_text: string | null
          gallery_images: any | null
          meta_title: string | null
          meta_description: string | null
          keywords: string[] | null
          view_count: number
          like_count: number
          is_published: boolean
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          short_description?: string | null
          designer_id?: string | null
          category_id?: string | null
          difficulty: 'beginner' | 'easy' | 'intermediate' | 'advanced' | 'expert'
          yarn_weight?: 'lace' | 'super_fine' | 'fine' | 'light' | 'medium' | 'bulky' | 'super_bulky' | 'jumbo' | null
          yarn_details?: string | null
          hook_size?: string | null
          finished_size?: string | null
          gauge_info?: string | null
          time_to_complete?: string | null
          pattern_source_url: string
          pattern_source_name?: string | null
          is_free?: boolean
          price?: number | null
          featured_image_url?: string | null
          image_alt_text?: string | null
          gallery_images?: any | null
          meta_title?: string | null
          meta_description?: string | null
          keywords?: string[] | null
          view_count?: number
          like_count?: number
          is_published?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          short_description?: string | null
          designer_id?: string | null
          category_id?: string | null
          difficulty?: 'beginner' | 'easy' | 'intermediate' | 'advanced' | 'expert'
          yarn_weight?: 'lace' | 'super_fine' | 'fine' | 'light' | 'medium' | 'bulky' | 'super_bulky' | 'jumbo' | null
          yarn_details?: string | null
          hook_size?: string | null
          finished_size?: string | null
          gauge_info?: string | null
          time_to_complete?: string | null
          pattern_source_url?: string
          pattern_source_name?: string | null
          is_free?: boolean
          price?: number | null
          featured_image_url?: string | null
          image_alt_text?: string | null
          gallery_images?: any | null
          meta_title?: string | null
          meta_description?: string | null
          keywords?: string[] | null
          view_count?: number
          like_count?: number
          is_published?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          color?: string | null
          created_at?: string
        }
      }
      pattern_tags: {
        Row: {
          pattern_id: string
          tag_id: string
        }
        Insert: {
          pattern_id: string
          tag_id: string
        }
        Update: {
          pattern_id?: string
          tag_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      yarn_weight: 'lace' | 'super_fine' | 'fine' | 'light' | 'medium' | 'bulky' | 'super_bulky' | 'jumbo'
      difficulty_level: 'beginner' | 'easy' | 'intermediate' | 'advanced' | 'expert'
    }
  }
}