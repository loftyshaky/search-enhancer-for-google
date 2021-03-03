import {
    makeObservable,
    computed,
} from 'mobx';

export class Separator {
    private static i0: Separator;

    public static i(): Separator {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                none_cls: computed,
            },
        );
    }

    public offset_left: number = 0;

    get none_cls() {
        return data.settings.show_page_separators
            ? ''
            : 'none';
    }

    public set_offset_left = ({ title_el }: { title_el: HTMLElement }): void => err(() => {
        if (this.offset_left === 0) {
            this.offset_left = title_el.getBoundingClientRect().left;
        }
    },
    1101);
}
