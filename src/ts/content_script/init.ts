import _ from 'lodash';
import { d_shared } from 'shared/internal';
import {
    s_el_parser,
    s_roots,
    s_keywords,
} from 'content_script/internal';

import { InitAll } from 'shared/init_all';

let loaded_all = false;

const run_actions = async (): Promise<void> => {
    await d_shared.Data.i().set_from_storage();
    s_el_parser.Main.i().get_els();
    s_keywords.Main.i().color_keywords();
    s_roots.Main.i().apply_root_parent_cls();
};

export const run_initial_actions = async (): Promise<void> => {
    InitAll.i().init();

    await d_shared.Data.i().set_from_storage();
    s_el_parser.Main.i().get_els();
    s_keywords.Main.i().color_keywords();
    s_roots.Main.i().apply_root_parent_cls();
    s_roots.Main.i().init({
        name: 'icons',
        limit: 10,
    });
};

export const run_on_load_actions = async (): Promise<void> => {
    await x.delay(1000);

    s_roots.Main.i().init({
        name: 'icons',
        start: 11,
    });

    loaded_all = true;
};

const run_reload_actions = async (): Promise<void> => {
    if (loaded_all) {
        await run_actions();
        s_roots.Main.i().init({ name: 'icons' });
    }
};

export const run_actions_debounce = _.debounce(
    run_reload_actions,
    500,
);
