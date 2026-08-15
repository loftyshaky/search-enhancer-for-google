import { d_data } from '@loftyshaky/shared/shared';
import { s_el_parser } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public set = async (): Promise<void> =>
        err(async () => {
            s_el_parser.ElParser.get_ai_overview_el();

            if (!n(data.settings.prefs)) {
                await d_data.Settings.set_from_storage();
            }

            if (
                n(s_el_parser.ElParser.ai_overview_els) &&
                n(data.settings.prefs) &&
                n(data.settings.prefs.ai_overview_is_visible)
            ) {
                s_el_parser.ElParser.ai_overview_els.forEach((el: HTMLElement): void =>
                    err(() => {
                        x[`${data.settings.prefs.ai_overview_is_visible ? 'remove' : 'add'}_cls`](
                            el,
                            'none',
                        );
                    }, 'seg_1257'),
                );
            }
        }, 'seg_1247');
}

export const Visibility = Class.get_instance();
