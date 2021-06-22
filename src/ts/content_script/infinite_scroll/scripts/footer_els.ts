import { s_el_parser } from 'content_script/internal';

import { Suffix } from 'shared/internal';

export class FooterEls {
    private static i0: FooterEls;

    public static i(): FooterEls {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public append_to_footer = (): void => err(() => {
        x.before(
            s_el_parser.Main.i().footer_el,
            s<HTMLElement>(`.${new Suffix('spinner').result}`),
        );
        x.before(
            s_el_parser.Main.i().footer_el,
            s<HTMLElement>(`.${new Suffix('load_end_msg').result}`),
        );
    },
    'ges_1052');
}
