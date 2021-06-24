import { s_suffix } from 'shared/internal';
import { s_el_parser } from 'content_script/internal';

export class FooterEls {
    private static i0: FooterEls;

    public static i(): FooterEls {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public append_to_footer = (): void =>
        err(() => {
            x.before(
                s_el_parser.Main.i().footer_el,
                s<HTMLElement>(`.${new s_suffix.Main('spinner').result}`),
            );
            x.before(
                s_el_parser.Main.i().footer_el,
                s<HTMLElement>(`.${new s_suffix.Main('load_end_msg').result}`),
            );
        }, 'ges_1052');
}
