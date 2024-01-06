import { d_color } from '@loftyshaky/shared/inputs';
import { s_suffix } from 'shared/internal';
import { s_el_parser, s_infinite_scroll } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public color_keywords = (): void =>
        err(() => {
            const cls = new s_suffix.Main('keyword').result;

            [...s_el_parser.Main.i().keyword_els].forEach((keyword_el: HTMLElement): void =>
                err(() => {
                    x.add_cls(keyword_el, cls);
                }, 'ges_1083'),
            );
            [document, ...s_infinite_scroll.Iframe.i().iframes].forEach(
                (base_el: Document | HTMLIFrameElement): void =>
                    err(() => {
                        const document_2: Document | undefined =
                            base_el.nodeType === 9
                                ? (base_el as Document)
                                : s_infinite_scroll.Iframe.i().get_content_document({
                                      base_el: base_el as HTMLIFrameElement,
                                  });

                        if (n(document_2)) {
                            x.dynamic_css(
                                document_2.head,
                                cls,
                                `.${cls} { color: ${d_color.Color.i().access_from_val({
                                    val: data.settings.keyword_color,
                                })}!important }`,
                            );
                        }
                    }, 'ges_1084'),
            );
        }, 'ges_1085');
}
