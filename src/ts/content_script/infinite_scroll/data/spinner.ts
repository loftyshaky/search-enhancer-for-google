import { makeObservable, computed } from 'mobx';

import { s_infinite_scroll } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            visibility_cls: computed,
        });
    }

    public get visibility_cls() {
        return s_infinite_scroll.Iframe.inserting_iframe ? '' : 'none';
    }
}

export const Spinner = Class.get_instance();
