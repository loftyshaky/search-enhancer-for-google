import '@loftyshaky/shared/ext';
import { init_shared, d_settings } from '@loftyshaky/shared/shared';
import { init } from 'settings/internal';

(async () => {
    await d_settings.Settings.set_from_storage();
    await show_unable_to_access_settings_error({});

    init_shared();
    await init();
})();
