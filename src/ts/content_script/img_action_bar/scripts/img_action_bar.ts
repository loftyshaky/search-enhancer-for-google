import { i_img_action_bar } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
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
        }, 'seg_1208');
}

export const ImgActionBar = Class.get_instance();
