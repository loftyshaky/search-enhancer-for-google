import { init_shared } from '@loftyshaky/shared/shared';
import 'shared/internal';
import { init, s_location } from 'content_script/internal';

const init_all = () => {
    s_location.Location.set_current_location();

    init_shared();
    void init();
};
document.addEventListener('DOMContentLoaded', () => {
    init_all();
});

if (document.readyState !== 'loading') {
    init_all();
}
