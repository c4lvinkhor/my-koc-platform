-- ============================================
-- PERAK KOC PLATFORM - SUPABASE SQL SCHEMA
-- Database: PostgreSQL via Supabase
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Preferred Language Enum
CREATE TYPE preferred_language AS ENUM ('EN', 'BM', 'ZH');

-- Merchants Table
CREATE TABLE merchants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    preferred_language preferred_language DEFAULT 'BM',
    business_type VARCHAR(100),
    daerah VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- KOCs Table
CREATE TABLE kocs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    handle VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    daerah VARCHAR(100),
    bio_en TEXT,
    bio_bm TEXT,
    bio_zh TEXT,
    followers INTEGER DEFAULT 0,
    following INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0,
    halal_certified BOOLEAN DEFAULT FALSE,
    preferred_language preferred_language DEFAULT 'BM',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- KOC Platforms (Many-to-Many)
CREATE TABLE koc_platforms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    koc_id UUID REFERENCES kocs(id) ON DELETE CASCADE,
    platform_id VARCHAR(50) NOT NULL,
    profile_url TEXT,
    followers_on_platform INTEGER DEFAULT 0,
    UNIQUE(koc_id, platform_id)
);

-- KOC Categories/Tags
CREATE TABLE koc_tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    koc_id UUID REFERENCES kocs(id) ON DELETE CASCADE,
    tag_name VARCHAR(100) NOT NULL
);

-- Proposals / Contact Messages
CREATE TABLE proposals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    koc_id UUID REFERENCES kocs(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE kocs ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Performance Indexes
CREATE INDEX idx_kocs_daerah ON kocs(daerah);
CREATE INDEX idx_kocs_engagement ON kocs(engagement_rate DESC);
CREATE INDEX idx_kocs_halal ON kocs(halal_certified);
CREATE INDEX idx_koc_platforms_koc ON koc_platforms(koc_id);
CREATE INDEX idx_koc_tags_koc ON koc_tags(koc_id);
CREATE INDEX idx_proposals_merchant ON proposals(merchant_id);
CREATE INDEX idx_proposals_koc ON proposals(koc_id);
