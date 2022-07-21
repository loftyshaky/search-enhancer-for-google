export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public current_location: string = '';
    public imgs_param_val = 'isch';
    private tbm: string | null = new URLSearchParams(globalThis.location.href).get('tbm');
    private search_string_is_present: boolean = globalThis.location.href.includes('search?');

    public is_content_script_execution_page: boolean =
        /^https:\/\/www\.google\.[a-z]+\/search\?.+$/.test(globalThis.location.href);

    public is_all_page: boolean =
        this.search_string_is_present && (!n(this.tbm) || this.tbm === '');

    public is_videos_page: boolean = this.search_string_is_present && this.tbm === 'vid';

    public is_books_page: boolean = this.search_string_is_present && this.tbm === 'bks';

    public is_news_page: boolean = this.search_string_is_present && this.tbm === 'nws';

    public is_shopping_page: boolean = this.search_string_is_present && this.tbm === 'shop';

    public is_imgs_page: boolean =
        this.search_string_is_present && this.tbm === this.imgs_param_val;

    public is_search_results: boolean =
        this.is_all_page ||
        this.is_videos_page ||
        this.is_books_page ||
        this.is_news_page ||
        this.is_shopping_page;

    public is_icons_search_results: boolean =
        this.is_all_page || this.is_videos_page || this.is_news_page || this.is_shopping_page;

    public is_non_standard_search_results: boolean = this.is_news_page || this.is_shopping_page;

    public set_current_location = (): void =>
        err(() => {
            if (this.is_all_page) {
                this.current_location = 'all';
            } else if (this.is_videos_page) {
                this.current_location = 'videos';
            } else if (this.is_books_page) {
                this.current_location = 'books';
            } else if (this.is_news_page) {
                this.current_location = 'news';
            } else if (this.is_shopping_page) {
                this.current_location = 'shopping';
            } else if (this.is_imgs_page) {
                this.current_location = 'imgs';
            }
        }, 'ges_64357');
}
