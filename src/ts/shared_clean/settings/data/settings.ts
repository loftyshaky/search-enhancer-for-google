import { t, d_settings } from '@loftyshaky/shared/shared_clean';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public allow_rerun_actions = true;

    public change = ({ key, val }: { key: string; val: t.AnyUndefined }): Promise<void> =>
        err_async(async () => {
            this.allow_rerun_actions = false;

            await d_settings.Settings.change({ key, val });
        }, 'seg_1165');
}

export const Settings = Class.get_instance();
