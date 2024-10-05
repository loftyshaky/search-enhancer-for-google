import { t } from '@loftyshaky/shared/shared_clean';
import { s_data, s_icons, s_img_action } from 'background/internal';

we.runtime.onMessage.addListener(
    (msg: t.Msg): Promise<any> =>
        err_async(async () => {
            const msg_str: string = msg.msg;

            if (msg_str === 'reload_ext') {
                we.runtime.reload();
            } else if (msg_str === 'update_settings_background') {
                if (n(msg.update_instantly) && msg.update_instantly) {
                    return s_data.Manipulation.update_settings({
                        settings: msg.settings,
                        replace: n(msg.replace) ? msg.replace : false,
                        transform: n(msg.transform) ? msg.transform : false,
                        transform_force: n(msg.transform_force) ? msg.transform_force : false,
                        load_settings: n(msg.load_settings) ? msg.load_settings : false,
                        restore_back_up: n(msg.restore_back_up) ? msg.restore_back_up : false,
                    })
                        .then(() => true)
                        .catch((error_obj: any) => show_err_ribbon(error_obj, 'seg_1244'));
                }

                s_data.Manipulation.update_settings_debounce(
                    msg.settings,
                    n(msg.replace) ? msg.replace : false,
                    n(msg.transform) ? msg.transform : false,
                    n(msg.transform_force) ? msg.transform_force : false,
                    n(msg.load_settings) ? msg.load_settings : false,
                    n(msg.load_settings_content_script) ? msg.load_settings_content_script : false,
                    n(msg.restore_back_up) ? msg.restore_back_up : false,
                );

                return Promise.resolve(true);
            } else if (msg_str === 'get_defaults') {
                return s_data.Settings.defaults;
            } else if (msg_str === 'get_favicon_url') {
                return s_icons.Icons.get_favicon_url({
                    url: msg.url as string,
                });
            } else if (msg_str === 'get_server_info') {
                return s_icons.Icons.get_server_info({
                    url: msg.url as string,
                });
            } else if (msg_str === 'run_img_action') {
                return s_img_action.ImgAction.run({
                    type: msg.type as string,
                    img_url: msg.img_url as string,
                });
            }

            return true;
        }, 'seg_1017'),
);
