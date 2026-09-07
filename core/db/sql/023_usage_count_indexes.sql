-- Gateway plan checks count these tenant-owned resources. These indexes avoid scans
-- across other tenants as the shared database grows.
CREATE INDEX IF NOT EXISTS ix_funnels_user_id ON funnels(user_id);
CREATE INDEX IF NOT EXISTS ix_automations_user_id ON automations(user_id);
