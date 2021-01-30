import { d_shared } from 'shared/internal';
import {
    s_el_parser,
    s_roots,
    s_keywords,
} from 'content_script/internal';

import { InitAll } from 'shared/init_all';

export const init = async (): Promise<void> => {
    InitAll.i().init();

    await d_shared.Data.i().set_from_storage();

    s_el_parser.Main.i().get_els();
    s_keywords.Main.i().color_keywords();
    s_roots.Main.i().apply_root_parent_cls();
    s_roots.Main.i().init({ name: 'icons' });
};
