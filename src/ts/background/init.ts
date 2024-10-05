import { s_data as s_data_loftyshaky_shared_clean } from '@loftyshaky/shared/shared_clean';
import { s_env } from 'shared_clean/internal';
import { s_data, s_icons } from 'background/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        s_data.Manipulation.set_session_access_level();
        s_data.Settings.init_defaults();
        await s_data_loftyshaky_shared_clean.Cache.set_data();
        await s_data.Manipulation.on_init_set_from_storage();
        await s_icons.Icons.generate_ip_to_country_arr();

        if (s_env.Env.is_dev()) {
            ext.inject_js_and_css_in_content_script(
                [
                    'env.js',
                    'content_script.js',
                    'chunks/vendors-node_modules_lodash__baseKeys_js-node_modules_lodash__getTag_js-node_modules_lodash_i-8f8f3d.js',
                    'chunks/vendors-node_modules_lodash_clone_js-node_modules_lodash_debounce_js-node_modules_lodash_last-0fa715.js',
                    'chunks/src_ts_settings_internal_ts.js',
                    'chunks/src_ts_content_script_internal_ts.js',
                ],
                ['content_script_css.css'],
            );
        } else {
            ext.inject_js_and_css_in_content_script(
                ['env.js', 'content_script.js'],
                ['content_script_css.css'],
            );
        }
    }, 'seg_1016');
