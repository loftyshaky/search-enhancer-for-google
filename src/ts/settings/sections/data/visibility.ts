class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public hide_color_help = (): void =>
        err(() => {
            ext.send_msg_resp({
                msg: 'update_settings_background',
                settings: { color_help_is_visible: false },
            });
        }, 'seg_1146');
}

export const Visibility = Class.get_instance();
