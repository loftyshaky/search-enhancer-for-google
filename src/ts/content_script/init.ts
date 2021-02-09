import {
    s_actions,
    s_infinite_scroll,
} from 'content_script/internal';

export const init = async (): Promise<void> => {
    await s_actions.Main.i().run_initial_actions();
    s_infinite_scroll.Spinner.i().append_to_footer();

    window.addEventListener(
        'load',
        s_actions.Main.i().run_on_load_actions,
    );
    window.addEventListener(
        'scroll',
        s_infinite_scroll.Scroll.i().observe,
    );
};
