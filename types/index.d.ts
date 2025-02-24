type AssetLiquidity = 'High' | 'Medium' | 'Low';

interface Asset {
    id: string;
    user_id: string;
    name: string;
    value: number;
    category: string;
    liquidity: AssetLiquidity;
    purchase_date?: string;
    appreciation_rate: number;
    created_at: string;
}
