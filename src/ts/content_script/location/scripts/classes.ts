import { s_location } from 'content_script/internal';

export class Classes {
    private static i0: Classes;

    public static i(): Classes {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public offset_left: string = '0';

    get videos_cls() {
        return s_location.Main.i().is_videos_page ? 'videos' : '';
    }

    get books_cls() {
        return s_location.Main.i().is_books_page ? 'books' : '';
    }

    get news_cls() {
        return s_location.Main.i().is_news_page ? 'news' : '';
    }

    get shopping_cls() {
        return s_location.Main.i().is_shopping_page ? 'shopping' : '';
    }
}
