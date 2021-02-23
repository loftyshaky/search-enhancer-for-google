import { browser } from 'webextension-polyfill-ts';

import { t } from '@loftyshaky/shared';
import {
    s_data,
    s_icons,
} from 'background/internal';

browser.runtime.onMessage.addListener((msg: t.Msg): Promise<any> => err_async(async () => {
    const msg_str: string = msg.msg;

    if (msg_str === 'update_settings') {
        await s_data.Main.i().update_settings({
            settings: msg.settings,
        });

        if (n(msg.rerun_actions)) {
            ext.iterate_all_tabs({ msg: 'rerun_actions' });
        }
    } else if (msg_str === 'get_defaults') {
        return s_data.Main.i().defaults;
    } else if (msg_str === 'favicon_is_empty') {
        return s_icons.Main.i().favicon_is_empty({
            icon_url: msg.icon_url,
            provider: msg.provider,
        });
    } else if (msg_str === 'get_server_info') {
        return s_icons.Main.i().get_server_info({ url: msg.url });
    }

    return true;
},
1005));
