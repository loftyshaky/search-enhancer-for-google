import { s_suffix } from 'shared/internal';
import { s_el_parser, s_infinite_scroll, s_location } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public adapt_everything_to_dark_theme = (): void =>
        err(() => {
            this.adapt_panel_to_dark_theme();
            this.adapt_all_separators_to_dark_theme();
        }, 'ges_1184');

    public adapt_panel_to_dark_theme = (): void =>
        err(() => {
            const panel_roots = sa<HTMLDivElement>(
                `.${
                    new s_suffix.Main(
                        s_location.Main.i().is_imgs_page ? 'img_action_bar' : 'side_panel',
                    ).result
                }`,
            );

            if (n(panel_roots)) {
                panel_roots.forEach((panel_root) => {
                    err(() => {
                        this.apply_css({ roots: [panel_root] });
                    }, 'ges_1198');
                });
            }
        }, 'ges_1183');

    public adapt_separator_to_dark_theme = ({ iframe_doc }: { iframe_doc: Document }): void =>
        err(() => {
            const separator_root = sb<HTMLDivElement>(
                iframe_doc,
                `.${new s_suffix.Main('separator').result}`,
            );

            this.apply_css({ roots: [separator_root] });
        }, 'ges_1182');

    private adapt_all_separators_to_dark_theme = (): void =>
        err(() => {
            const separator_roots: (HTMLDivElement | undefined)[] =
                s_infinite_scroll.Iframe.i().iframes.map((iframe): HTMLDivElement | undefined =>
                    err(() => {
                        if (n(iframe.contentDocument)) {
                            return sb(
                                iframe.contentDocument,
                                `.${new s_suffix.Main('separator').result}`,
                            );
                        }

                        return undefined;
                    }, 'ges_1180'),
                );

            this.apply_css({ roots: separator_roots });
        }, 'ges_1178');

    private apply_css = ({ roots }: { roots: (HTMLDivElement | undefined)[] }): void =>
        err(() => {
            const css_file_name = 'dark_ui';
            const css_class = `${css_file_name}_link`;
            const color_hsv = s_el_parser.Main.i().get_el_hsv_color({
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
                }, 'ges_1179'),
            );
        }, 'ges_1181');
}
