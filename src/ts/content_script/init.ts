import { s_tab_index } from '@loftyshaky/shared/shared';
import { s_suffix } from 'shared_clean/internal';
import { InitAll } from 'shared/internal';
import {
    d_img_action_bar,
    s_roots,
    d_side_panel,
    s_actions,
    s_infinite_scroll,
    s_location,
    s_text_dir,
} from 'content_script/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        if (s_location.Location.is_content_script_execution_page) {
            x.insert_invisible_chars_in_title();
            s_location.Location.set_current_location();
            s_infinite_scroll.Iframe.set_search_results_w_selector_var();
            s_tab_index.TabIndex.bind_set_input_type_f({
                parent: document.body,
                app_id: s_suffix.app_id,
            });

            d_img_action_bar.Btns.init_btns();
            d_img_action_bar.Btns.init_component();
            s_roots.Roots.init_component();
            await s_actions.Actions.run_initial_actions();
            s_text_dir.TextDir.get();
            s_infinite_scroll.FooterEls.append_to_footer();

            x.bind(self, 'scroll', d_side_panel.Page.set_current);
            x.bind(
                document,
                'mouseup',
                d_side_panel.Scroll.stop_remember_scrolling_position_0_35_seconds_timeout,
            );

            if (s_location.Location.is_imgs_page) {
                // "get_img_viewer_w" function called from "change" function causes infinite loop in "All" pages when clicking on cards: https://www.google.com/search?q=animals+list
                x.bind(document, 'mousemove', d_img_action_bar.Visibility.change);
                x.bind(document, 'scroll', d_img_action_bar.Position.set_bottom_all);
            }

            InitAll.render_spinner();
            InitAll.render_last_end_msg();
            InitAll.render_side_panel();
        }
    }, 'seg_1082');
