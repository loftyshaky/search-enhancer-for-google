import { makeObservable, computed, action, runInAction } from 'mobx';

import { d_data } from 'shared_clean/internal';
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
        return data.settings.prefs.infinite_scrolling_enabled ? '' : 'disabled';
    }

    public change = (): Promise<void> =>
        err_async(async () => {
            d_data.Manipulation.allow_load_settings = false;

            const new_state: boolean = !data.settings.prefs.infinite_scrolling_enabled;

            runInAction(() =>
                err(() => {
                    data.settings.prefs.infinite_scrolling_enabled = new_state;
                }, 'seg_1245'),
            );

            if (new_state) {
                s_infinite_scroll.Scroll.observe();
            }

            await d_data.Manipulation.send_msg_to_update_settings({
                settings: data.settings,
                load_settings: true,
                update_instantly: true,
            });
        }, 'seg_1105');
}

export const InfiniteScrollingState = Class.get_instance();
