import _ from 'lodash';
import {
    makeObservable,
    action,
    runInAction,
    toJS,
} from 'mobx';

export class Restore {
    private static i0: Restore;

    public static i(): Restore {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                override: action,
            },
        );
    }

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
    ): Promise<void> => err(async () => {
        // eslint-disable-next-line no-alert
        const confirmed_restore: boolean = window.confirm(ext.msg('restore_defaults_confirm'));

        if (confirmed_restore) {
            await this.restore({ settings });

            ext.iterate_all_tabs({ msg: 'rerun_actions' });
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

        if (!_.isEqual(
            toJS(data.settings),
            settings,
        )) {
            this.set({ settings });
        }
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

        ext.iterate_all_tabs({ msg: 'rerun_actions' });
    },
    1016);

    public override = ({ show_color_help }: { show_color_help: boolean }): void => err(() => {
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
