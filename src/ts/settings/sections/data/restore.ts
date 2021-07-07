import _ from 'lodash';
import { makeObservable, action, runInAction, toJS } from 'mobx';

import { t } from '@loftyshaky/shared';
import { i_data } from 'shared/internal';

export class Restore {
    private static i0: Restore;

    public static i(): Restore {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<Restore, 'override'>(this, {
            override: action,
        });
    }

    private restore = ({ settings }: { settings?: i_data.Settings } = {}): Promise<void> =>
        err_async(async () => {
            const { show_color_help } = data.settings;

            await this.set({ settings });

            await ext.send_msg_resp({
                msg: 'update_settings',
                settings,
            });

            this.override({ show_color_help });
        }, 'ges_1104');

    public restore_confirm = ({ settings }: { settings?: i_data.Settings } = {}): Promise<void> =>
        err_async(async () => {
            // eslint-disable-next-line no-alert
            const confirmed_restore: boolean = window.confirm(ext.msg('restore_defaults_confirm'));

            if (confirmed_restore) {
                await this.restore({ settings });

                ext.send_msg_to_all_tabs({ msg: 'rerun_actions' });
            }
        }, 'ges_1105');

    private set = ({ settings }: { settings?: i_data.Settings } = {}): Promise<void> =>
        err_async(async () => {
            let settings_final: i_data.Settings;

            if (n(settings)) {
                if (_.isEmpty(settings)) {
                    const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

                    settings_final = default_settings;
                } else {
                    settings_final = settings;
                }
            }

            runInAction((): void =>
                err(() => {
                    data.settings = settings_final;
                }, 'ges_1143'),
            );
        }, 'ges_1106');

    public set_from_storage = (): Promise<void> =>
        err_async(async () => {
            const settings = await ext.storage_get();

            if (_.isEmpty(settings)) {
                const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

                await ext.storage_set(default_settings);
            }

            if (!_.isEqual(toJS(data.settings), settings)) {
                this.set({ settings });
            }
        }, 'ges_1107');

    public restore_back_up = ({ data_obj }: { data_obj: t.AnyRecord }): Promise<void> =>
        err_async(async () => {
            const { show_color_help } = data.settings;

            const data_obj_clone: t.AnyRecord = _.cloneDeep(data_obj);

            await this.set({ settings: data_obj.settings });

            await ext.send_msg_resp({
                msg: 'update_settings',
                settings: data_obj_clone.settings,
            });

            this.override({ show_color_help });

            ext.send_msg_to_all_tabs({ msg: 'rerun_actions' });
        }, 'ges_1108');

    private override = ({ show_color_help }: { show_color_help: boolean }): void =>
        err(() => {
            if (!show_color_help) {
                data.settings.show_color_help = false;

                ext.send_msg_resp({
                    msg: 'update_settings',
                    settings: { show_color_help: false },
                });
            }
        }, 'ges_1109');
}
