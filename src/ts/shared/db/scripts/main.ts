import Dexie from 'dexie';

export class Main {
    private static i0: Main;

    public static i(): Main {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public db: any = new Dexie('google-enhancement-suite');

    public init_db = (): void => err(() => {
        this.db.version(1).stores({
            ip_to_country: 'id++, ip_from',
        });

        this.db.open();
    },
    'ges_1121');
}
