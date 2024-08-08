import { InitAll } from 'shared/internal';
import { d_sections } from 'settings/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        await InitAll.init();

        d_sections.Options.init();
        d_sections.Sections.init();

        InitAll.render_settings();
    }, 'seg_1125');
