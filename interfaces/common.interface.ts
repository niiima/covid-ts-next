// Some type helpers
export interface ObjectType {
    [key: string]: string | null;
}

export type OrNull<T> = T | null;

export type OneOrMany<T> = T | T[];

export type OneOrManyOrNull<T> = OrNull<OneOrMany<T>>;
