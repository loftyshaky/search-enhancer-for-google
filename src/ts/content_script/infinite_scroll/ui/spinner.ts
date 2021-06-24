import { makeObservable, computed } from 'mobx';

import { s_infinite_scroll } from 'content_script/internal';

export class Spinner {
    private static i0: Spinner;

    public static i(): Spinner {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            visibility_cls: computed,
        });
    }

    public get visibility_cls() {
        return s_infinite_scroll.Iframe.i().inserting_iframe ? '' : 'none';
    }
}
