class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public current_location: string = '';
    private params = new URLSearchParams(globalThis.location.search);
    private tbm: string | null = this.params.get('tbm');
    private tbs: string | null = this.params.get('tbs');
    private search_string_is_present: boolean = globalThis.location.href.includes('search?');
    private is_search_by_img_all_page: boolean = n(this.tbs) && this.tbs.includes('sbi:');
    private imgs = sa<HTMLImageElement>('#search img');

    public is_content_script_execution_page: boolean =
        /^https:\/\/www\.google\.[a-z]+\/search\?.+$/.test(globalThis.location.href);

    public is_search_by_img_page: boolean =
        this.search_string_is_present && this.is_search_by_img_all_page;

    public is_videos_page: boolean = this.search_string_is_present && this.tbm === 'vid';

    public is_books_page: boolean = this.search_string_is_present && this.tbm === 'bks';

    public is_news_page: boolean = this.search_string_is_present && this.tbm === 'nws';

    public is_shopping_page: boolean = this.search_string_is_present && this.tbm === 'shop';

    public is_imgs_page: boolean = n(this.imgs) ? this.imgs.length >= 100 : false;

    public is_all_page: boolean =
        !this.is_imgs_page &&
        !this.is_search_by_img_page &&
        !this.is_videos_page &&
        !this.is_books_page &&
        !this.is_news_page &&
        !this.is_shopping_page;

    public is_search_results: boolean =
        this.is_all_page ||
        this.is_search_by_img_page ||
        this.is_videos_page ||
        this.is_books_page ||
        this.is_news_page ||
        this.is_shopping_page;

    public is_icons_search_results: boolean =
        this.is_all_page ||
        this.is_search_by_img_page ||
        this.is_videos_page ||
        this.is_news_page ||
        this.is_shopping_page;

    public is_non_standard_search_results: boolean = this.is_news_page || this.is_shopping_page;

    public set_current_location = (): void =>
        err(() => {
            if (this.is_search_by_img_page) {
                this.current_location = 'search_by_img';
            } else if (this.is_all_page) {
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
        }, 'seg_64357');
}

export const Location = Class.get_instance();
