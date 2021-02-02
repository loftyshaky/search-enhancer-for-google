import { s_actions } from 'content_script/internal';

export const init = (): void => {
    s_actions.Main.i().run_initial_actions();

    window.addEventListener(
        'load',
        s_actions.Main.i().run_on_load_actions,
    );
};
