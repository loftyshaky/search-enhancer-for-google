import { MouseEvent } from 'react';
import { t } from '@loftyshaky/shared/shared';
import {
    d_icons,
    d_side_panel,
    s_actions,
    s_img_action_bar,
    s_location,
} from 'content_script/internal';

we.runtime.onMessage.addListener((msg: t.Msg): any =>
    err(() => {
        const msg_str: string = msg.msg;

        if (['load_settings', 'load_settings_content_script'].includes(msg_str)) {
            s_actions.Actions.run_reload_actions_2();
        } else if (msg_str === 'run_deferred_generate_server_location_url_fs') {
            d_icons.Icons.run_deferred_generate_server_location_url_fs();
        } else if (msg_str === 'execute_command') {
            switch (msg.command) {
                case 'enable_infinite_scrolling':
                    d_side_panel.InfiniteScrollingState.change();
                    break;
                case 'scroll_to_top':
                    d_side_panel.Scroll.scroll({ button: 0 } as MouseEvent);
                    break;
                case 'scroll_to_bottom':
                    d_side_panel.Scroll.scroll({ button: 2 } as MouseEvent);
                    break;
                case 'remember_scroll_position':
                    d_side_panel.Scroll.scroll({ button: 1 } as MouseEvent);
                    break;
                case 'remember_scroll_position_forced':
                    d_side_panel.Scroll.remember_scrolling_position_0_35_seconds(
                        { keyboard_call: true },
                        { button: 1 } as MouseEvent,
                    );
                    break;
                case 'jump_to_related_searches':
                    d_side_panel.RelatedSearches.jump_to();
                    break;
                default:
                    if (s_location.Location.is_imgs_page) {
                        s_img_action_bar.Action.run({
                            type: msg.command,
                            img_viewer_i: 'main_img_viewer',
                        });
                    }
            }
        }

        return undefined;
    }, 'seg_1086'),
);
