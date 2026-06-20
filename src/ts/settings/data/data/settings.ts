import { d_data } from '@loftyshaky/shared/shared';
import { s_css_vars } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public set_from_storage = (): Promise<void> =>
        err_async(async () => {
            await d_data.Settings.set_from_storage();

            s_css_vars.CssVars.set();
        }, 'seg_1255');
}

export const Settings = Class.get_instance();
