import {
    s_actions,
    s_infinite_scroll,
} from 'content_script/internal';

export const init = (): void => {
    s_actions.Main.i().run_initial_actions();

    window.addEventListener(
        'load',
        s_actions.Main.i().run_on_load_actions,
    );
    window.addEventListener(
        'scroll',
        s_infinite_scroll.Scroll.i().observe,
    );
};
