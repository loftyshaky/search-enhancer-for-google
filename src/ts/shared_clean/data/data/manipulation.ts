import { s_data } from '@loftyshaky/shared/shared_clean';
import { i_data } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public allow_load_settings: boolean = true;

    public send_msg_to_update_settings = ({
        settings,
        replace = false,
        update_instantly = false,
        transform = false,
        transform_force = false,
        load_settings = false,
        load_settings_content_script = false,
        restore_back_up = false,
    }: {
        settings?: i_data.Settings;
        replace?: boolean;
        update_instantly?: boolean;
        transform?: boolean;
        transform_force?: boolean;
        load_settings?: boolean;
        load_settings_content_script?: boolean;
        restore_back_up?: boolean;
    }): Promise<void> =>
        err_async(async () => {
            await s_data.Cache.set({
                key: 'updating_settings',
                val: true,
            });

            await ext.send_msg_resp({
                msg: 'update_settings_background',
                settings,
                replace,
                update_instantly,
                transform,
                transform_force,
                load_settings,
                load_settings_content_script,
                restore_back_up,
            });
        }, 'seg_1238');
}

export const Manipulation = Class.get_instance();
