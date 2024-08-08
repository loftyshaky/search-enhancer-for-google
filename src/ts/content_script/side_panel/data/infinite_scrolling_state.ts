import { makeObservable, computed, action } from 'mobx';

import { d_settings } from 'shared_clean/internal';
import { s_infinite_scroll } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            disabled_cls: computed,
            change: action,
        });
    }

    get disabled_cls() {
        return data.settings.infinite_scrolling_enabled ? '' : 'disabled';
    }

    public change = (): void =>
        err(() => {
            const new_state: boolean = !data.settings.infinite_scrolling_enabled;

            d_settings.Settings.change({
                key: 'infinite_scrolling_enabled',
                val: new_state,
            });

            if (new_state) {
                s_infinite_scroll.Scroll.observe();
            }

            ext.send_msg_resp({
                msg: 'update_settings_background',
                settings: { ...data.settings, ...{ infinite_scrolling_enabled: new_state } },
                rerun_actions: true,
            });
        }, 'seg_1105');
}

export const InfiniteScrollingState = Class.get_instance();
