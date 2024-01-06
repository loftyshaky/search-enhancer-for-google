import { makeObservable, computed, action } from 'mobx';

import { d_settings } from 'shared/internal';
import { s_infinite_scroll } from 'content_script/internal';

export class InfiniteScrollingState {
    private static i0: InfiniteScrollingState;

    public static i(): InfiniteScrollingState {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
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

            d_settings.Main.i().change({
                key: 'infinite_scrolling_enabled',
                val: new_state,
            });

            if (new_state) {
                s_infinite_scroll.Scroll.i().observe();
            }

            ext.send_msg_resp({
                msg: 'update_settings_background',
                settings: { ...data.settings, ...{ infinite_scrolling_enabled: new_state } },
                rerun_actions: true,
            });
        }, 'ges_1105');
}
