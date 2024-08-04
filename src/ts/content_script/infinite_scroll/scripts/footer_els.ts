import { s_suffix } from 'shared_clean/internal';
import { s_el_parser, s_infinite_scroll } from 'content_script/internal';

export class FooterEls {
    private static i0: FooterEls;

    public static i(): FooterEls {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private footer_appended: boolean = false;

    public append_to_footer = (): void =>
        err(() => {
            if (n(s_el_parser.Main.i().footer_el) && !this.footer_appended) {
                this.footer_appended = true;

                x.before(
                    s_el_parser.Main.i().footer_el,
                    s<HTMLElement>(`.${new s_suffix.Main('spinner').result}`),
                );
                x.before(
                    s_el_parser.Main.i().footer_el,
                    s<HTMLElement>(`.${new s_suffix.Main('load_end_msg').result}`),
                );

                s_infinite_scroll.Scroll.i().observe();

                x.bind(self, 'scroll', s_infinite_scroll.Scroll.i().observe);
            }
        }, 'seg_1064');
}
