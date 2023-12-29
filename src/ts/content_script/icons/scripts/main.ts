import { s_suffix } from 'shared/internal';
import { s_el_parser, s_location } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public show_or_hide_native_favicons = (): void =>
        err(() => {
            const filename: string = 'favicon_hidden';
            const cls: string = new s_suffix.Main(filename).result;

            if (data.settings.favicons_is_visible) {
                x.remove(s(`.${cls}`));
            } else {
                x.css(filename, document.head, cls);
            }
        }, 'ges_1227');

    public prevent_titles_and_icons_from_wrapping = ({
        filtered_links,
    }: {
        filtered_links: HTMLLinkElement[];
    }): void => // put titles and icons on one line (without this title may wrap on second line if it's too long)
        err(() => {
            if (!s_location.Main.i().is_news_page) {
                filtered_links.forEach((el: HTMLLinkElement): void =>
                    err(() => {
                        x.add_cls(el, new s_suffix.Main('white_space').result);
                    }, 'ges_1186'),
                );
            }
        }, 'ges_1187');

    public insert_shadow_icon_duplicates = (): void =>
        err(() => {
            if (s_location.Main.i().is_all_page && n(s_el_parser.Main.i().favicon_el_cls)) {
                const favicon_shadow_clone_cls: string = new s_suffix.Main('favicon_shadow_clone')
                    .result;
                const favicon_shadow_els = sa<HTMLElement>(
                    `.${rs(s_el_parser.Main.i().favicon_el_cls)}:not(.${
                        new s_suffix.Main('favicon').result
                    }):not(.${
                        new s_suffix.Main('icons').result
                    }):not(.${favicon_shadow_clone_cls})`,
                );

                if (n(favicon_shadow_els)) {
                    favicon_shadow_els.forEach((favicon_shadow_el: HTMLElement): void =>
                        err(() => {
                            if (data.settings.server_locations_is_visible) {
                                const favicon_shadow_el_is_visible: boolean =
                                    favicon_shadow_el.offsetHeight > 0;

                                if (favicon_shadow_el_is_visible) {
                                    const favicon_shadow_el_clone = favicon_shadow_el.cloneNode();

                                    x.add_cls(
                                        favicon_shadow_el_clone as HTMLElement,
                                        favicon_shadow_clone_cls,
                                    );

                                    if (
                                        !x.matches(
                                            ru(favicon_shadow_el.nextElementSibling as HTMLElement),
                                            `.${favicon_shadow_clone_cls}`,
                                        )
                                    ) {
                                        x.after(
                                            favicon_shadow_el,
                                            favicon_shadow_el_clone as HTMLElement,
                                        );
                                    }
                                }
                            } else {
                                x.remove(sa(`.${favicon_shadow_clone_cls}`));
                            }
                        }, 'ges_1219'),
                    );
                }
            }
        }, 'ges_1218');

    public apply_or_remove_favicon_el_cls_to_icons_root = (): void =>
        err(() => {
            const icons_els = sa<HTMLElement>(`.${new s_suffix.Main('icons').result}`);

            if (n(icons_els)) {
                icons_els.forEach((icons_el: HTMLElement): void =>
                    err(() => {
                        x[data.settings.server_locations_is_visible ? 'add_cls' : 'remove_cls'](
                            icons_el,
                            rs(s_el_parser.Main.i().favicon_el_cls),
                        );
                    }, 'ges_1220'),
                );
            }
        }, 'ges_1221');
}
