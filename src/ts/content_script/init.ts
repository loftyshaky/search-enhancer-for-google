import { s_db } from 'shared/internal';
import {
    s_actions,
    s_infinite_scroll,
    u_side_panel,
    u_img_action_bar,
} from 'content_script/internal';

export const init = async (): Promise<void> => {
    s_db.Main.i().init_db();
    await s_actions.Main.i().run_initial_actions();
    s_infinite_scroll.FooterEls.i().append_to_footer();

    window.addEventListener(
        'load',
        s_actions.Main.i().run_on_load_actions,
    );
    window.addEventListener(
        'scroll',
        s_infinite_scroll.Scroll.i().observe,
    );
    window.addEventListener(
        'scroll',
        u_side_panel.Page.i().set_current,
    );
    document.addEventListener(
        'mouseup',
        u_side_panel.Scroll.i().stop_remember_scrolling_position_0_35_seconds_timeout,
    );
    document.addEventListener(
        'mousemove',
        u_img_action_bar.Visibility.i().change,
    );
};
