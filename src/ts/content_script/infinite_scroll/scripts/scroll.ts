import { s_viewport } from '@loftyshaky/shared';
import { d_infinite_scroll, s_el_parser, s_infinite_scroll } from 'content_script/internal';

export class Scroll {
    private static i0: Scroll;

    public static i(): Scroll {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public observe = (): void =>
        err(() => {
            if (
                data.settings.enable_infinite_scrolling &&
                (data.settings.infinite_scrolling_enabled ||
                    !data.settings.enable_btn_is_visible) &&
                document.body.scrollHeight - document.documentElement.scrollTop <=
                    s_viewport.Main.i().get_dim({ dim: 'height' }) + 600
            ) {
                /*
                if (s_location.Main.i().is_all_page) {
                    s_infinite_scroll.MoreResults.i().load_next_page();
                } else {
                    s_infinite_scroll.Iframe.i().insert();
                }
                */

                s_infinite_scroll.Iframe.i().insert();
            } else if (
                !n(s_el_parser.Main.i().next_page_href) &&
                s_infinite_scroll.MoreResults.i().check_if_last_page_or_loading()
            ) {
                d_infinite_scroll.LoadEndMsg.i().change_visibility({ is_visible: true });
            }
        }, 'seg_1080');
}
