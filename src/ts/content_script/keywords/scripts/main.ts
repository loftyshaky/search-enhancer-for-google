import { d_color } from '@loftyshaky/shared/inputs';
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
            [...s_el_parser.Main.i().keyword_els].forEach((keyword_el: HTMLElement): void => err(
                () => {
                    keyword_el.style.color = d_color.Color.i().access_from_val(
                        { val: data.settings.keyword_color },
                    );
                },
                1028,
            ));
        },
        1027,
    );
}
