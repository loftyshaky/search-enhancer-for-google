import { makeObservable, observable, computed, action } from 'mobx';

import { s_viewport } from '@loftyshaky/shared';
import { s_el_parser, s_text_dir } from 'content_script/internal';

export class Separator {
    private static i0: Separator;

    public static i(): Separator {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
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
        return data.settings.page_separators_is_visible ? '' : 'none';
    }

    public set_offset_left = (): void =>
        err(() => {
            if (n(s_el_parser.Main.i().search_result_body)) {
                const rect = s_el_parser.Main.i().search_result_body!.getBoundingClientRect();

                if (s_text_dir.Main.i().dir === 'ltr') {
                    this.offset_left = x.px(rect.left);
                } else if (s_text_dir.Main.i().dir === 'rtl') {
                    this.offset_left = x.px(
                        s_viewport.Main.i().get_dim({ dim: 'width' }) - rect.right,
                    );
                }
            }
        }, 'ges_1063');
}
