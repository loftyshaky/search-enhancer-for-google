import {
    makeObservable,
    observable,
    action,
    computed,
} from 'mobx';

import { Suffix } from 'shared/internal';

export class Visibility {
    private static i0: Visibility;

    public static i(): Visibility {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                is_visible: observable,
                visibility_cls: computed,
                set: action,
            },
        );
    }

    public is_visible: boolean = false;

    public set = (
        { is_visible }: { is_visible: boolean; },
        e: any,
    ): void => err(() => {
        const entered_img_action_bar = e.type === 'mouseleave'
                                       && x.matches(
                                           e.relatedTarget,
                                           `.${new Suffix('img_action_bar').result}`,
                                       );

        if (!entered_img_action_bar) {
            this.is_visible = is_visible;
        }
    },
    1108);

    public get visibility_cls() {
        return this.is_visible
            ? ''
            : 'hidden';
    }
}
