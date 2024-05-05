import { s_suffix } from 'shared/internal';
import { s_location } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
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
        }, 'seg_1227');

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
                    }, 'seg_1186'),
                );
            }
        }, 'seg_1187');
}
