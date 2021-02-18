import { CssVars } from '@loftyshaky/shared';
import { s_el_parser } from 'content_script/internal';

export class RelatedSearches {
    private static i0: RelatedSearches;

    public static i(): RelatedSearches {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public jump_to = (): void => err(() => {
        let el_to_jump_to: HTMLElement | undefined;

        if (n(s_el_parser.Main.i().related_searches_el)) {
            el_to_jump_to = s_el_parser.Main.i().related_searches_el;
        } else if (n(s_el_parser.Main.i().pagination_el)) {
            el_to_jump_to = s_el_parser.Main.i().pagination_el;
        }

        if (n(el_to_jump_to)) {
            el_to_jump_to.scrollIntoView();

            document.documentElement.scrollTop -= parseInt(
                CssVars.i().get({ name: 'offset_from_header' }),
                10,
            );
        }
    },
    1082);
}
