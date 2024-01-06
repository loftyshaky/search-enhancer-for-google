export class Btn {
    private static i0: Btn;

    public static i(): Btn {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public msg = ({ name }: { name: string }): string =>
        err(() => ext.msg(`${name}_title`), 'ges_1104');
}
