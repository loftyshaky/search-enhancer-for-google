import { makeObservable, observable, computed, action } from 'mobx';

import { d_infinite_scroll, s_location, i_infinite_scroll } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable<Class, 'is_visible'>(this, {
            type: observable,
            is_visible: observable,
            visibility_cls: computed,
            change_visibility: action,
            change_type: action,
        });
    }

    public type: i_infinite_scroll.LoadEndMsgType = 'last_page';
    private is_visible: boolean = false;

    public get visibility_cls() {
        return this.is_visible &&
            s_location.Location.is_search_results &&
            d_infinite_scroll.Separator.offset_left !== '0'
            ? ''
            : 'none';
    }

    public change_visibility = ({ is_visible }: { is_visible: boolean }): void =>
        err(() => {
            this.is_visible = is_visible;
        }, 'seg_1061');

    public change_type = ({ type }: { type: i_infinite_scroll.LoadEndMsgType }): void =>
        err(() => {
            this.type = type;
        }, 'seg_1062');
}

export const LoadEndMsg = Class.get_instance();
