export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public dir: string = 'ltr'

    public get = (): void => err(() => {
        const { dir } = document;

        if (dir !== '') {
            this.dir = dir;
        }
    },
    'ges_1102');
}
