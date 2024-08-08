import { s_el_parser, d_infinite_scroll } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public is_last_page: boolean = false;

    public load_next_page = (): void =>
        err(() => {
            const { more_results_btn, more_results_btn_spinner } = s_el_parser.ElParser;

            if (n(more_results_btn)) {
                const more_results_btn_spinner_is_visible: boolean = n(more_results_btn_spinner)
                    ? more_results_btn_spinner.offsetHeight !== 0
                    : true;

                if (this.check_if_last_page_or_loading() && !more_results_btn_spinner_is_visible) {
                    d_infinite_scroll.LoadEndMsg.change_visibility({
                        is_visible: true,
                    });
                } else {
                    more_results_btn.click();
                }
            }
        }, 'seg_1223');

    public check_if_last_page_or_loading = (): boolean =>
        err(() => {
            const { more_results_btn } = s_el_parser.ElParser;

            if (n(more_results_btn)) {
                return more_results_btn.style.transform === 'scale(0)';
            }

            return true;
        }, 'seg_1226');
}

export const MoreResults = Class.get_instance();
