import { d_data } from '@loftyshaky/shared/shared';
import { s_ai_block } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public set = async (): Promise<void> =>
        err(async () => {
            if (!n(s_ai_block.ElParser.ai_overview_el)) {
                s_ai_block.ElParser.get_ai_overview_el();
            }

            if (!n(data.settings.prefs)) {
                await d_data.Settings.set_from_storage();
            }

            if (n(data.settings.prefs) && n(data.settings.prefs.ai_overview_is_visible)) {
                x[`${data.settings.prefs.ai_overview_is_visible ? 'remove' : 'add'}_cls`](
                    s_ai_block.ElParser.ai_overview_el,
                    'none',
                );
            }
        }, 'seg_1247');
}

export const Visibility = Class.get_instance();
