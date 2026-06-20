import { s_data as s_data_loftyshaky_shared_clean } from '@loftyshaky/shared/shared_clean';
import { s_data, s_icons } from 'background/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        s_data.Manipulation.set_session_access_level();
        s_data.Settings.init_defaults();
        await s_data_loftyshaky_shared_clean.Cache.set_data();
        await s_data.Manipulation.on_init_set_from_storage();
        await s_icons.Icons.generate_ip_to_country_arr();
        await ext.inject_js_and_css_in_content_script(
            ['content_script.js'],
            ['content_script_css.css'],
        );
    }, 'seg_1016');
