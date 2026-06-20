class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public open_results_in_new_window: boolean = false;

    public get_settings = (): void =>
        err(() => {
            this.open_results_in_new_window = n(s('[name="newwindow"]')); // true, if "Results in a new window" option in Google search settings is on
        }, 'seg_1248');
}

export const GoogleSettings = Class.get_instance();
