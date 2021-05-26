import {
    makeObservable,
    observable,
    computed,
    action,
} from 'mobx';

import {
    s_location,
    s_el_parser,
} from 'content_script/internal';

export class Separator {
    private static i0: Separator;

    public static i(): Separator {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                offset_left: observable,
                none_cls: computed,
                set_offset_left: action,
            },
        );
    }

    public offset_left: number = 0;

    get none_cls() {
        return data.settings.show_page_separators
            ? ''
            : 'none';
    }

    get video_cls() {
        return s_location.Main.i().is_video_page
            ? 'video'
            : '';
    }

    get books_cls() {
        return s_location.Main.i().is_books_page
            ? 'books'
            : '';
    }

    get news_cls() {
        return s_location.Main.i().is_news_page
            ? 'news'
            : '';
    }

    get shopping_cls() {
        return s_location.Main.i().is_shopping_page
            ? 'shopping'
            : '';
    }

    public set_offset_left = (): void => err(() => {
        if (n(s_el_parser.Main.i().search_result_body)) {
            this.offset_left = (
                s_el_parser.Main.i().search_result_body!.getBoundingClientRect().left
            );
        }
    },
    1101);
}
