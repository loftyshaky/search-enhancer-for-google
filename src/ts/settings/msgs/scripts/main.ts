import { t } from '@loftyshaky/shared';
import { d_settings } from 'shared/internal';

we.runtime.onMessage.addListener((msg: t.Msg): any =>
    err(() => {
        const msg_str: string = msg.msg;

        if (msg_str === 'rerun_actions') {
            d_settings.Main.i().set_from_storage();
        }

        return undefined;
    }, 'ges_1126'),
);
