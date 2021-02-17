import _ from 'lodash';
import {
    runInAction,
    toJS,
} from 'mobx';

export class Data {
    private static i0: Data;

    public static i(): Data {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

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
}
