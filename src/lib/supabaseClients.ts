import { createClient } from '@supabase/supabase-js';

// --- 项目 1 客户端 ---
const supabaseUrl1 = process.env.NEXT_PUBLIC_SUPABASE_URL_PROJECT_1!;
const supabaseAnonKey1 = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PROJECT_1!;

if (!supabaseUrl1 || !supabaseAnonKey1) {
  throw new Error('Missing Supabase URL or Anon Key for Project 1.');
}
export const supabaseProject1 = createClient(supabaseUrl1, supabaseAnonKey1);


// --- 项目 2 客户端 ---
const supabaseUrl2 = process.env.NEXT_PUBLIC_SUPABASE_URL_PROJECT_2!;
const supabaseAnonKey2 = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PROJECT_2!;

if (!supabaseUrl2 || !supabaseAnonKey2) {
  throw new Error('Missing Supabase URL or Anon Key for Project 2.');
}
export const supabaseProject2 = createClient(supabaseUrl2, supabaseAnonKey2);


// --- 项目 3 客户端 ---
const supabaseUrl3 = process.env.NEXT_PUBLIC_SUPABASE_URL_PROJECT_3!;
const supabaseAnonKey3 = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PROJECT_3!;

if (!supabaseUrl3 || !supabaseAnonKey3) {
  throw new Error('Missing Supabase URL or Anon Key for Project 3.');
}
export const supabaseProject3 = createClient(supabaseUrl3, supabaseAnonKey3);