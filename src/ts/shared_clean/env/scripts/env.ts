class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public is_dev = (): boolean =>
        err(() => we.runtime.id === 'mfihhepjphokhfnlioficodoomlnhlbd', 'seg_1201');
}

export const Env = Class.get_instance();
