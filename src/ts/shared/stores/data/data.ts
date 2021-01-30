import _ from 'lodash';
import { runInAction } from 'mobx';

export class Data {
    private static i0: Data;

    public static i(): Data {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private restore = (
        { settings }: { settings?: any } = {},
    ): Promise<void> => err_async(async () => {
        const { show_color_help } = data.settings;

        await this.set({ settings });

        await ext.send_msg_resp(
            {
                msg: 'update_settings',
                settings,
            },
        );

        this.override({ show_color_help });
    },
    1014);

    public restore_confirm = (
        { settings }: { settings?: any } = {},
    ): void => err(() => {
        // eslint-disable-next-line no-alert
        const confirmed_restore: boolean = window.confirm(ext.msg('restore_defaults_confirm'));

        if (confirmed_restore) {
            this.restore({ settings });
        }
    },
    1015);

    private set = (
        { settings }: { settings?: any } = {},
    ): Promise<void> => err_async(async () => {
        let settings_final: any;

        if (_.isEmpty(settings)) {
            const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

            settings_final = default_settings;
        } else {
            settings_final = settings;
        }

        runInAction((): void => {
            data.settings = settings_final;
        });
    },
    1007);

    public set_from_storage = (): Promise<void> => err_async(async () => {
        const settings = await ext.storage_get();

        if (_.isEmpty(settings)) {
            const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

            await ext.storage_set(default_settings);
        }

        this.set({ settings });
    },
    1008);

    public restore_back_up = (
        { data_obj }: { data_obj: any },
    ): Promise<void> => err_async(async () => {
        const { show_color_help } = data.settings;

        const data_obj_clone: any = _.cloneDeep(data_obj);

        await this.set({ settings: data_obj });

        await ext.send_msg_resp(
            {
                msg: 'update_settings',
                settings: data_obj_clone,
            },
        );

        this.override({ show_color_help });
    },
    1016);

    private override = ({ show_color_help }: { show_color_help: boolean }): void => err(() => {
        if (!show_color_help) {
            data.settings.show_color_help = false;

            ext.send_msg_resp(
                {
                    msg: 'update_settings',
                    settings: { show_color_help: false },
                },
            );
        }
    },
    1017);
}
