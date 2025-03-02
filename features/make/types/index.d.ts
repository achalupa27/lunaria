interface Make extends TableDefaults {
    date: Date;
    amount: number;
    currency?: string;
    source: string;
}

type MakeCreate = Omit<Make, keyof TableDefaults>;
type MakeUpdate = MakeCreate & { id: string };
