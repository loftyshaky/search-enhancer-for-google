import { s_db } from 'shared/internal';
import { s_data, s_ip_to_country } from 'background/internal';

export const init = (): Promise<void> =>
    err_async(async () => {
        await s_data.Main.i().set_from_storage();
        s_db.Main.i().init_db();
        await s_ip_to_country.Main.i().populate_indexed_db_from_ip_to_country_csv();
    }, 'ges_1151');
