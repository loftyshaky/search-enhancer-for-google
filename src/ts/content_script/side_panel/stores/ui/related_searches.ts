import {
    makeObservable,
    observable,
    computed,
    action,
} from 'mobx';

import { CssVars } from '@loftyshaky/shared';
import {
    s_el_parser,
    u_side_panel,
    i_side_panel,
} from 'content_script/internal';

export class RelatedSearches {
    private static i0: RelatedSearches;

    public static i(): RelatedSearches {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                remembered_position: observable,
                position_remembered_cls: computed,
                remember_position: action,
                reset_position: action,
            },
        );
    }

    public remembered_position: i_side_panel.RememberedPosition = 'none';
    public last_related_searches_position: number =0;

    get position_remembered_cls() {
        return this.remembered_position === 'none'
            ? ''
            : 'position_remembered';
    }

    public remember_position = (): void => err(() => {
        const current_position: number = u_side_panel.Scroll.i().get_current_position();

        this.remembered_position = current_position;
        u_side_panel.Scroll.i().remembered_position = current_position;
    },
    1097);

    public reset_position = (): void => err(() => {
        this.remembered_position = 'none';
    },
    1098);

    public jump_to = (e: any): void => err(() => {
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

                this.last_related_searches_position = document.documentElement.scrollTop - parseInt(
                    CssVars.i().get({ name: 'offset_from_header' }),
                    10,
                );

                u_side_panel.Scroll.i().scroll_to_position({
                    position: this.last_related_searches_position,
                });
            }
        } else {
            u_side_panel.Scroll.i().scroll_to_position({ position: this.remembered_position });

            this.reset_position();
        }
    },
    1082);
}
