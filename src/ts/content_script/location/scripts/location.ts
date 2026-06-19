class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public current_location: string = '';

    public is_content_script_execution_page: boolean = false;
    public is_search_by_img_page: boolean = false;
    public is_videos_page: boolean = false;
    public is_books_page: boolean = false;
    public is_news_page: boolean = false;
    public is_shopping_page: boolean = false;
    public is_web_page: boolean = false;
    public is_forums_page: boolean = false;
    public is_short_videos_page: boolean = false;
    public is_imgs_page: boolean = false;
    public is_all_page: boolean = false;
    public is_native_infinite_scroll_results: boolean = false;
    public is_native_favicon_results: boolean = false;
    public is_native_favicon_results_show_or_hide_native_favicons: boolean = false;
    public is_jump_to_related_searches_side_panel_results: boolean = false;
    public is_page_number_side_panel_results: boolean = false;

    public is_search_results: boolean = false;
    public is_icons_search_results: boolean = false;
    public is_non_standard_search_results: boolean = false;

    public set_current_location = (): void =>
        err(() => {
            const params = new URLSearchParams(globalThis.location.search);
            const tbm: string | null = params.get('tbm');
            const tbs: string | null = params.get('tbs');
            const udm: string | null = params.get('udm');
            const search_string_is_present: boolean = globalThis.location.href.includes('search?');
            const is_search_by_img_all_page: boolean = n(tbs) && tbs.includes('sbi:');

            this.is_content_script_execution_page =
                /^https:\/\/www\.google\.[a-z]+\/search\?.+$/.test(globalThis.location.href);

            this.is_search_by_img_page = search_string_is_present && is_search_by_img_all_page;
            this.is_videos_page = udm === '7';
            this.is_books_page = udm === '36';
            this.is_news_page = search_string_is_present && tbm === 'nws';
            this.is_shopping_page = udm === '28';
            this.is_web_page = udm === '14';
            this.is_forums_page = udm === '18';
            this.is_short_videos_page = udm === '39';
            this.is_imgs_page = udm === '2';

            this.is_all_page =
                !this.is_imgs_page &&
                !this.is_search_by_img_page &&
                !this.is_videos_page &&
                !this.is_books_page &&
                !this.is_news_page &&
                !this.is_shopping_page &&
                !this.is_web_page &&
                !this.is_forums_page &&
                !this.is_short_videos_page;

            this.is_native_infinite_scroll_results =
                this.is_videos_page || this.is_shopping_page || this.is_short_videos_page;

            this.is_native_favicon_results =
                this.is_all_page || this.is_forums_page || this.is_web_page;

            this.is_native_favicon_results_show_or_hide_native_favicons =
                this.is_native_favicon_results || this.is_news_page;

            this.is_jump_to_related_searches_side_panel_results =
                this.is_all_page ||
                this.is_search_by_img_page ||
                this.is_books_page ||
                this.is_news_page ||
                this.is_web_page ||
                this.is_forums_page;

            this.is_page_number_side_panel_results =
                this.is_all_page ||
                this.is_search_by_img_page ||
                this.is_books_page ||
                this.is_news_page ||
                this.is_web_page ||
                this.is_forums_page;

            this.is_search_results =
                this.is_all_page ||
                this.is_search_by_img_page ||
                this.is_videos_page ||
                this.is_books_page ||
                this.is_news_page ||
                this.is_shopping_page ||
                this.is_web_page ||
                this.is_forums_page ||
                this.is_short_videos_page;

            this.is_icons_search_results =
                this.is_all_page ||
                this.is_search_by_img_page ||
                this.is_videos_page ||
                this.is_news_page ||
                this.is_shopping_page ||
                this.is_web_page ||
                this.is_forums_page;

            this.is_non_standard_search_results = this.is_news_page || this.is_shopping_page;

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
            } else if (this.is_web_page) {
                this.current_location = 'web';
            } else if (this.is_forums_page) {
                this.current_location = 'forums';
            } else if (this.is_short_videos_page) {
                this.current_location = 'short_videos';
            } else if (this.is_imgs_page) {
                this.current_location = 'imgs';
            }
        }, 'seg_64357');
}

export const Location = Class.get_instance();
