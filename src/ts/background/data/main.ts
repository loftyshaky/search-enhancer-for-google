import _ from 'lodash';

import { d_color } from '@loftyshaky/shared/inputs';

export class Main {
    private static i0: Main;

    public static i(): Main {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public defaults: any = {
        show_favicons: true,
        show_server_locations: true,
        show_scroll_to_top_button: true,
        keyword_color: 2,
        show_color_help: true,
        colors: d_color.Color.i().default_colors,
    }

    public update_settings = (
        { settings }:
        { settings?: any } = {},
    ): Promise<void> => err_async(async () => {
        const settings_final: any = n(settings)
            ? settings
            : this.defaults;

        await ext.storage_set(settings_final);
    },
    1006);

    public set_from_storage = (): Promise<void> => err_async(async () => {
        const settings = await ext.storage_get();

        if (_.isEmpty(settings)) {
            this.update_settings();
        }
    },
    1010);
}
