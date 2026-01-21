-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Claims Table
create table claims (
  id uuid default uuid_generate_v4() primary key,
  order_id text not null,
  email text not null,
  status text not null default 'OPEN', -- OPEN, SUBMITTED, IN_REVIEW, APPROVED, REJECTED, COMPLETED
  type text not null, -- RETURN, WARRANTY
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Claim Items Table
create table claim_items (
  id uuid default uuid_generate_v4() primary key,
  claim_id uuid references claims(id) on delete cascade,
  sku text not null,
  quantity integer not null,
  reason_code text not null,
  condition text,
  metadata jsonb default '{}'::jsonb, -- photos, description
  created_at timestamp with time zone default now()
);

-- Claim History Table
create table claim_history (
  id uuid default uuid_generate_v4() primary key,
  claim_id uuid references claims(id) on delete cascade,
  status_from text,
  status_to text,
  actor text, -- who made the change
  created_at timestamp with time zone default now()
);

-- Parts Catalog (for Warranty)
create table parts_catalog (
  id uuid default uuid_generate_v4() primary key,
  parent_sku text not null,
  part_sku text not null,
  part_name text not null,
  image_url text,
  created_at timestamp with time zone default now()
);
