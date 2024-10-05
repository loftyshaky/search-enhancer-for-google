import '@loftyshaky/shared/ext';
import { init_shared } from '@loftyshaky/shared/shared';
import { init } from 'settings/internal';

(async () => {
    await show_unable_to_access_settings_error({});

    init_shared();
    await init();
})();
