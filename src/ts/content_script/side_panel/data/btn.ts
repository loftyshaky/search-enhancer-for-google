class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public msg = ({ name }: { name: string }): string =>
        err(() => ext.msg(`${name}_title`), 'seg_1104');
}

export const Btn = Class.get_instance();
