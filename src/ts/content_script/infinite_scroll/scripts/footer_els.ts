import { s_suffix } from 'shared_clean/internal';
import { s_el_parser, s_infinite_scroll } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private footer_appended: boolean = false;

    public append_to_footer = (): void =>
        err(() => {
            if (n(s_el_parser.ElParser.footer_el) && !this.footer_appended) {
                this.footer_appended = true;

                x.before(
                    s_el_parser.ElParser.footer_el,
                    s<HTMLElement>(`.${new s_suffix.Suffix('spinner').result}`),
                );
                x.before(
                    s_el_parser.ElParser.footer_el,
                    s<HTMLElement>(`.${new s_suffix.Suffix('load_end_msg').result}`),
                );

                s_infinite_scroll.Scroll.observe();

                x.bind(self, 'scroll', s_infinite_scroll.Scroll.observe);
            }
        }, 'seg_1064');
}

export const FooterEls = Class.get_instance();
