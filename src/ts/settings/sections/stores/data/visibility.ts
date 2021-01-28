export class Visibility {
    private static i0: Visibility;

    public static get i() {
        this.i0 = new this();

        return this.i0;
    }

    public hide_color_help = (): void => err(() => {
        ext.send_msg_resp({
            msg: 'update_settings',
            settings: { show_color_help: false },
        });
    },
    1012);
}
