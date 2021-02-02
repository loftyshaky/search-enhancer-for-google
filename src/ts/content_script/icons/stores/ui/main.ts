import {
    makeObservable,
    observable,
    action,
    runInAction,
} from 'mobx';
import { computedFn } from 'mobx-utils';
import { browser } from 'webextension-polyfill-ts';

import { i_icons as i_icons_shared } from 'shared/internal';
import { i_icons } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                favicons: observable,
                server_locations: observable,
                server_ips: observable,
                server_countries: observable,
                generate_favicons: action,
            },
        );
    }

    public favicons: { [index: string]: string } = {};
    public server_locations: { [index: string]: string } = {};
    public server_ips: { [index: string]: string } = {};
    public server_countries: { [index: string]: string } = {};

    public server_data = computedFn(
        function (
            this: Main,
            {
                type,
                hostname,
            }: {
                type: i_icons.IconType
                hostname: string;
            },
        ): string {
            let server_data: string = '';

            if (type === 'server_locations') {
                const server_country_found: boolean = n(this.server_countries[hostname]);

                if (server_country_found) {
                    server_data += this.server_countries[hostname];
                }

                if (server_data !== '') {
                    server_data += ' |';
                }

                if (n(this.server_ips[hostname])) {
                    if (server_country_found) {
                        server_data += ' ';
                    }

                    server_data += this.server_ips[hostname];
                }
            }

            return server_data;
        },
    );

    public generate_favicons = async (
        { hostname }: { hostname: string },
    ): Promise<void> => err_async(async () => {
        if (data.settings.show_favicons) {
            const google_icon = `https://s2.googleusercontent.com/s2/favicons?domain_url=${hostname}`;
            const yandex_icon = `https://favicon.yandex.net/favicon/v2/${hostname}`;

            this.favicons[hostname] = google_icon;

            const google_favicon_is_empty: boolean = await ext.send_msg_resp(
                {
                    msg: 'favicon_is_empty',
                    icon_url: google_icon,
                    provider: 'google',
                },
            );

            if (google_favicon_is_empty) {
                runInAction(() => {
                    this.favicons[hostname] = yandex_icon;
                });

                const yandex_favicon_is_empty: boolean = await ext.send_msg_resp(
                    {
                        msg: 'favicon_is_empty',
                        icon_url: yandex_icon,
                        provider: 'yandex',
                    },
                );

                if (yandex_favicon_is_empty) {
                    runInAction(() => {
                        this.favicons[hostname] = 'placeholder';
                    });
                }
            }
        }
    },
    1032);

    public generate_server_locations = async (
        { hostname }: { hostname: string },
    ): Promise<void> => err_async(async () => {
        if (data.settings.show_server_locations) {
            const server_info: i_icons_shared.ServerInfo = await ext.send_msg_resp(
                {
                    msg: 'get_server_info',
                    hostname,
                },
            );
            const server_location_found: boolean = server_info.country_code !== '';

            const flag_path = server_location_found
                ? browser.runtime.getURL(`flags/${server_info.country_code}.png`)
                : 'placeholder';

            runInAction(() => {
                this.server_locations[hostname] = flag_path;

                if (server_location_found) {
                    if (server_info.country_name !== '') {
                        this.server_countries[hostname] = server_info.country_name;
                    }

                    if (server_info.ip !== '') {
                        this.server_ips[hostname] = server_info.ip;
                    }
                }
            });
        }
    },
    1041);
}
