interface BaseModel {
    id: string;
    user_id: string;
    created_at?: string;
    updated_at?: string;
}

type FeatureRowType = {
    feature: string;
    includedFree: string | boolean;
    includedProfessional: string | boolean;
    includedPremium: string | boolean;
};
