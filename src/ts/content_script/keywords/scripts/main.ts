import { d_color } from '@loftyshaky/shared/inputs';

export class Main {
    private static i0: Main;

    public static get i() {
        this.i0 = new this();

        return this.i0;
    }

    public color_keywords = (
        { keyword_els }: { keyword_els: HTMLElement[] },
    ): void => err(
        () => {
            [...keyword_els].forEach((keyword_el: HTMLElement): void => err(
                () => {
                    keyword_el.style.color = d_color.Color.i.access_from_val(
                        { val: data.settings.keyword_color },
                    );
                },
                1028,
            ));
        },
        1027,
    );
}
