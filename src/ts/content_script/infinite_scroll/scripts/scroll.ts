import { s_viewport } from '@loftyshaky/shared/shared';
import {
    d_infinite_scroll,
    s_el_parser,
    s_infinite_scroll,
    s_location,
} from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

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
                if (
                    n(s_el_parser.ElParser.more_results_btn) &&
                    s_location.Location.is_native_infinite_scroll_results
                ) {
                    s_infinite_scroll.MoreResults.load_next_page();
                } else {
                    s_infinite_scroll.Iframe.insert();
                }
            } else if (
                !s_location.Location.is_native_infinite_scroll_results &&
                !n(s_el_parser.ElParser.next_page_href) &&
                s_infinite_scroll.MoreResults.check_if_last_page_or_loading()
            ) {
                d_infinite_scroll.LoadEndMsg.change_visibility({ is_visible: true });
            }
        }, 'seg_1080');
}

export const Scroll = Class.get_instance();
