import { d_shared } from 'shared/internal';
import { s_el_parser } from 'content_script/internal';

export const init = async (): Promise<void> => {
    await d_shared.Data.i.set_from_storage();

    s_el_parser.Main.i.run();
};
