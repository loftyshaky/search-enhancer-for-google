import { makeObservable, observable, computed, action } from 'mobx';

import { i_infinite_scroll } from 'content_script/internal';

export class LoadEndMsg {
    private static i0: LoadEndMsg;

    public static i(): LoadEndMsg {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<LoadEndMsg, 'is_visible'>(this, {
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
        return this.is_visible ? '' : 'none';
    }

    public change_visibility = ({ is_visible }: { is_visible: boolean }): void =>
        err(() => {
            this.is_visible = is_visible;
        }, 'ges_1065');

    public change_type = ({ type }: { type: i_infinite_scroll.LoadEndMsgType }): void =>
        err(() => {
            this.type = type;
        }, 'ges_1066');
}
