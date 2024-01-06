import { s_env } from 'shared/internal';
import { s_data, s_icons } from 'background/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        s_data.Main.i().init_defaults();
        await s_data.Main.i().set_from_storage({ transform: true });
        await s_icons.Main.i().generate_ip_to_country_arr();

        if (s_env.Main.i().is_dev()) {
            ext.inject_js_and_css_in_content_script(
                [
                    'env.js',
                    'content_script.js',
                    'chunks/src_ts_content_script_internal_ts.js',
                    'chunks/vendors-node_modules_lodash_lodash_js.js',
                    'chunks/vendors-node_modules_mobx-react_dist_mobxreact_esm_js.js',
                    'chunks/vendors-node_modules_mobx-utils_mobx-utils_module_js-node_modules_tinycolor2_esm_tinycolor_js.js',
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
