import { init_shared } from '@loftyshaky/shared/shared';
import 'shared/internal';
import { init, s_google_settings, s_location } from 'content_script/internal';

const init_all = () => {
    s_google_settings.GoogleSettings.get_settings();
    s_location.Location.set_current_location();

    init_shared();
    init();
};
document.addEventListener('DOMContentLoaded', () => {
    init_all();
});

if (document.readyState !== 'loading') {
    init_all();
}
