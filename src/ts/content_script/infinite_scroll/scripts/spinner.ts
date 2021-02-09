import { s_el_parser } from 'content_script/internal';

import { Suffix } from 'shared/internal';

export class Spinner {
    private static i0: Spinner;

    public static i(): Spinner {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public append_to_footer = (): void => err(() => {
        x.before(
            s_el_parser.Main.i().footer_el,
            s<HTMLElement>(`.${new Suffix('spinner').result}`),
        );
    },
    1073);
}
