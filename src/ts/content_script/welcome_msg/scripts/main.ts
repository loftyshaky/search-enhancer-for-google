export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public show = async (): Promise<void> =>
        err(async () => {
            if (!data.settings.welcome_msg_has_already_been_shown) {
                show_err_ribbon(undefined, undefined, {
                    persistent: true,
                    is_notification: true,
                    notification_msg_key: 'welcome_notification',
                });

                await ext.storage_set({ welcome_msg_has_already_been_shown: true });
                ext.send_msg({ msg: 'upadate_settings_var' });
            }
        }, 'ges_1172');
}
