interface Make extends BaseModel {
    date: Date;
    amount: number;
    currency?: string;
    source: string;
}

type MakeCreate = Omit<Make, keyof BaseModel>;
type MakeUpdate = MakeCreate & { id: string };
