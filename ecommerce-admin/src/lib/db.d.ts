import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Store = {
    id: Generated<number>;
    name: string;
    user_id: number;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type User = {
    id: Generated<number>;
    username: string;
    name: string;
    password: string;
    is_active: Generated<boolean>;
    is_superuser: Generated<boolean>;
    is_staff: Generated<boolean>;
    created_at: Generated<Timestamp>;
};
export type DB = {
    store: Store;
    user: User;
};
