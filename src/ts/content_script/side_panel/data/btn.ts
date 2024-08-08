class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public msg = ({ name }: { name: string }): string =>
        err(() => ext.msg(`${name}_title`), 'seg_1104');
}

export const Btn = Class.get_instance();
