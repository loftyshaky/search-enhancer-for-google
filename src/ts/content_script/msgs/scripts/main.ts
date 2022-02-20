import { MouseEvent } from 'react';
import { t } from '@loftyshaky/shared';
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

        if (msg_str === 'rerun_actions') {
            s_actions.Main.i().run_reload_actions_2();
        } else if (msg_str === 'execute_command') {
            switch (msg.command) {
                case 'enable_infinite_scrolling':
                    d_side_panel.InfiniteScrollingState.i().change();
                    break;
                case 'scroll_to_top':
                    d_side_panel.Scroll.i().scroll({ button: 0 } as MouseEvent);
                    break;
                case 'scroll_to_bottom':
                    d_side_panel.Scroll.i().scroll({ button: 2 } as MouseEvent);
                    break;
                case 'remember_scroll_position':
                    d_side_panel.Scroll.i().scroll({ button: 1 } as MouseEvent);
                    break;
                case 'remember_scroll_position_forced':
                    d_side_panel.Scroll.i().remember_scrolling_position_0_35_seconds(
                        { keyboard_call: true },
                        { button: 1 } as MouseEvent,
                    );
                    break;
                case 'jump_to_related_searches':
                    d_side_panel.RelatedSearches.i().jump_to();
                    break;
                default:
                    if (s_location.Main.i().is_imgs_page) {
                        s_img_action_bar.Action.i().run({
                            type: msg.command,
                            img_viewer_i: 'main',
                        });
                    }
            }
        }
        if (msg_str === 'process_server_info') {
            d_icons.Main.i().process_server_info({ server_info: msg.server_info });
        }

        return undefined;
    }, 'ges_1086'),
);
