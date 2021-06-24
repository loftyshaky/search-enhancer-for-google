import { TabIndex } from '@loftyshaky/shared';
import { app_id, s_db } from 'shared/internal';
import {
    s_actions,
    s_infinite_scroll,
    s_text_dir,
    u_side_panel,
    u_img_action_bar,
} from 'content_script/internal';

export const init = async (): Promise<void> => {
    s_text_dir.Main.i().get();
    s_db.Main.i().init_db();
    await s_actions.Main.i().run_initial_actions();
    s_infinite_scroll.FooterEls.i().append_to_footer();

    TabIndex.i().bind_set_input_type_f({
        parent: document.body,
        app_id,
    });

    x.bind(window, 'scroll', s_infinite_scroll.Scroll.i().observe);
    x.bind(window, 'scroll', u_side_panel.Page.i().set_current);
    x.bind(
        document,
        'mouseup',
        u_side_panel.Scroll.i().stop_remember_scrolling_position_0_35_seconds_timeout,
    );
    x.bind(document, 'mousemove', u_img_action_bar.Visibility.i().change);
};
