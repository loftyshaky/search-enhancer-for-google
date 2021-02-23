import {
    s_data,
    s_db,
    s_ip_to_country,
} from 'background/internal';

export const init = async (): Promise<void> => {
    await s_data.Main.i().set_from_storage();
    s_db.Main.i().init_db();
    await s_ip_to_country.Main.i().populate_indexed_db_from_ip_to_country_csv();
};
