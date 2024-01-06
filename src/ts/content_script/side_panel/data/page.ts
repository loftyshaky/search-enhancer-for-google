import { makeObservable, observable, action } from 'mobx';

import { s_viewport } from '@loftyshaky/shared';
import { s_el_parser, d_side_panel, s_infinite_scroll, s_location } from 'content_script/internal';

export class Page {
    private static i0: Page;

    public static i(): Page {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            current: observable,
            total: observable,
            set_current: action,
            set_total: action,
        });
    }

    private offset: number = 300;
    public current: number = 1;
    public total: number = 1;

    public set_current = (): Promise<void> =>
        err_async(async () => {
            let rendering_page_final: boolean = false;
            const page_els: HTMLElement[] = s_location.Main.i().is_all_page
                ? s_el_parser.Main.i().page_els
                : s_infinite_scroll.Iframe.i().iframes;
            const i_offset = s_location.Main.i().is_all_page ? 1 : 2;

            const current_page_i: number = page_els.findIndex(
                (el: HTMLElement, i: number): boolean =>
                    err(() => {
                        const page_height: number = s_viewport.Main.i().get_dim({
                            dim: 'height',
                        });
                        const rect = el.getBoundingClientRect();
                        const rendering_page: boolean = rect.top > 50000;

                        if (rendering_page) {
                            rendering_page_final = rendering_page;
                        }

                        return (
                            !rendering_page &&
                            ((rect.top <= page_height - this.offset &&
                                rect.bottom >= page_height - (this.offset + 100)) ||
                                (page_els.length - 1 === i && rect.bottom <= page_height))
                        );
                    }, 'seg_1106'),
            );

            if (!rendering_page_final) {
                this.current = current_page_i === -1 ? 1 : current_page_i + i_offset;
            }

            if (
                d_side_panel.RelatedSearches.i().last_related_searches_position !==
                d_side_panel.Scroll.i().get_current_position()
            ) {
                d_side_panel.RelatedSearches.i().reset_position();
            }
        }, 'seg_1107');

    public set_total = (): void =>
        err(() => {
            let page_count: number = 0;

            if (s_location.Main.i().is_all_page) {
                page_count =
                    s_el_parser.Main.i().page_els.length === 0
                        ? 1
                        : s_el_parser.Main.i().page_els.length;
            } else {
                page_count = s_infinite_scroll.Iframe.i().iframes.length;
            }

            this.total = page_count + (s_location.Main.i().is_all_page ? 0 : 1);
        }, 'seg_1108');
}
