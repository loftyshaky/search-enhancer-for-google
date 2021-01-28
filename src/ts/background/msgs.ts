import { browser } from 'webextension-polyfill-ts';

import { t } from '@loftyshaky/shared';
import { db } from 'background/internal';

browser.runtime.onMessage.addListener((msg: t.Msg): Promise<any> => err_async(async () => {
    const msg_str: string = msg.msg;

    if (msg_str === 'get_settings') {
        const settings = await db.Main.i.db.settings.get(1);

        return settings;
    } if (msg_str === 'update_settings') {
        await db.Main.i.update_settings({
            settings: msg.settings,
        });
    } else if (msg_str === 'get_defaults') {
        return db.Main.i.defaults;
    }

    return true;
},
1005));
