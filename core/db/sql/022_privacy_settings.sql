-- site_id contains the canonical websites.id UUID as text. The name is retained for
-- compatibility with the enterprise table created by earlier gateway releases.
CREATE TABLE IF NOT EXISTS website_privacy_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id VARCHAR(255) NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ip_anonymization VARCHAR(20) NOT NULL DEFAULT 'none',
    respect_dnt BOOLEAN NOT NULL DEFAULT false,
    consent_mode VARCHAR(20) NOT NULL DEFAULT 'cookieless',
    data_retention_days INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_ip_anonymization CHECK (ip_anonymization IN ('none', 'partial', 'full')),
    CONSTRAINT chk_consent_mode CHECK (consent_mode IN ('cookieless', 'strict')),
    CONSTRAINT chk_data_retention_days CHECK (data_retention_days IS NULL OR data_retention_days BETWEEN 1 AND 3650)
);
CREATE INDEX IF NOT EXISTS idx_privacy_settings_user ON website_privacy_settings(user_id);
