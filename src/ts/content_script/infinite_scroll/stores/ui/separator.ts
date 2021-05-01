import {
    makeObservable,
    observable,
    computed,
} from 'mobx';

import { s_location } from 'content_script/internal';

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

    public set_offset_left = ({ title_el }: { title_el: HTMLElement }): void => err(() => {
        if (this.offset_left === 0) {
            this.offset_left = title_el.getBoundingClientRect().left;
        }
    },
    1101);
}
