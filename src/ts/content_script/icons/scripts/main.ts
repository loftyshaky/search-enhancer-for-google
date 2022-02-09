import { s_suffix } from 'shared/internal';
import { s_location } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

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
}
