import { s_suffix } from 'shared_clean/internal';
import { s_el_parser, s_infinite_scroll, s_location } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public adapt_everything_to_dark_theme = (): void =>
        err(() => {
            this.adapt_panel_to_dark_theme();
            this.adapt_all_separators_to_dark_theme();
        }, 'seg_1184');

    public adapt_panel_to_dark_theme = (): void =>
        err(() => {
            const panel_roots = sa<HTMLDivElement>(
                `.${
                    new s_suffix.Suffix(
                        s_location.Location.is_imgs_page ? 'img_action_bar' : 'side_panel',
                    ).result
                }`,
            );

            if (n(panel_roots)) {
                panel_roots.forEach((panel_root) => {
                    err(() => {
                        this.apply_css({ roots: [panel_root] });
                    }, 'seg_1198');
                });
            }
        }, 'seg_1183');

    public adapt_separator_to_dark_theme = ({ iframe_doc }: { iframe_doc: Document }): void =>
        err(() => {
            const separator_root = sb<HTMLDivElement>(
                iframe_doc,
                `.${new s_suffix.Suffix('separator').result}`,
            );

            this.apply_css({ roots: [separator_root] });
        }, 'seg_1182');

    private adapt_all_separators_to_dark_theme = (): void =>
        err(() => {
            const separator_roots: (HTMLDivElement | undefined)[] =
                s_infinite_scroll.Iframe.iframes.map((iframe): HTMLDivElement | undefined =>
                    err(() => {
                        if (n(iframe.contentDocument)) {
                            return sb(
                                iframe.contentDocument,
                                `.${new s_suffix.Suffix('separator').result}`,
                            );
                        }

                        return undefined;
                    }, 'seg_1180'),
                );

            this.apply_css({ roots: separator_roots });
        }, 'seg_1178');

    private apply_css = ({ roots }: { roots: (HTMLDivElement | undefined)[] }): void =>
        err(() => {
            if (!ext.ext_context_invalidated()) {
                const css_file_name = 'dark_ui';
                const css_class = `${css_file_name}_link`;
                const color_hsv = s_el_parser.ElParser.get_el_hsv_color({
                    el: document.body,
                    key: 'background-color',
                });

                roots.forEach((root: HTMLDivElement | undefined): void =>
                    err(() => {
                        if (n(root) && n(root.shadowRoot)) {
                            if (color_hsv.v <= 0.5) {
                                x.css(css_file_name, root.shadowRoot, css_class);
                            }
                        }
                    }, 'seg_1179'),
                );
            }
        }, 'seg_1181');
}

export const Theme = Class.get_instance();
