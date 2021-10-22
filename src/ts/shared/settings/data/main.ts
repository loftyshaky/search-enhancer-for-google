import _ from 'lodash';
import { runInAction, toJS } from 'mobx';

import { t } from '@loftyshaky/shared';
import { i_data } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public allow_rerun_actions = true;

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

            runInAction(() =>
                err(() => {
                    data.settings = settings_final;
                }, 'ges_1163'),
            );
        }, 'ges_1164');

    public change = ({ key, val }: { key: string; val: t.AnyUndefined }): void =>
        err(() => {
            data.settings[key] = val;

            this.allow_rerun_actions = false;

            ext.send_msg_resp({
                msg: 'update_settings',
                settings: { [key]: val },
                rerun_actions: true,
            });
        }, 'ges_1165');

    public set_from_storage = (): Promise<void> =>
        err_async(async () => {
            let settings = await ext.storage_get();

            if (_.isEmpty(settings)) {
                const default_settings = await ext.send_msg_resp({ msg: 'get_defaults' });

                await ext.storage_set(default_settings);
            }

            const result = this.update_schema({ restoring_from_back_up: false, settings });

            if (result.updated_schema) {
                settings = result.settings;

                await ext.storage_set(settings);
            }

            if (!_.isEqual(toJS(data.settings), settings)) {
                this.set({ settings });
            }
        }, 'ges_1166');

    public update_schema = ({
        restoring_from_back_up,
        settings,
    }: {
        restoring_from_back_up: boolean;
        settings: t.AnyRecord;
    }): { updated_schema: boolean; settings: i_data.Settings } =>
        err(() => {
            let updated_schema: boolean = false;
            const keys_to_remove: string[] = [];

            if (n(settings.show_color_help)) {
                settings.color_help_is_visible = restoring_from_back_up
                    ? settings.color_help_is_visible
                    : settings.show_color_help;

                delete settings.show_color_help;

                keys_to_remove.push('show_color_help');

                updated_schema = true;
            }

            if (updated_schema) {
                we.storage.sync.remove(keys_to_remove);
                we.storage.local.remove(keys_to_remove);
            }

            return { updated_schema, settings: settings as i_data.Settings };
        }, 'ges_1185');
}
