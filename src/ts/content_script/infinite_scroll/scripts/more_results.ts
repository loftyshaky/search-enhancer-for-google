import { s_el_parser } from 'content_script/internal';

export class MoreResults {
    private static i0: MoreResults;

    public static i(): MoreResults {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public load_next_page = (): void =>
        err(() => {
            const { more_results_btn } = s_el_parser.Main.i();

            if (n(more_results_btn)) {
                more_results_btn.click();
            }
        }, 'ges_1223');
}
