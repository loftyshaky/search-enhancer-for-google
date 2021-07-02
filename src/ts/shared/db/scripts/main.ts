import Dexie from 'dexie';

import { i_db } from 'shared/internal';

export class Main extends Dexie {
    public ip_to_country: Dexie.Table<i_db.IpToCountry, number>;

    public constructor() {
        super('google-enhancement-suite');

        this.version(1).stores({
            ip_to_country: 'id++, ip_from',
        });

        this.ip_to_country = this.table('ip_to_country');
    }

    public init_db = (): void =>
        err(() => {
            this.open();
        }, 'ges_1121');
}

export const db = new Main();
