import { s_el_parser, d_infinite_scroll } from 'content_script/internal';

export class MoreResults {
    private static i0: MoreResults;

    public static i(): MoreResults {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public is_last_page: boolean = false;

    public load_next_page = (): void =>
        err(() => {
            const { more_results_btn, more_results_btn_spinner } = s_el_parser.Main.i();

            if (n(more_results_btn)) {
                const more_results_btn_spinner_is_visible: boolean = n(more_results_btn_spinner)
                    ? more_results_btn_spinner.offsetHeight !== 0
                    : true;

                if (this.check_if_last_page_or_loading() && !more_results_btn_spinner_is_visible) {
                    d_infinite_scroll.LoadEndMsg.i().change_visibility({
                        is_visible: true,
                    });
                } else {
                    more_results_btn.click();
                }
            }
        }, 'ges_1223');

    public check_if_last_page_or_loading = (): boolean =>
        err(() => {
            const { more_results_btn } = s_el_parser.Main.i();

            if (n(more_results_btn)) {
                return more_results_btn.style.transform === 'scale(0)';
            }

            return true;
        }, 'ges_1226');
}
