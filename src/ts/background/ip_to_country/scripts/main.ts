import _ from 'lodash';

import { s_db } from 'shared/internal';
import { i_ip_to_country } from 'background/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public populate_indexed_db_from_ip_to_country_csv = (): Promise<void> => err_async(async () => {
        const response = await fetch('IpToCountry.csv');
        const ip_to_country_text: string = await response.text();
        const ip_to_country_csv_char_count: number = ip_to_country_text.length;
        const storage: any = await ext.storage_get('last_ip_to_country_csv_char_count');
        const new_ip_to_country_csv_detected: boolean = (
            ip_to_country_csv_char_count !== storage.last_ip_to_country_csv_char_count
        );
        const ip_to_country_db_row_count: number = await s_db.Main.i().db.ip_to_country.count();
        const ip_to_country_db_is_empty = ip_to_country_db_row_count === 0;

        if (
            new_ip_to_country_csv_detected
            || ip_to_country_db_is_empty
        ) {
            await s_db.Main.i().db.ip_to_country.clear();
            await ext.storage_set({
                last_ip_to_country_csv_char_count: ip_to_country_csv_char_count,
            });

            const ip_to_country_text_no_information_and_notes = ip_to_country_text.substring(ip_to_country_text.lastIndexOf('#') + 2);
            const ip_to_country_arr = _.dropRight(ip_to_country_text_no_information_and_notes.split(/\r?\n/));

            const ip_to_country_db_arr = ip_to_country_arr.map(
                (item: string): i_ip_to_country.Record => err(() => {
                    const item_arr: string[] = item.split(',');

                    return {
                        ip_from: +this.normalize_val({ val: item_arr[0] }),
                        country_code: this.normalize_val({ val: item_arr[4] }),
                    };
                },
                'ges_1009'),
            );

            await s_db.Main.i().db.ip_to_country.bulkAdd(ip_to_country_db_arr);

            ext.iterate_all_tabs({ msg: 'rerun_actions' });
        }
    },
    'ges_1010');

    private normalize_val = ({ val }: { val: string }): string => err(
        () => (
            val.replace(
                /"/g,
                '',
            )
        ),
        'ges_1011',
    );
}
