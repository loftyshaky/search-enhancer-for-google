import { makeObservable, observable, action } from 'mobx';

import { i_img_action_bar } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            scale: observable,
            set_scale: action,
        });
    }

    public scale: { [index: string]: string } = {};

    public set_scale = ({
        img_viewer_i,
    }: // img_action_bar_ref,
    {
        img_viewer_i: i_img_action_bar.ImgViewerI;
        // img_action_bar_ref: HTMLDivElement | null;
    }): void =>
        err(() => {
            this.scale[img_viewer_i] = 'scale(100%)';
            /*
            if (n(img_action_bar_ref)) {
                if (img_viewer_i !== 'main_img_viewer') {
                    const img_viewer: HTMLElement =
                        s_el_parser.Main.preview_img_viewers[img_viewer_i];

                    const img_action_bar_height = img_action_bar_ref.offsetHeight;
                    const img_viewer_height = img_viewer.offsetHeight;

                    if (img_action_bar_height > img_viewer_height) {
                        this.scale[img_viewer_i] = `scale(${
                            img_viewer_height === 0
                                ? 1
                                : (100 +
                                      (100 * (img_viewer_height - img_action_bar_height)) /
                                          img_action_bar_height) /
                                  100
                        })`;
                    }
                }
            }
            */
        }, 'seg_1196');
}

export const Size = Class.get_instance();
