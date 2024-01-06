import { i_img_action_bar } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public img_action_bar_els: { [index: string]: HTMLDivElement } = {};

    public store_img_action_bar_el = ({
        root,
        img_viewer_i,
    }: {
        root: HTMLDivElement;
        img_viewer_i: i_img_action_bar.ImgViewerI | undefined;
    }): void =>
        err(() => {
            if (n(root.shadowRoot)) {
                const img_action_bar = sb<HTMLDivElement>(root.shadowRoot, '.img_action_bar');

                if (n(img_action_bar) && n(img_viewer_i)) {
                    this.img_action_bar_els[img_viewer_i] = img_action_bar;
                }
            }
        }, 'ges_1208');
}
