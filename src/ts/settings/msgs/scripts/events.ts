import type { t } from '@loftyshaky/shared/shared';
import type { i_error } from '@loftyshaky/shared/shared_clean';
import { d_data, d_sections } from 'settings/internal';
import { d_data as d_data_shared_clean } from 'shared_clean/internal';

we.runtime.onMessage.addListener(
    (msg: t.Any): t.Any =>
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
            } else if (msg_str === 'get_is_internal_storage_write_val') {
                return Promise.resolve(d_data_shared_clean.Manipulation.is_internal_storage_write);
            }

            return undefined;
        }, 'seg_1126'),
);
