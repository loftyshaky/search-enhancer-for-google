import _ from 'lodash';
// import { browser } from 'webextension-polyfill-ts';

import {
    s_db,
    i_icons,
} from 'shared/internal';
import { i_ip_to_country } from 'background/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private empty_favicons: { [index: string]: string } = {
        google: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVR4AWL4//8/RRjO8Iucx+noO0O2qmlbUEnt5r3Juas+hsQD6KaG7dqCKPgx72Pe9GIY27btZBrbtm3btm0nO12D7tVXe63jqtqqU/iDw9K58sEruKkngH0DBljOE+T/qqx/Ln718RZOFasxyd3XRbWzlFMxRbgOTx9QWFzHtZlD+aqLb108sOAIAai6+NbHW7lUHaZkDFJt+wp1DG7R1d0b7Z88EOL08oXwjokcOvvUxYMjBFCamWP5KjKBjKOpZx2HEPj+Ieod26U+dpg6lK2CIwTQH0oECGT5eHj+IgSueJ5fPaPg6PZrz6DGHiGAISE7QPrIvIKVrSvCe2DNHSsehIDatOBna/+OEOgTQE6WAy1AAFiVcf6PhgCGxEvlA9QngLlAQCkLsNWhBZIDz/zg4ggmjHfYxoPGEMPZECW+zjwmFk6Ih194y7VHYGOPvEYlTAJlQwI4MEhgTOzZGiNalRpGgsOYFw5lEfTKybgfBtmuTNdI3MrOTAQmYf/DNcAwDeycVjROgZFt18gMso6V5Z8JpcEk2LPKpOAH0/4bKMCAYnuqm7cHOGHJTBRhAEJN9d/t5zCxAAAAAElFTkSuQmCC',
        yandex: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4AWIAAYAAAwAABQABggWTzwAAAABJRU5ErkJggg==',
    }

    public favicon_is_empty = (
        {
            icon_url,
            provider,
        }: {
            icon_url: string;
            provider: 'google' | 'yandex'
        },
    ): Promise<boolean> => err_async(async () => {
        const response = await fetch(icon_url);
        const blob: Blob = await response.blob();

        const base64: string = await x.convert_blob_to_base64({ blob });

        return this.empty_favicons[provider] === base64;
    },
    1039);

    public get_server_info = async (
        { url }: { url: string },
    ): Promise<i_icons.ServerInfo> => err_async(async () => {
        try {
            const region_name: any = new (Intl as any).DisplayNames(
                ['en-US'/* browser.i18n.getUILanguage() */],
                { type: 'region' },
            );
            const response: any = await fetch(`https://dns.google/resolve?name=${url}`);
            const json: any = await response.json();
            const ip: string = (_.last(json.Answer) as any).data;
            const ip_sub_blocks: string[] = ip.split('.');
            const ip_number: number = (16777216 * +ip_sub_blocks[0])
                                    + (65536 * +ip_sub_blocks[1])
                                    + (256 * +ip_sub_blocks[2])
                                    + +ip_sub_blocks[3];
            const record: i_ip_to_country.Record = await s_db.Main.i().db.ip_to_country.where('ip_from').belowOrEqual(ip_number).last();

            return {
                ip,
                country_code: record.country_code,
                country_name: region_name.of(record.country_code),
            };
        } catch (error_obj) {
            show_err_ribbon(
                error_obj,
                1044,
            );

            return {
                ip: '',
                country_code: '',
                country_name: '',
            };
        }
    },
    1042);
}
