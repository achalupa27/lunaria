interface Save extends BaseModel {
    type: 'Withdrawal' | 'Deposit';
    amount: number;
    currency?: string;
    date: Date;
    account: string;
}
type SaveCreate = Omit<Save, keyof BaseModel>;
type SaveUpdate = SaveCreate & { id: string };

type AssetLiquidity = 'High' | 'Medium' | 'Low';
interface Asset extends BaseModel {
    name: string;
    value: number;
    currency?: string;
    category?: string;
    liquidity?: AssetLiquidity;
    appreciation_rate?: number;
}
type AssetCreate = Omit<Asset, keyof BaseModel>;
type AssetUpdate = AssetCreate & { id: string };

interface DebtAccount extends BaseModel {
    name: string;
    initial_balance?: number;
    current_balance: number;
    currency?: string;
    creditor: string;
    interest_rate: number;
    interest_period: string;
}
type DebtAccountCreate = Omit<DebtAccount, keyof BaseModel>;
type DebtAccountUpdate = DebtAccountCreate & { id: string };

interface SavingsAccount extends BaseModel {
    name: string;
    balance: number;
    currency?: string;
    interest_rate?: number;
    interest_period?: string;
}
type SavingsAccountCreate = Omit<SavingsAccount, keyof BaseModel>;
type SavingsAccountUpdate = SavingsAccountCreate & { id: string };
