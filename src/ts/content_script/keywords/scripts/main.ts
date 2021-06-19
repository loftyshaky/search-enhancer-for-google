import { d_color } from '@loftyshaky/shared/inputs';
import { Suffix } from 'shared/internal';
import {
    s_el_parser,
    s_infinite_scroll,
} from 'content_script/internal';

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
            [
                document,
                ...s_infinite_scroll.Iframe.i().iframes,
            ].forEach((base_el: Document | HTMLIFrameElement): void => err(() => {
                const head: HTMLHeadElement = base_el.nodeType === 9
                    ? (base_el as Document).head
                    : (base_el as HTMLIFrameElement).contentDocument!.head;

                if (n(head)) {
                    x.dynamic_css(
                        head,
                        cls,
                        `.${cls} { color: ${d_color.Color.i().access_from_val(
                            { val: data.settings.keyword_color },
                        )}!important }`,
                    );
                }
            },
            1069,
            { silent: true }));
        },
        1027,
        { silent: true },
    );
}
