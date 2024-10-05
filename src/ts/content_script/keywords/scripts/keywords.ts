import { d_color } from '@loftyshaky/shared/inputs';
import { s_suffix } from 'shared_clean/internal';
import { s_el_parser, s_infinite_scroll } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public color_keywords = (): void =>
        err(() => {
            const cls = new s_suffix.Suffix('keyword').result;

            [...s_el_parser.ElParser.keyword_els].forEach((keyword_el: HTMLElement): void =>
                err(() => {
                    x.add_cls(keyword_el, cls);
                }, 'seg_1083'),
            );
            [document, ...s_infinite_scroll.Iframe.iframes].forEach(
                (base_el: Document | HTMLIFrameElement): void =>
                    err(() => {
                        const document_2: Document | undefined =
                            base_el.nodeType === 9
                                ? (base_el as Document)
                                : s_infinite_scroll.Iframe.get_content_document({
                                      base_el: base_el as HTMLIFrameElement,
                                  });

                        if (n(document_2)) {
                            x.dynamic_css(
                                document_2.head,
                                cls,
                                `.${cls} { color: ${d_color.Color.access_from_val({
                                    val: data.settings.prefs.keyword_color,
                                })}!important }`,
                            );
                        }
                    }, 'seg_1084'),
            );
        }, 'seg_1085');
}

export const Keywords = Class.get_instance();
