import { t, d_settings } from '@loftyshaky/shared/shared';

we.runtime.onMessage.addListener((msg: t.Msg): any =>
    err(() => {
        const msg_str: string = msg.msg;

        if (msg_str === 'rerun_actions') {
            d_settings.Settings.set_from_storage();
        }

        return undefined;
    }, 'seg_1126'),
);
