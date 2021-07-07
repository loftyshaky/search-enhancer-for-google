import { s_keep_alive } from '@loftyshaky/shared';
import { db } from 'shared/internal';
import { s_data, s_ip_to_country } from 'background/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        s_keep_alive.Tabs.i().add_on_updated_listener({
            connect_cond: () => !s_ip_to_country.Main.i().ip_to_country_loaded_into_inexed_db,
        });
        db.init_db();
        s_data.Main.i().init_defaults();
        await s_data.Main.i().set_from_storage();
        await s_ip_to_country.Main.i().populate_indexed_db_from_ip_to_country_csv();
    }, 'ges_1151');
