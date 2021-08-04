import listen from 'advanced-extension-reloader-watch-2/listen';
import { t, s_utils } from '@loftyshaky/shared';
import { s_data, s_icons, s_img_action } from 'background/internal';

listen();

we.runtime.onMessage.addListener(
    (msg: t.Msg): Promise<any> =>
        err_async(async () => {
            const msg_str: string = msg.msg;

            if (msg_str === 'update_settings') {
                await s_data.Main.i().update_settings({
                    settings: msg.settings,
                });

                if (n(msg.rerun_actions)) {
                    ext.send_msg_to_all_tabs({ msg: 'rerun_actions' });
                }
            } else if (msg_str === 'get_defaults') {
                return s_data.Main.i().defaults;
            } else if (msg_str === 'get_favicon_url') {
                return s_icons.Main.i().get_favicon_url({
                    url: msg.url as string,
                });
            } else if (msg_str === 'get_server_info') {
                return s_icons.Main.i().get_server_info({
                    url: msg.url as string,
                });
            } else if (msg_str === 'run_img_action') {
                return s_img_action.Main.i().run({
                    type: msg.type as string,
                    img_url: msg.img_url as string,
                });
            }

            s_utils.Main.i().reload_ext({ msg: msg_str });

            return true;
        }, 'ges_1017'),
);
