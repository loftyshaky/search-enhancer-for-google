import { t } from '@loftyshaky/shared';
import { s_data, s_icons, s_img_action } from 'background/internal';

we.runtime.onMessage.addListener(
    (msg: t.Msg): Promise<any> =>
        err_async(async () => {
            const msg_str: string = msg.msg;

            if (msg_str === 'update_settings') {
                await s_data.Main.i().update_settings_debounce(
                    msg.settings,
                    n(msg.rerun_actions) ? msg.rerun_actions : false,
                    n(msg.transform) ? msg.transform : false,
                );
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

            return true;
        }, 'ges_1017'),
);
