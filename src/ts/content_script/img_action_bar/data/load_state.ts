import { action, computed, makeObservable, observable } from 'mobx';

import { s_el_parser } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            is_loaded: observable,
            img_loaded_cls: computed,
            set: action,
        });
    }

    public is_loaded: boolean = false;

    public set = ({ bool }: { bool: boolean }): void =>
        err(() => {
            this.is_loaded = bool;
        }, 'seg_1259');

    public check_and_set_if_needed = ({ img_el }: { img_el?: HTMLElement } = {}): void =>
        err(() => {
            const imgs = sab<HTMLImageElement>(s_el_parser.ElParser.img_viewer, 'img');

            if (n(imgs)) {
                const preview_img_selector: string = '[src^="https://encrypted-tbn0.gstatic.com"]';

                const full_image_is_loaded = [...imgs].some((img: HTMLImageElement): boolean =>
                    err(() => {
                        const is_same_img: boolean = n(img_el) ? img.isSameNode(img_el) : true;
                        const added_node_is_preview_img: boolean = x.matches(
                            n(img_el) ? img_el : img,
                            preview_img_selector,
                        );

                        return is_same_img && !added_node_is_preview_img;
                    }, 'seg_1258'),
                );

                if (full_image_is_loaded) {
                    this.set({ bool: true });
                }
            }
        }, 'seg_1260');

    public get img_loaded_cls() {
        return this.is_loaded ? 'img_loaded' : '';
    }
}

export const LoadState = Class.get_instance();
