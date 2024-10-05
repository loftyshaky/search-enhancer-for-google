import { s_viewport } from '@loftyshaky/shared/shared';
import { d_infinite_scroll, s_el_parser, s_infinite_scroll } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public observe = (): void =>
        err(() => {
            if (
                data.settings.prefs.enable_infinite_scrolling &&
                (data.settings.prefs.infinite_scrolling_enabled ||
                    !data.settings.prefs.enable_btn_is_visible) &&
                document.body.scrollHeight - document.documentElement.scrollTop <=
                    s_viewport.Viewport.get_dim({ dim: 'height' }) + 600
            ) {
                /*
                if (s_location.Main.is_all_page) {
                    s_infinite_scroll.MoreResults.load_next_page();
                } else {
                    s_infinite_scroll.Iframe.insert();
                }
                */

                s_infinite_scroll.Iframe.insert();
            } else if (
                !n(s_el_parser.ElParser.next_page_href) &&
                s_infinite_scroll.MoreResults.check_if_last_page_or_loading()
            ) {
                d_infinite_scroll.LoadEndMsg.change_visibility({ is_visible: true });
            }
        }, 'seg_1080');
}

export const Scroll = Class.get_instance();
