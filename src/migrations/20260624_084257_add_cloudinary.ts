import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('super_admin', 'content_manager', 'volunteer_manager', 'partnership_manager', 'viewer');
  CREATE TYPE "public"."enum_users_status" AS ENUM('active', 'inactive');
  CREATE TYPE "public"."enum_programs_impact_metrics_icon" AS ENUM('Users', 'Target', 'Star', 'Heart', 'Globe', 'Zap', 'Shield');
  CREATE TYPE "public"."enum_programs_category" AS ENUM('education', 'leadership', 'entrepreneurship', 'wellness', 'community');
  CREATE TYPE "public"."enum_programs_program_status" AS ENUM('active', 'completed', 'planned');
  CREATE TYPE "public"."enum_programs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__programs_v_version_impact_metrics_icon" AS ENUM('Users', 'Target', 'Star', 'Heart', 'Globe', 'Zap', 'Shield');
  CREATE TYPE "public"."enum__programs_v_version_category" AS ENUM('education', 'leadership', 'entrepreneurship', 'wellness', 'community');
  CREATE TYPE "public"."enum__programs_v_version_program_status" AS ENUM('active', 'completed', 'planned');
  CREATE TYPE "public"."enum__programs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_category" AS ENUM('workshop', 'conference', 'community', 'campaign', 'webinar');
  CREATE TYPE "public"."enum_events_event_type" AS ENUM('physical', 'virtual', 'hybrid');
  CREATE TYPE "public"."enum_events_event_status" AS ENUM('upcoming', 'ongoing', 'completed');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_category" AS ENUM('workshop', 'conference', 'community', 'campaign', 'webinar');
  CREATE TYPE "public"."enum__events_v_version_event_type" AS ENUM('physical', 'virtual', 'hybrid');
  CREATE TYPE "public"."enum__events_v_version_event_status" AS ENUM('upcoming', 'ongoing', 'completed');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_event_registrations_status" AS ENUM('pending', 'approved', 'rejected', 'attended', 'no_show');
  CREATE TYPE "public"."enum_success_stories_story_status" AS ENUM('published', 'archived');
  CREATE TYPE "public"."enum_success_stories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__success_stories_v_version_story_status" AS ENUM('published', 'archived');
  CREATE TYPE "public"."enum__success_stories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_gallery_album_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum_gallery_category" AS ENUM('event', 'workshop', 'community', 'entrepreneur', 'program', 'celebration', 'impact');
  CREATE TYPE "public"."enum_gallery_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__gallery_v_version_album_status" AS ENUM('published', 'draft');
  CREATE TYPE "public"."enum__gallery_v_version_category" AS ENUM('event', 'workshop', 'community', 'entrepreneur', 'program', 'celebration', 'impact');
  CREATE TYPE "public"."enum__gallery_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_volunteers_areas_of_interest" AS ENUM('events', 'mentorship', 'fundraising', 'admin_support', 'other');
  CREATE TYPE "public"."enum_volunteers_status" AS ENUM('pending', 'contacted', 'active', 'inactive');
  CREATE TYPE "public"."enum_donation_leads_frequency" AS ENUM('one_time', 'monthly', 'yearly');
  CREATE TYPE "public"."enum_donation_leads_status" AS ENUM('new', 'contacted', 'closed');
  CREATE TYPE "public"."enum_contact_requests_inquiry_type" AS ENUM('general', 'volunteer', 'partnership', 'sponsorship', 'donation', 'media', 'program');
  CREATE TYPE "public"."enum_contact_requests_status" AS ENUM('new', 'under_review', 'responded', 'resolved', 'archived');
  CREATE TYPE "public"."enum_partners_type" AS ENUM('corporate', 'ngo', 'government', 'other');
  CREATE TYPE "public"."enum_partnership_requests_partnership_type" AS ENUM('corporate', 'ngo', 'institutional', 'csr', 'sponsorship', 'other');
  CREATE TYPE "public"."enum_partnership_requests_status" AS ENUM('new', 'review', 'contacted', 'established', 'declined');
  CREATE TYPE "public"."enum_newsletter_subscribers_status" AS ENUM('subscribed', 'unsubscribed');
  CREATE TYPE "public"."enum_homepage_hero_calls_to_action_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_about_us_core_values_icon" AS ENUM('Heart', 'Users', 'Target', 'Star', 'Shield', 'Zap', 'Globe');
  CREATE TYPE "public"."enum_impact_page_community_transformation_metrics_icon" AS ENUM('Users', 'Target', 'Star', 'Heart', 'Globe', 'Zap', 'Shield', 'TrendingUp');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"status" "enum_users_status" DEFAULT 'active',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"cloudinary_public_id" varchar,
  	"cloudinary_resource_type" varchar,
  	"cloudinary_format" varchar,
  	"cloudinary_secure_url" varchar,
  	"cloudinary_bytes" numeric,
  	"cloudinary_created_at" varchar,
  	"cloudinary_version" varchar,
  	"cloudinary_version_id" varchar,
  	"cloudinary_width" numeric,
  	"cloudinary_height" numeric,
  	"cloudinary_duration" numeric,
  	"cloudinary_pages" numeric,
  	"cloudinary_selected_page" numeric DEFAULT 1,
  	"cloudinary_thumbnail_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar
  );
  
  CREATE TABLE "programs_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"objective" varchar
  );
  
  CREATE TABLE "programs_key_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"activity" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "programs_impact_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric,
  	"suffix" varchar,
  	"icon" "enum_programs_impact_metrics_icon" DEFAULT 'Star'
  );
  
  CREATE TABLE "programs_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category" "enum_programs_category",
  	"program_status" "enum_programs_program_status" DEFAULT 'active',
  	"cover_image_id" integer,
  	"short_description" varchar,
  	"content" jsonb,
  	"beneficiary_outcomes" jsonb,
  	"donation_url" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_programs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "programs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"programs_id" integer
  );
  
  CREATE TABLE "_programs_v_version_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"objective" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_version_key_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"activity" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_version_impact_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric,
  	"suffix" varchar,
  	"icon" "enum__programs_v_version_impact_metrics_icon" DEFAULT 'Star',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__programs_v_version_category",
  	"version_program_status" "enum__programs_v_version_program_status" DEFAULT 'active',
  	"version_cover_image_id" integer,
  	"version_short_description" varchar,
  	"version_content" jsonb,
  	"version_beneficiary_outcomes" jsonb,
  	"version_donation_url" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__programs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_programs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"programs_id" integer
  );
  
  CREATE TABLE "events_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "events_speakers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"image_id" integer,
  	"bio" varchar
  );
  
  CREATE TABLE "events_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "events_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category" "enum_events_category",
  	"event_type" "enum_events_event_type" DEFAULT 'physical',
  	"event_status" "enum_events_event_status" DEFAULT 'upcoming',
  	"date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"location" varchar,
  	"virtual_link" varchar,
  	"cover_image_id" integer,
  	"short_description" varchar,
  	"description" jsonb,
  	"registration_settings_registration_open" boolean DEFAULT true,
  	"registration_settings_capacity" numeric,
  	"registration_settings_registration_link" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"programs_id" integer
  );
  
  CREATE TABLE "_events_v_version_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_version_speakers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"image_id" integer,
  	"bio" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__events_v_version_category",
  	"version_event_type" "enum__events_v_version_event_type" DEFAULT 'physical',
  	"version_event_status" "enum__events_v_version_event_status" DEFAULT 'upcoming',
  	"version_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_location" varchar,
  	"version_virtual_link" varchar,
  	"version_cover_image_id" integer,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_registration_settings_registration_open" boolean DEFAULT true,
  	"version_registration_settings_capacity" numeric,
  	"version_registration_settings_registration_link" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_events_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"programs_id" integer
  );
  
  CREATE TABLE "event_registrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"organization" varchar,
  	"special_requirements" varchar,
  	"status" "enum_event_registrations_status" DEFAULT 'pending',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "success_stories_impact_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "success_stories_media_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "success_stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"person_name" varchar,
  	"slug" varchar,
  	"story_status" "enum_success_stories_story_status" DEFAULT 'published',
  	"program_id" integer,
  	"image_id" integer,
  	"quote" varchar,
  	"story" jsonb,
  	"beneficiary_details_age" numeric,
  	"beneficiary_details_location" varchar,
  	"beneficiary_details_occupation" varchar,
  	"donation_url" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_success_stories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "success_stories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"success_stories_id" integer
  );
  
  CREATE TABLE "_success_stories_v_version_impact_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_success_stories_v_version_media_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_success_stories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_person_name" varchar,
  	"version_slug" varchar,
  	"version_story_status" "enum__success_stories_v_version_story_status" DEFAULT 'published',
  	"version_program_id" integer,
  	"version_image_id" integer,
  	"version_quote" varchar,
  	"version_story" jsonb,
  	"version_beneficiary_details_age" numeric,
  	"version_beneficiary_details_location" varchar,
  	"version_beneficiary_details_occupation" varchar,
  	"version_donation_url" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__success_stories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_success_stories_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"success_stories_id" integer
  );
  
  CREATE TABLE "gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"album_status" "enum_gallery_album_status" DEFAULT 'published',
  	"category" "enum_gallery_category",
  	"cover_image_id" integer,
  	"description" jsonb,
  	"associated_event_id" integer,
  	"associated_program_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_gallery_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_gallery_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_gallery_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_album_status" "enum__gallery_v_version_album_status" DEFAULT 'published',
  	"version_category" "enum__gallery_v_version_category",
  	"version_cover_image_id" integer,
  	"version_description" jsonb,
  	"version_associated_event_id" integer,
  	"version_associated_program_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__gallery_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "volunteers_areas_of_interest" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_volunteers_areas_of_interest",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "volunteers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"message" varchar,
  	"status" "enum_volunteers_status" DEFAULT 'pending',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "donation_leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"amount" numeric NOT NULL,
  	"frequency" "enum_donation_leads_frequency" NOT NULL,
  	"message" varchar,
  	"status" "enum_donation_leads_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"inquiry_type" "enum_contact_requests_inquiry_type" NOT NULL,
  	"subject" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"status" "enum_contact_requests_status" DEFAULT 'new',
  	"admin_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"website_url" varchar,
  	"type" "enum_partners_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partnership_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"organization_name" varchar NOT NULL,
  	"contact_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"partnership_type" "enum_partnership_requests_partnership_type" NOT NULL,
  	"proposal" varchar NOT NULL,
  	"status" "enum_partnership_requests_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "impact_statistics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" numeric NOT NULL,
  	"prefix" varchar,
  	"suffix" varchar,
  	"icon" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "newsletter_subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"status" "enum_newsletter_subscribers_status" DEFAULT 'subscribed',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"programs_id" integer,
  	"events_id" integer,
  	"event_registrations_id" integer,
  	"success_stories_id" integer,
  	"gallery_id" integer,
  	"volunteers_id" integer,
  	"donation_leads_id" integer,
  	"contact_requests_id" integer,
  	"partners_id" integer,
  	"partnership_requests_id" integer,
  	"impact_statistics_id" integer,
  	"newsletter_subscribers_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"organization_name" varchar DEFAULT 'Women''s Synergy' NOT NULL,
  	"logo_id" integer,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"address" varchar,
  	"working_hours" varchar,
  	"map_embed_url" varchar,
  	"donation_url" varchar,
  	"seo_default_title" varchar,
  	"seo_default_description" varchar,
  	"seo_default_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_hero_calls_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"variant" "enum_homepage_hero_calls_to_action_variant"
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar NOT NULL,
  	"hero_subheading" varchar,
  	"hero_background_image_id" integer,
  	"about_section_heading" varchar,
  	"about_section_content" jsonb,
  	"about_section_image_id" integer,
  	"about_section_cta_label" varchar,
  	"about_section_cta_url" varchar,
  	"programs_section_heading" varchar DEFAULT 'Our Featured Programs',
  	"programs_section_description" varchar,
  	"impact_section_heading" varchar DEFAULT 'Our Global Impact',
  	"impact_section_description" varchar,
  	"stories_section_heading" varchar DEFAULT 'Success Stories',
  	"stories_section_description" varchar,
  	"events_section_heading" varchar DEFAULT 'Upcoming Events',
  	"events_section_description" varchar,
  	"partners_section_heading" varchar DEFAULT 'Our Partners & Supporters',
  	"partners_section_description" varchar,
  	"donation_cta_heading" varchar DEFAULT 'Make a Difference Today',
  	"donation_cta_description" varchar,
  	"donation_cta_button_label" varchar DEFAULT 'Donate Now',
  	"donation_cta_button_url" varchar DEFAULT '/donate',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"programs_id" integer,
  	"success_stories_id" integer
  );
  
  CREATE TABLE "navigation_main_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"announcement_bar_enabled" boolean DEFAULT false,
  	"announcement_bar_text" varchar,
  	"announcement_bar_link" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_us_core_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_about_us_core_values_icon" DEFAULT 'Star'
  );
  
  CREATE TABLE "about_us_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "about_us" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar DEFAULT 'Our Story' NOT NULL,
  	"hero_subheading" varchar,
  	"hero_background_image_id" integer,
  	"organization_overview_heading" varchar DEFAULT 'Who We Are' NOT NULL,
  	"organization_overview_content" jsonb NOT NULL,
  	"organization_overview_image_id" integer,
  	"vision_mission_vision_statement" varchar NOT NULL,
  	"vision_mission_mission_statement" varchar NOT NULL,
  	"founder_message_heading" varchar DEFAULT 'Message from the Founder' NOT NULL,
  	"founder_message_founder_name" varchar NOT NULL,
  	"founder_message_founder_title" varchar,
  	"founder_message_image_id" integer,
  	"founder_message_quote" varchar,
  	"founder_message_content" jsonb NOT NULL,
  	"future_goals_heading" varchar DEFAULT 'Looking Forward' NOT NULL,
  	"future_goals_content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "impact_page_geographic_reach_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region_name" varchar NOT NULL,
  	"beneficiaries_count" numeric NOT NULL
  );
  
  CREATE TABLE "impact_page_community_transformation_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar,
  	"icon" "enum_impact_page_community_transformation_metrics_icon" DEFAULT 'TrendingUp'
  );
  
  CREATE TABLE "impact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar DEFAULT 'Our Global Impact' NOT NULL,
  	"hero_subheading" varchar DEFAULT 'Measurable outcomes of our mission to empower women.' NOT NULL,
  	"hero_cover_image_id" integer,
  	"annual_report_heading" varchar DEFAULT 'Latest Annual Report',
  	"annual_report_description" varchar,
  	"annual_report_report_file_id" integer,
  	"annual_report_download_label" varchar DEFAULT 'Download Report',
  	"geographic_reach_heading" varchar DEFAULT 'Where We Work',
  	"geographic_reach_description" varchar,
  	"geographic_reach_map_image_id" integer,
  	"community_transformation_heading" varchar DEFAULT 'Community Transformation',
  	"community_transformation_content" jsonb,
  	"featured_success_stories_heading" varchar DEFAULT 'Voices of Impact',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "impact_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"success_stories_id" integer
  );
  
  CREATE TABLE "get_involved_volunteer_section_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "get_involved_partner_section_partner_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "get_involved_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "get_involved" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Take Action. Drive Change.' NOT NULL,
  	"hero_subtitle" varchar DEFAULT 'Join Women''s Synergy in our mission to empower women and transform communities. Explore how you can contribute.' NOT NULL,
  	"hero_background_image_id" integer,
  	"volunteer_section_title" varchar DEFAULT 'Volunteer With Us' NOT NULL,
  	"volunteer_section_description" varchar DEFAULT 'Offer your time and expertise to support our grassroots initiatives, mentorship programs, and community events.' NOT NULL,
  	"partner_section_title" varchar DEFAULT 'Become a Partner' NOT NULL,
  	"partner_section_description" varchar DEFAULT 'Collaborate with us to amplify impact through strategic alignments, CSR programs, and shared resources.' NOT NULL,
  	"donate_section_title" varchar DEFAULT 'Fund the Future' NOT NULL,
  	"donate_section_description" varchar DEFAULT 'Your financial contributions directly support education, entrepreneurship, and essential resources for women.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Get in Touch' NOT NULL,
  	"hero_subtitle" varchar DEFAULT 'We''d love to hear from you. Whether you have a question about our programs, want to volunteer, or are interested in partnering with us, our team is ready to answer all your questions.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "privacy_policy_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL
  );
  
  CREATE TABLE "privacy_policy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Privacy Policy' NOT NULL,
  	"last_updated" timestamp(3) with time zone NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "terms_of_service_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL
  );
  
  CREATE TABLE "terms_of_service" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Terms of Service' NOT NULL,
  	"last_updated" timestamp(3) with time zone NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_objectives" ADD CONSTRAINT "programs_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_key_activities" ADD CONSTRAINT "programs_key_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_impact_metrics" ADD CONSTRAINT "programs_impact_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_gallery" ADD CONSTRAINT "programs_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_gallery" ADD CONSTRAINT "programs_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_version_objectives" ADD CONSTRAINT "_programs_v_version_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_version_key_activities" ADD CONSTRAINT "_programs_v_version_key_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_version_impact_metrics" ADD CONSTRAINT "_programs_v_version_impact_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_version_gallery" ADD CONSTRAINT "_programs_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_version_gallery" ADD CONSTRAINT "_programs_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_parent_id_programs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v" ADD CONSTRAINT "_programs_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programs_v_rels" ADD CONSTRAINT "_programs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_programs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programs_v_rels" ADD CONSTRAINT "_programs_v_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_schedule" ADD CONSTRAINT "events_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_speakers" ADD CONSTRAINT "events_speakers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_speakers" ADD CONSTRAINT "events_speakers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_faqs" ADD CONSTRAINT "events_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_gallery" ADD CONSTRAINT "events_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_gallery" ADD CONSTRAINT "events_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_schedule" ADD CONSTRAINT "_events_v_version_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_speakers" ADD CONSTRAINT "_events_v_version_speakers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_version_speakers" ADD CONSTRAINT "_events_v_version_speakers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_faqs" ADD CONSTRAINT "_events_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_gallery" ADD CONSTRAINT "_events_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_version_gallery" ADD CONSTRAINT "_events_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_impact_outcomes" ADD CONSTRAINT "success_stories_impact_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_media_gallery" ADD CONSTRAINT "success_stories_media_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_media_gallery" ADD CONSTRAINT "success_stories_media_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_rels" ADD CONSTRAINT "success_stories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_rels" ADD CONSTRAINT "success_stories_rels_success_stories_fk" FOREIGN KEY ("success_stories_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_impact_outcomes" ADD CONSTRAINT "_success_stories_v_version_impact_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_success_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_media_gallery" ADD CONSTRAINT "_success_stories_v_version_media_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v_version_media_gallery" ADD CONSTRAINT "_success_stories_v_version_media_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_success_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_parent_id_success_stories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."success_stories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_program_id_programs_id_fk" FOREIGN KEY ("version_program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v_rels" ADD CONSTRAINT "_success_stories_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_success_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_v_rels" ADD CONSTRAINT "_success_stories_v_rels_success_stories_fk" FOREIGN KEY ("success_stories_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_associated_event_id_events_id_fk" FOREIGN KEY ("associated_event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_associated_program_id_programs_id_fk" FOREIGN KEY ("associated_program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_v_version_images" ADD CONSTRAINT "_gallery_v_version_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_v_version_images" ADD CONSTRAINT "_gallery_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_gallery_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_v" ADD CONSTRAINT "_gallery_v_parent_id_gallery_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gallery"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_v" ADD CONSTRAINT "_gallery_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_v" ADD CONSTRAINT "_gallery_v_version_associated_event_id_events_id_fk" FOREIGN KEY ("version_associated_event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_v" ADD CONSTRAINT "_gallery_v_version_associated_program_id_programs_id_fk" FOREIGN KEY ("version_associated_program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_v" ADD CONSTRAINT "_gallery_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "volunteers_areas_of_interest" ADD CONSTRAINT "volunteers_areas_of_interest_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."volunteers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_registrations_fk" FOREIGN KEY ("event_registrations_id") REFERENCES "public"."event_registrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_success_stories_fk" FOREIGN KEY ("success_stories_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_volunteers_fk" FOREIGN KEY ("volunteers_id") REFERENCES "public"."volunteers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_donation_leads_fk" FOREIGN KEY ("donation_leads_id") REFERENCES "public"."donation_leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_requests_fk" FOREIGN KEY ("contact_requests_id") REFERENCES "public"."contact_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partnership_requests_fk" FOREIGN KEY ("partnership_requests_id") REFERENCES "public"."partnership_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_impact_statistics_fk" FOREIGN KEY ("impact_statistics_id") REFERENCES "public"."impact_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk" FOREIGN KEY ("newsletter_subscribers_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_default_image_id_media_id_fk" FOREIGN KEY ("seo_default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_hero_calls_to_action" ADD CONSTRAINT "homepage_hero_calls_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_about_section_image_id_media_id_fk" FOREIGN KEY ("about_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_success_stories_fk" FOREIGN KEY ("success_stories_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_main_menu" ADD CONSTRAINT "navigation_main_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_menu" ADD CONSTRAINT "navigation_footer_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_core_values" ADD CONSTRAINT "about_us_core_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us_timeline" ADD CONSTRAINT "about_us_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_us" ADD CONSTRAINT "about_us_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_us" ADD CONSTRAINT "about_us_organization_overview_image_id_media_id_fk" FOREIGN KEY ("organization_overview_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_us" ADD CONSTRAINT "about_us_founder_message_image_id_media_id_fk" FOREIGN KEY ("founder_message_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_page_geographic_reach_regions" ADD CONSTRAINT "impact_page_geographic_reach_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_page_community_transformation_metrics" ADD CONSTRAINT "impact_page_community_transformation_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_page" ADD CONSTRAINT "impact_page_hero_cover_image_id_media_id_fk" FOREIGN KEY ("hero_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_page" ADD CONSTRAINT "impact_page_annual_report_report_file_id_media_id_fk" FOREIGN KEY ("annual_report_report_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_page" ADD CONSTRAINT "impact_page_geographic_reach_map_image_id_media_id_fk" FOREIGN KEY ("geographic_reach_map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_page" ADD CONSTRAINT "impact_page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_page_rels" ADD CONSTRAINT "impact_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_page_rels" ADD CONSTRAINT "impact_page_rels_success_stories_fk" FOREIGN KEY ("success_stories_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "get_involved_volunteer_section_benefits" ADD CONSTRAINT "get_involved_volunteer_section_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."get_involved"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "get_involved_partner_section_partner_types" ADD CONSTRAINT "get_involved_partner_section_partner_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."get_involved"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "get_involved_faqs" ADD CONSTRAINT "get_involved_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."get_involved"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "get_involved" ADD CONSTRAINT "get_involved_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_faqs" ADD CONSTRAINT "contact_page_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_policy_sections" ADD CONSTRAINT "privacy_policy_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_of_service_sections" ADD CONSTRAINT "terms_of_service_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_of_service"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE INDEX "programs_objectives_order_idx" ON "programs_objectives" USING btree ("_order");
  CREATE INDEX "programs_objectives_parent_id_idx" ON "programs_objectives" USING btree ("_parent_id");
  CREATE INDEX "programs_key_activities_order_idx" ON "programs_key_activities" USING btree ("_order");
  CREATE INDEX "programs_key_activities_parent_id_idx" ON "programs_key_activities" USING btree ("_parent_id");
  CREATE INDEX "programs_impact_metrics_order_idx" ON "programs_impact_metrics" USING btree ("_order");
  CREATE INDEX "programs_impact_metrics_parent_id_idx" ON "programs_impact_metrics" USING btree ("_parent_id");
  CREATE INDEX "programs_gallery_order_idx" ON "programs_gallery" USING btree ("_order");
  CREATE INDEX "programs_gallery_parent_id_idx" ON "programs_gallery" USING btree ("_parent_id");
  CREATE INDEX "programs_gallery_image_idx" ON "programs_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "programs_slug_idx" ON "programs" USING btree ("slug");
  CREATE INDEX "programs_cover_image_idx" ON "programs" USING btree ("cover_image_id");
  CREATE INDEX "programs_meta_meta_image_idx" ON "programs" USING btree ("meta_image_id");
  CREATE INDEX "programs_updated_at_idx" ON "programs" USING btree ("updated_at");
  CREATE INDEX "programs_created_at_idx" ON "programs" USING btree ("created_at");
  CREATE INDEX "programs__status_idx" ON "programs" USING btree ("_status");
  CREATE INDEX "programs_rels_order_idx" ON "programs_rels" USING btree ("order");
  CREATE INDEX "programs_rels_parent_idx" ON "programs_rels" USING btree ("parent_id");
  CREATE INDEX "programs_rels_path_idx" ON "programs_rels" USING btree ("path");
  CREATE INDEX "programs_rels_programs_id_idx" ON "programs_rels" USING btree ("programs_id");
  CREATE INDEX "_programs_v_version_objectives_order_idx" ON "_programs_v_version_objectives" USING btree ("_order");
  CREATE INDEX "_programs_v_version_objectives_parent_id_idx" ON "_programs_v_version_objectives" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_version_key_activities_order_idx" ON "_programs_v_version_key_activities" USING btree ("_order");
  CREATE INDEX "_programs_v_version_key_activities_parent_id_idx" ON "_programs_v_version_key_activities" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_version_impact_metrics_order_idx" ON "_programs_v_version_impact_metrics" USING btree ("_order");
  CREATE INDEX "_programs_v_version_impact_metrics_parent_id_idx" ON "_programs_v_version_impact_metrics" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_version_gallery_order_idx" ON "_programs_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_programs_v_version_gallery_parent_id_idx" ON "_programs_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_programs_v_version_gallery_image_idx" ON "_programs_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_programs_v_parent_idx" ON "_programs_v" USING btree ("parent_id");
  CREATE INDEX "_programs_v_version_version_slug_idx" ON "_programs_v" USING btree ("version_slug");
  CREATE INDEX "_programs_v_version_version_cover_image_idx" ON "_programs_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_programs_v_version_meta_version_meta_image_idx" ON "_programs_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_programs_v_version_version_updated_at_idx" ON "_programs_v" USING btree ("version_updated_at");
  CREATE INDEX "_programs_v_version_version_created_at_idx" ON "_programs_v" USING btree ("version_created_at");
  CREATE INDEX "_programs_v_version_version__status_idx" ON "_programs_v" USING btree ("version__status");
  CREATE INDEX "_programs_v_created_at_idx" ON "_programs_v" USING btree ("created_at");
  CREATE INDEX "_programs_v_updated_at_idx" ON "_programs_v" USING btree ("updated_at");
  CREATE INDEX "_programs_v_latest_idx" ON "_programs_v" USING btree ("latest");
  CREATE INDEX "_programs_v_rels_order_idx" ON "_programs_v_rels" USING btree ("order");
  CREATE INDEX "_programs_v_rels_parent_idx" ON "_programs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_programs_v_rels_path_idx" ON "_programs_v_rels" USING btree ("path");
  CREATE INDEX "_programs_v_rels_programs_id_idx" ON "_programs_v_rels" USING btree ("programs_id");
  CREATE INDEX "events_schedule_order_idx" ON "events_schedule" USING btree ("_order");
  CREATE INDEX "events_schedule_parent_id_idx" ON "events_schedule" USING btree ("_parent_id");
  CREATE INDEX "events_speakers_order_idx" ON "events_speakers" USING btree ("_order");
  CREATE INDEX "events_speakers_parent_id_idx" ON "events_speakers" USING btree ("_parent_id");
  CREATE INDEX "events_speakers_image_idx" ON "events_speakers" USING btree ("image_id");
  CREATE INDEX "events_faqs_order_idx" ON "events_faqs" USING btree ("_order");
  CREATE INDEX "events_faqs_parent_id_idx" ON "events_faqs" USING btree ("_parent_id");
  CREATE INDEX "events_gallery_order_idx" ON "events_gallery" USING btree ("_order");
  CREATE INDEX "events_gallery_parent_id_idx" ON "events_gallery" USING btree ("_parent_id");
  CREATE INDEX "events_gallery_image_idx" ON "events_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_cover_image_idx" ON "events" USING btree ("cover_image_id");
  CREATE INDEX "events_meta_meta_image_idx" ON "events" USING btree ("meta_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_programs_id_idx" ON "events_rels" USING btree ("programs_id");
  CREATE INDEX "_events_v_version_schedule_order_idx" ON "_events_v_version_schedule" USING btree ("_order");
  CREATE INDEX "_events_v_version_schedule_parent_id_idx" ON "_events_v_version_schedule" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_speakers_order_idx" ON "_events_v_version_speakers" USING btree ("_order");
  CREATE INDEX "_events_v_version_speakers_parent_id_idx" ON "_events_v_version_speakers" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_speakers_image_idx" ON "_events_v_version_speakers" USING btree ("image_id");
  CREATE INDEX "_events_v_version_faqs_order_idx" ON "_events_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_events_v_version_faqs_parent_id_idx" ON "_events_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_gallery_order_idx" ON "_events_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_events_v_version_gallery_parent_id_idx" ON "_events_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_gallery_image_idx" ON "_events_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_cover_image_idx" ON "_events_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_events_v_version_meta_version_meta_image_idx" ON "_events_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "_events_v_rels_order_idx" ON "_events_v_rels" USING btree ("order");
  CREATE INDEX "_events_v_rels_parent_idx" ON "_events_v_rels" USING btree ("parent_id");
  CREATE INDEX "_events_v_rels_path_idx" ON "_events_v_rels" USING btree ("path");
  CREATE INDEX "_events_v_rels_programs_id_idx" ON "_events_v_rels" USING btree ("programs_id");
  CREATE INDEX "event_registrations_event_idx" ON "event_registrations" USING btree ("event_id");
  CREATE INDEX "event_registrations_updated_at_idx" ON "event_registrations" USING btree ("updated_at");
  CREATE INDEX "event_registrations_created_at_idx" ON "event_registrations" USING btree ("created_at");
  CREATE INDEX "success_stories_impact_outcomes_order_idx" ON "success_stories_impact_outcomes" USING btree ("_order");
  CREATE INDEX "success_stories_impact_outcomes_parent_id_idx" ON "success_stories_impact_outcomes" USING btree ("_parent_id");
  CREATE INDEX "success_stories_media_gallery_order_idx" ON "success_stories_media_gallery" USING btree ("_order");
  CREATE INDEX "success_stories_media_gallery_parent_id_idx" ON "success_stories_media_gallery" USING btree ("_parent_id");
  CREATE INDEX "success_stories_media_gallery_image_idx" ON "success_stories_media_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "success_stories_slug_idx" ON "success_stories" USING btree ("slug");
  CREATE INDEX "success_stories_program_idx" ON "success_stories" USING btree ("program_id");
  CREATE INDEX "success_stories_image_idx" ON "success_stories" USING btree ("image_id");
  CREATE INDEX "success_stories_meta_meta_image_idx" ON "success_stories" USING btree ("meta_image_id");
  CREATE INDEX "success_stories_updated_at_idx" ON "success_stories" USING btree ("updated_at");
  CREATE INDEX "success_stories_created_at_idx" ON "success_stories" USING btree ("created_at");
  CREATE INDEX "success_stories__status_idx" ON "success_stories" USING btree ("_status");
  CREATE INDEX "success_stories_rels_order_idx" ON "success_stories_rels" USING btree ("order");
  CREATE INDEX "success_stories_rels_parent_idx" ON "success_stories_rels" USING btree ("parent_id");
  CREATE INDEX "success_stories_rels_path_idx" ON "success_stories_rels" USING btree ("path");
  CREATE INDEX "success_stories_rels_success_stories_id_idx" ON "success_stories_rels" USING btree ("success_stories_id");
  CREATE INDEX "_success_stories_v_version_impact_outcomes_order_idx" ON "_success_stories_v_version_impact_outcomes" USING btree ("_order");
  CREATE INDEX "_success_stories_v_version_impact_outcomes_parent_id_idx" ON "_success_stories_v_version_impact_outcomes" USING btree ("_parent_id");
  CREATE INDEX "_success_stories_v_version_media_gallery_order_idx" ON "_success_stories_v_version_media_gallery" USING btree ("_order");
  CREATE INDEX "_success_stories_v_version_media_gallery_parent_id_idx" ON "_success_stories_v_version_media_gallery" USING btree ("_parent_id");
  CREATE INDEX "_success_stories_v_version_media_gallery_image_idx" ON "_success_stories_v_version_media_gallery" USING btree ("image_id");
  CREATE INDEX "_success_stories_v_parent_idx" ON "_success_stories_v" USING btree ("parent_id");
  CREATE INDEX "_success_stories_v_version_version_slug_idx" ON "_success_stories_v" USING btree ("version_slug");
  CREATE INDEX "_success_stories_v_version_version_program_idx" ON "_success_stories_v" USING btree ("version_program_id");
  CREATE INDEX "_success_stories_v_version_version_image_idx" ON "_success_stories_v" USING btree ("version_image_id");
  CREATE INDEX "_success_stories_v_version_meta_version_meta_image_idx" ON "_success_stories_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_success_stories_v_version_version_updated_at_idx" ON "_success_stories_v" USING btree ("version_updated_at");
  CREATE INDEX "_success_stories_v_version_version_created_at_idx" ON "_success_stories_v" USING btree ("version_created_at");
  CREATE INDEX "_success_stories_v_version_version__status_idx" ON "_success_stories_v" USING btree ("version__status");
  CREATE INDEX "_success_stories_v_created_at_idx" ON "_success_stories_v" USING btree ("created_at");
  CREATE INDEX "_success_stories_v_updated_at_idx" ON "_success_stories_v" USING btree ("updated_at");
  CREATE INDEX "_success_stories_v_latest_idx" ON "_success_stories_v" USING btree ("latest");
  CREATE INDEX "_success_stories_v_rels_order_idx" ON "_success_stories_v_rels" USING btree ("order");
  CREATE INDEX "_success_stories_v_rels_parent_idx" ON "_success_stories_v_rels" USING btree ("parent_id");
  CREATE INDEX "_success_stories_v_rels_path_idx" ON "_success_stories_v_rels" USING btree ("path");
  CREATE INDEX "_success_stories_v_rels_success_stories_id_idx" ON "_success_stories_v_rels" USING btree ("success_stories_id");
  CREATE INDEX "gallery_images_order_idx" ON "gallery_images" USING btree ("_order");
  CREATE INDEX "gallery_images_parent_id_idx" ON "gallery_images" USING btree ("_parent_id");
  CREATE INDEX "gallery_images_image_idx" ON "gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "gallery_slug_idx" ON "gallery" USING btree ("slug");
  CREATE INDEX "gallery_cover_image_idx" ON "gallery" USING btree ("cover_image_id");
  CREATE INDEX "gallery_associated_event_idx" ON "gallery" USING btree ("associated_event_id");
  CREATE INDEX "gallery_associated_program_idx" ON "gallery" USING btree ("associated_program_id");
  CREATE INDEX "gallery_meta_meta_image_idx" ON "gallery" USING btree ("meta_image_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE INDEX "gallery__status_idx" ON "gallery" USING btree ("_status");
  CREATE INDEX "_gallery_v_version_images_order_idx" ON "_gallery_v_version_images" USING btree ("_order");
  CREATE INDEX "_gallery_v_version_images_parent_id_idx" ON "_gallery_v_version_images" USING btree ("_parent_id");
  CREATE INDEX "_gallery_v_version_images_image_idx" ON "_gallery_v_version_images" USING btree ("image_id");
  CREATE INDEX "_gallery_v_parent_idx" ON "_gallery_v" USING btree ("parent_id");
  CREATE INDEX "_gallery_v_version_version_slug_idx" ON "_gallery_v" USING btree ("version_slug");
  CREATE INDEX "_gallery_v_version_version_cover_image_idx" ON "_gallery_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_gallery_v_version_version_associated_event_idx" ON "_gallery_v" USING btree ("version_associated_event_id");
  CREATE INDEX "_gallery_v_version_version_associated_program_idx" ON "_gallery_v" USING btree ("version_associated_program_id");
  CREATE INDEX "_gallery_v_version_meta_version_meta_image_idx" ON "_gallery_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_gallery_v_version_version_updated_at_idx" ON "_gallery_v" USING btree ("version_updated_at");
  CREATE INDEX "_gallery_v_version_version_created_at_idx" ON "_gallery_v" USING btree ("version_created_at");
  CREATE INDEX "_gallery_v_version_version__status_idx" ON "_gallery_v" USING btree ("version__status");
  CREATE INDEX "_gallery_v_created_at_idx" ON "_gallery_v" USING btree ("created_at");
  CREATE INDEX "_gallery_v_updated_at_idx" ON "_gallery_v" USING btree ("updated_at");
  CREATE INDEX "_gallery_v_latest_idx" ON "_gallery_v" USING btree ("latest");
  CREATE INDEX "volunteers_areas_of_interest_order_idx" ON "volunteers_areas_of_interest" USING btree ("order");
  CREATE INDEX "volunteers_areas_of_interest_parent_idx" ON "volunteers_areas_of_interest" USING btree ("parent_id");
  CREATE INDEX "volunteers_updated_at_idx" ON "volunteers" USING btree ("updated_at");
  CREATE INDEX "volunteers_created_at_idx" ON "volunteers" USING btree ("created_at");
  CREATE INDEX "donation_leads_updated_at_idx" ON "donation_leads" USING btree ("updated_at");
  CREATE INDEX "donation_leads_created_at_idx" ON "donation_leads" USING btree ("created_at");
  CREATE INDEX "contact_requests_updated_at_idx" ON "contact_requests" USING btree ("updated_at");
  CREATE INDEX "contact_requests_created_at_idx" ON "contact_requests" USING btree ("created_at");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "partnership_requests_updated_at_idx" ON "partnership_requests" USING btree ("updated_at");
  CREATE INDEX "partnership_requests_created_at_idx" ON "partnership_requests" USING btree ("created_at");
  CREATE INDEX "impact_statistics_updated_at_idx" ON "impact_statistics" USING btree ("updated_at");
  CREATE INDEX "impact_statistics_created_at_idx" ON "impact_statistics" USING btree ("created_at");
  CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");
  CREATE INDEX "newsletter_subscribers_updated_at_idx" ON "newsletter_subscribers" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscribers_created_at_idx" ON "newsletter_subscribers" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_programs_id_idx" ON "payload_locked_documents_rels" USING btree ("programs_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_event_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("event_registrations_id");
  CREATE INDEX "payload_locked_documents_rels_success_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("success_stories_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_volunteers_id_idx" ON "payload_locked_documents_rels" USING btree ("volunteers_id");
  CREATE INDEX "payload_locked_documents_rels_donation_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("donation_leads_id");
  CREATE INDEX "payload_locked_documents_rels_contact_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_requests_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_partnership_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("partnership_requests_id");
  CREATE INDEX "payload_locked_documents_rels_impact_statistics_id_idx" ON "payload_locked_documents_rels" USING btree ("impact_statistics_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_subscribers_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_seo_seo_default_image_idx" ON "site_settings" USING btree ("seo_default_image_id");
  CREATE INDEX "homepage_hero_calls_to_action_order_idx" ON "homepage_hero_calls_to_action" USING btree ("_order");
  CREATE INDEX "homepage_hero_calls_to_action_parent_id_idx" ON "homepage_hero_calls_to_action" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_hero_background_image_idx" ON "homepage" USING btree ("hero_background_image_id");
  CREATE INDEX "homepage_about_section_about_section_image_idx" ON "homepage" USING btree ("about_section_image_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_programs_id_idx" ON "homepage_rels" USING btree ("programs_id");
  CREATE INDEX "homepage_rels_success_stories_id_idx" ON "homepage_rels" USING btree ("success_stories_id");
  CREATE INDEX "navigation_main_menu_order_idx" ON "navigation_main_menu" USING btree ("_order");
  CREATE INDEX "navigation_main_menu_parent_id_idx" ON "navigation_main_menu" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_menu_order_idx" ON "navigation_footer_menu" USING btree ("_order");
  CREATE INDEX "navigation_footer_menu_parent_id_idx" ON "navigation_footer_menu" USING btree ("_parent_id");
  CREATE INDEX "about_us_core_values_order_idx" ON "about_us_core_values" USING btree ("_order");
  CREATE INDEX "about_us_core_values_parent_id_idx" ON "about_us_core_values" USING btree ("_parent_id");
  CREATE INDEX "about_us_timeline_order_idx" ON "about_us_timeline" USING btree ("_order");
  CREATE INDEX "about_us_timeline_parent_id_idx" ON "about_us_timeline" USING btree ("_parent_id");
  CREATE INDEX "about_us_hero_hero_background_image_idx" ON "about_us" USING btree ("hero_background_image_id");
  CREATE INDEX "about_us_organization_overview_organization_overview_ima_idx" ON "about_us" USING btree ("organization_overview_image_id");
  CREATE INDEX "about_us_founder_message_founder_message_image_idx" ON "about_us" USING btree ("founder_message_image_id");
  CREATE INDEX "impact_page_geographic_reach_regions_order_idx" ON "impact_page_geographic_reach_regions" USING btree ("_order");
  CREATE INDEX "impact_page_geographic_reach_regions_parent_id_idx" ON "impact_page_geographic_reach_regions" USING btree ("_parent_id");
  CREATE INDEX "impact_page_community_transformation_metrics_order_idx" ON "impact_page_community_transformation_metrics" USING btree ("_order");
  CREATE INDEX "impact_page_community_transformation_metrics_parent_id_idx" ON "impact_page_community_transformation_metrics" USING btree ("_parent_id");
  CREATE INDEX "impact_page_hero_hero_cover_image_idx" ON "impact_page" USING btree ("hero_cover_image_id");
  CREATE INDEX "impact_page_annual_report_annual_report_report_file_idx" ON "impact_page" USING btree ("annual_report_report_file_id");
  CREATE INDEX "impact_page_geographic_reach_geographic_reach_map_image_idx" ON "impact_page" USING btree ("geographic_reach_map_image_id");
  CREATE INDEX "impact_page_meta_meta_image_idx" ON "impact_page" USING btree ("meta_image_id");
  CREATE INDEX "impact_page_rels_order_idx" ON "impact_page_rels" USING btree ("order");
  CREATE INDEX "impact_page_rels_parent_idx" ON "impact_page_rels" USING btree ("parent_id");
  CREATE INDEX "impact_page_rels_path_idx" ON "impact_page_rels" USING btree ("path");
  CREATE INDEX "impact_page_rels_success_stories_id_idx" ON "impact_page_rels" USING btree ("success_stories_id");
  CREATE INDEX "get_involved_volunteer_section_benefits_order_idx" ON "get_involved_volunteer_section_benefits" USING btree ("_order");
  CREATE INDEX "get_involved_volunteer_section_benefits_parent_id_idx" ON "get_involved_volunteer_section_benefits" USING btree ("_parent_id");
  CREATE INDEX "get_involved_partner_section_partner_types_order_idx" ON "get_involved_partner_section_partner_types" USING btree ("_order");
  CREATE INDEX "get_involved_partner_section_partner_types_parent_id_idx" ON "get_involved_partner_section_partner_types" USING btree ("_parent_id");
  CREATE INDEX "get_involved_faqs_order_idx" ON "get_involved_faqs" USING btree ("_order");
  CREATE INDEX "get_involved_faqs_parent_id_idx" ON "get_involved_faqs" USING btree ("_parent_id");
  CREATE INDEX "get_involved_hero_hero_background_image_idx" ON "get_involved" USING btree ("hero_background_image_id");
  CREATE INDEX "contact_page_faqs_order_idx" ON "contact_page_faqs" USING btree ("_order");
  CREATE INDEX "contact_page_faqs_parent_id_idx" ON "contact_page_faqs" USING btree ("_parent_id");
  CREATE INDEX "privacy_policy_sections_order_idx" ON "privacy_policy_sections" USING btree ("_order");
  CREATE INDEX "privacy_policy_sections_parent_id_idx" ON "privacy_policy_sections" USING btree ("_parent_id");
  CREATE INDEX "terms_of_service_sections_order_idx" ON "terms_of_service_sections" USING btree ("_order");
  CREATE INDEX "terms_of_service_sections_parent_id_idx" ON "terms_of_service_sections" USING btree ("_parent_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "programs_objectives" CASCADE;
  DROP TABLE "programs_key_activities" CASCADE;
  DROP TABLE "programs_impact_metrics" CASCADE;
  DROP TABLE "programs_gallery" CASCADE;
  DROP TABLE "programs" CASCADE;
  DROP TABLE "programs_rels" CASCADE;
  DROP TABLE "_programs_v_version_objectives" CASCADE;
  DROP TABLE "_programs_v_version_key_activities" CASCADE;
  DROP TABLE "_programs_v_version_impact_metrics" CASCADE;
  DROP TABLE "_programs_v_version_gallery" CASCADE;
  DROP TABLE "_programs_v" CASCADE;
  DROP TABLE "_programs_v_rels" CASCADE;
  DROP TABLE "events_schedule" CASCADE;
  DROP TABLE "events_speakers" CASCADE;
  DROP TABLE "events_faqs" CASCADE;
  DROP TABLE "events_gallery" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "_events_v_version_schedule" CASCADE;
  DROP TABLE "_events_v_version_speakers" CASCADE;
  DROP TABLE "_events_v_version_faqs" CASCADE;
  DROP TABLE "_events_v_version_gallery" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_rels" CASCADE;
  DROP TABLE "event_registrations" CASCADE;
  DROP TABLE "success_stories_impact_outcomes" CASCADE;
  DROP TABLE "success_stories_media_gallery" CASCADE;
  DROP TABLE "success_stories" CASCADE;
  DROP TABLE "success_stories_rels" CASCADE;
  DROP TABLE "_success_stories_v_version_impact_outcomes" CASCADE;
  DROP TABLE "_success_stories_v_version_media_gallery" CASCADE;
  DROP TABLE "_success_stories_v" CASCADE;
  DROP TABLE "_success_stories_v_rels" CASCADE;
  DROP TABLE "gallery_images" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "_gallery_v_version_images" CASCADE;
  DROP TABLE "_gallery_v" CASCADE;
  DROP TABLE "volunteers_areas_of_interest" CASCADE;
  DROP TABLE "volunteers" CASCADE;
  DROP TABLE "donation_leads" CASCADE;
  DROP TABLE "contact_requests" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "partnership_requests" CASCADE;
  DROP TABLE "impact_statistics" CASCADE;
  DROP TABLE "newsletter_subscribers" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "homepage_hero_calls_to_action" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  DROP TABLE "navigation_main_menu" CASCADE;
  DROP TABLE "navigation_footer_menu" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "about_us_core_values" CASCADE;
  DROP TABLE "about_us_timeline" CASCADE;
  DROP TABLE "about_us" CASCADE;
  DROP TABLE "impact_page_geographic_reach_regions" CASCADE;
  DROP TABLE "impact_page_community_transformation_metrics" CASCADE;
  DROP TABLE "impact_page" CASCADE;
  DROP TABLE "impact_page_rels" CASCADE;
  DROP TABLE "get_involved_volunteer_section_benefits" CASCADE;
  DROP TABLE "get_involved_partner_section_partner_types" CASCADE;
  DROP TABLE "get_involved_faqs" CASCADE;
  DROP TABLE "get_involved" CASCADE;
  DROP TABLE "contact_page_faqs" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "privacy_policy_sections" CASCADE;
  DROP TABLE "privacy_policy" CASCADE;
  DROP TABLE "terms_of_service_sections" CASCADE;
  DROP TABLE "terms_of_service" CASCADE;
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_users_status";
  DROP TYPE "public"."enum_programs_impact_metrics_icon";
  DROP TYPE "public"."enum_programs_category";
  DROP TYPE "public"."enum_programs_program_status";
  DROP TYPE "public"."enum_programs_status";
  DROP TYPE "public"."enum__programs_v_version_impact_metrics_icon";
  DROP TYPE "public"."enum__programs_v_version_category";
  DROP TYPE "public"."enum__programs_v_version_program_status";
  DROP TYPE "public"."enum__programs_v_version_status";
  DROP TYPE "public"."enum_events_category";
  DROP TYPE "public"."enum_events_event_type";
  DROP TYPE "public"."enum_events_event_status";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_category";
  DROP TYPE "public"."enum__events_v_version_event_type";
  DROP TYPE "public"."enum__events_v_version_event_status";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum_event_registrations_status";
  DROP TYPE "public"."enum_success_stories_story_status";
  DROP TYPE "public"."enum_success_stories_status";
  DROP TYPE "public"."enum__success_stories_v_version_story_status";
  DROP TYPE "public"."enum__success_stories_v_version_status";
  DROP TYPE "public"."enum_gallery_album_status";
  DROP TYPE "public"."enum_gallery_category";
  DROP TYPE "public"."enum_gallery_status";
  DROP TYPE "public"."enum__gallery_v_version_album_status";
  DROP TYPE "public"."enum__gallery_v_version_category";
  DROP TYPE "public"."enum__gallery_v_version_status";
  DROP TYPE "public"."enum_volunteers_areas_of_interest";
  DROP TYPE "public"."enum_volunteers_status";
  DROP TYPE "public"."enum_donation_leads_frequency";
  DROP TYPE "public"."enum_donation_leads_status";
  DROP TYPE "public"."enum_contact_requests_inquiry_type";
  DROP TYPE "public"."enum_contact_requests_status";
  DROP TYPE "public"."enum_partners_type";
  DROP TYPE "public"."enum_partnership_requests_partnership_type";
  DROP TYPE "public"."enum_partnership_requests_status";
  DROP TYPE "public"."enum_newsletter_subscribers_status";
  DROP TYPE "public"."enum_homepage_hero_calls_to_action_variant";
  DROP TYPE "public"."enum_about_us_core_values_icon";
  DROP TYPE "public"."enum_impact_page_community_transformation_metrics_icon";`);
}
