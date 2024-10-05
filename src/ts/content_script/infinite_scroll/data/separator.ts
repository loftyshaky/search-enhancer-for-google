import { makeObservable, observable, computed, action } from 'mobx';

import { s_viewport } from '@loftyshaky/shared/shared';
import { s_el_parser, s_text_dir } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            offset_left: observable,
            none_cls: computed,
            set_offset_left: action,
        });
    }

    public offset_left: string = '0';

    get none_cls() {
        return data.settings.prefs.page_separators_is_visible ? '' : 'none';
    }

    public set_offset_left = (): void =>
        err(() => {
            if (n(s_el_parser.ElParser.search_result_body)) {
                const rect = s_el_parser.ElParser.search_result_body!.getBoundingClientRect();

                if (s_text_dir.TextDir.dir === 'ltr') {
                    this.offset_left = x.px(rect.left);
                } else if (s_text_dir.TextDir.dir === 'rtl') {
                    this.offset_left = x.px(
                        s_viewport.Viewport.get_dim({ dim: 'width' }) - rect.right,
                    );
                }
            }
        }, 'seg_1063');
}

export const Separator = Class.get_instance();
