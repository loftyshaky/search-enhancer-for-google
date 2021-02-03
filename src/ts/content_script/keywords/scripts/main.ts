import { d_color } from '@loftyshaky/shared/inputs';
import { Suffix } from 'shared/internal';
import { s_el_parser } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public color_keywords = (): void => err(
        () => {
            const cls = new Suffix('keyword').result;

            [...s_el_parser.Main.i().keyword_els].forEach((keyword_el: HTMLElement): void => err(
                () => {
                    x.add_cls(
                        keyword_el,
                        cls,
                    );
                },
                1028,
            ));

            x.dynamic_css(
                document.head,
                cls,
                `.${cls} { color: ${d_color.Color.i().access_from_val(
                    { val: data.settings.keyword_color },
                )}!important }`,
            );
        },
        1027,
    );
}
