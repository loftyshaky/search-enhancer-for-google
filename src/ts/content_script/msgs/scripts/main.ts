import { t } from '@loftyshaky/shared';
import { s_actions } from 'content_script/internal';

we.runtime.onMessage.addListener((msg: t.Msg): void =>
    err(() => {
        const msg_str: string = msg.msg;

        if (msg_str === 'rerun_actions') {
            s_actions.Main.i().run_reload_actions_2();
        }
    }, 'ges_1071'),
);
