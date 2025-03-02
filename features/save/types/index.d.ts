interface Save extends TableDefaults {
    type: 'Withdrawal' | 'Deposit';
    amount: number;
    currency?: string;
    date: Date;
    account: string;
}
type SaveCreate = Omit<Save, keyof TableDefaults>;
type SaveUpdate = SaveCreate & { id: string };

type AssetLiquidity = 'High' | 'Medium' | 'Low';
interface Asset extends TableDefaults {
    name: string;
    value: number;
    currency?: string;
    category: string;
    liquidity: AssetLiquidity;
    appreciation_rate: number;
}
type AssetCreate = Omit<Asset, keyof TableDefaults>;
type AssetUpdate = AssetCreate & { id: string };

interface DebtAccount extends TableDefaults {
    name: string;
    initial_balance: number;
    current_balance: number;
    currency?: string;
    creditor: string;
    interest_rate: number;
    interest_period: string;
}
type DebtAccountCreate = Omit<DebtAccount, keyof TableDefaults>;
type DebtAccountUpdate = DebtAccountCreate & { id: string };

interface SavingsAccount extends TableDefaults {
    name: string;
    balance: number;
    currency?: string;
    interest_rate?: number;
    interest_period?: string;
}
type SavingsAccountCreate = Omit<SavingsAccount, keyof TableDefaults>;
type SavingsAccountUpdate = SavingsAccountCreate & { id: string };
