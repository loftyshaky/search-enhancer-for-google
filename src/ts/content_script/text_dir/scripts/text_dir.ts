class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public dir: string = 'ltr';

    public get = (): void =>
        err(() => {
            const { dir } = document;

            if (dir !== '') {
                this.dir = dir;
            }
        }, 'seg_1122');
}

export const TextDir = Class.get_instance();
