import type { t } from '@loftyshaky/shared/shared';
import type { i_error } from '@loftyshaky/shared/shared_clean';
import { d_data, d_sections } from 'settings/internal';

we.runtime.onMessage.addListener(
    (msg: t.Msg): t.Any =>
        err(() => {
            const msg_str: string = msg.msg;

            if (msg_str === 'load_settings') {
                return d_data.Settings.set_from_storage()
                    .then(() => {
                        if (n(msg.restore_back_up) && msg.restore_back_up) {
                            d_sections.Restore.restore_back_up_react();
                        }

                        return true;
                    })
                    .catch((error_obj: unknown) => {
                        if (n(error_obj)) {
                            show_err_ribbon(error_obj as i_error.ErrorObj, 'seg_1241');
                        }
                    });
            }

            return undefined;
        }, 'seg_1126'),
);
