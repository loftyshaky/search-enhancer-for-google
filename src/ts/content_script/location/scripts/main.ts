export class Main {
    private static i0: Main;

    public static i(): Main {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private tbm: string | null = new URLSearchParams(window.location.href).get('tbm');
    private search_string_is_present: boolean = window.location.href.includes('search?');

    public is_all_page: boolean = this.search_string_is_present
                         && !n(this.tbm);

    public is_video_page: boolean = this.search_string_is_present
                           && this.tbm === 'vid';

    public is_books_page: boolean = this.search_string_is_present
                           && this.tbm === 'bks';

    public is_news_page: boolean= this.search_string_is_present
                          && this.tbm === 'nws';

    public is_shopping_page: boolean = this.search_string_is_present
                              && this.tbm === 'shop';

    public is_imgs_page: boolean = this.search_string_is_present
                          && this.tbm === 'isch';

    public is_search_results: boolean = this.is_all_page
                                        || this.is_video_page
                                        || this.is_books_page
                                        || this.is_news_page
                                        || this.is_shopping_page;

    public is_icons_search_results: boolean = this.is_all_page
                                              || this.is_video_page
                                              || this.is_news_page
                                              || this.is_shopping_page;

    public is_non_standard_search_results: boolean = this.is_news_page
                                                    || this.is_shopping_page;
}
