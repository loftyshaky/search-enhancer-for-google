import {
    makeObservable,
    computed,
    action,
} from 'mobx';

import { d_shared } from 'shared/internal';

export class InfiniteScrollingState {
    private static i0: InfiniteScrollingState;

    public static i(): InfiniteScrollingState {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                state_cls: computed,
                change: action,
            },
        );
    }

    get state_cls() {
        return data.settings.infinite_scrolling_enabled
            ? 'enabled'
            : 'disabled';
    }

    public change = (): void => err(() => {
        d_shared.Data.i().change({
            key: 'infinite_scrolling_enabled',
            val: !data.settings.infinite_scrolling_enabled,
        });
    },
    1078);
}
