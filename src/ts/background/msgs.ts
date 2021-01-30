import { browser } from 'webextension-polyfill-ts';

import { t } from '@loftyshaky/shared';
import { data } from 'background/internal';

browser.runtime.onMessage.addListener((msg: t.Msg): Promise<any> => err_async(async () => {
    const msg_str: string = msg.msg;

    if (msg_str === 'update_settings') {
        await data.Main.i().update_settings({
            settings: msg.settings,
        });
    } else if (msg_str === 'get_defaults') {
        return data.Main.i().defaults;
    }

    return true;
},
1005));
