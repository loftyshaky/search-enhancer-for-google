import { browser } from 'webextension-polyfill-ts';

import { t } from '@loftyshaky/shared';
import { run_actions_debounce } from 'content_script/internal';

browser.runtime.onMessage.addListener((msg: t.Msg): any => err(() => {
    const msg_str: string = msg.msg;

    if (msg_str === 'rerun_actions') {
        run_actions_debounce();
    }
},
1037));
