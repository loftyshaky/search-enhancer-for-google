import { makeObservable, observable, computed, action } from 'mobx';

import { s_css_vars } from '@loftyshaky/shared';
import { d_side_panel, s_el_parser, i_side_panel } from 'content_script/internal';

export class RelatedSearches {
    private static i0: RelatedSearches;

    public static i(): RelatedSearches {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            remembered_position: observable,
            position_remembered_cls: computed,
            remember_position: action,
            reset_position: action,
        });
    }

    public remembered_position: i_side_panel.RememberedPosition = 'none';
    public last_related_searches_position: number = 0;

    get position_remembered_cls() {
        return this.remembered_position === 'none' ? '' : 'position_remembered';
    }

    public remember_position = (): void =>
        err(() => {
            const current_position: number = d_side_panel.Scroll.i().get_current_position();

            this.remembered_position = current_position;
            d_side_panel.Scroll.i().remembered_position = current_position;
        }, 'ges_1091');

    public reset_position = (): void =>
        err(() => {
            this.remembered_position = 'none';
        }, 'ges_1092');

    public jump_to = (e: any): void =>
        err(() => {
            if (n(e)) {
                e.preventDefault();
            }

            if (this.remembered_position === 'none') {
                let el_to_jump_to: HTMLElement | undefined;

                if (n(s_el_parser.Main.i().related_searches_el)) {
                    el_to_jump_to = s_el_parser.Main.i().related_searches_el;
                } else if (n(s_el_parser.Main.i().pagination_el)) {
                    el_to_jump_to = s_el_parser.Main.i().pagination_el;
                }

                if (n(el_to_jump_to)) {
                    this.remember_position();

                    el_to_jump_to.scrollIntoView();

                    this.last_related_searches_position =
                        document.documentElement.scrollTop -
                        parseInt(s_css_vars.Main.i().get({ name: 'offset_from_header' }), 10);

                    d_side_panel.Scroll.i().scroll_to_position({
                        position: this.last_related_searches_position,
                    });
                }
            } else {
                d_side_panel.Scroll.i().scroll_to_position({ position: this.remembered_position });

                this.reset_position();
            }
        }, 'ges_1093');
}
