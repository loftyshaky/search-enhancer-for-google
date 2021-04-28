import {
    makeObservable,
    observable,
    action,
    runInAction,
} from 'mobx';
import { computedFn } from 'mobx-utils';
import { browser } from 'webextension-polyfill-ts';

import { i_icons as i_icons_shared } from 'shared/internal';
import {
    s_location,
    s_el_parser,
    i_icons,
} from 'content_script/internal';

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
                favicons_loaded: observable,
                server_locations: observable,
                server_locations_loaded: observable,
                server_ips: observable,
                server_countries: observable,
                generate_favicons: action,
                set_favicons_loaded_to_true: action,
            },
        );
    }

    public favicons: { [index: string]: string } = {};
    public favicons_loaded: { [index: string]: boolean } = {};
    public server_locations: { [index: string]: string } = {};
    public server_locations_loaded: { [index: string]: boolean } = {};
    public server_ips: { [index: string]: string } = {};
    public server_countries: { [index: string]: string } = {};

    public server_data = computedFn(
        function (
            this: Main,
            {
                type,
                url,
            }: {
                type: i_icons.IconType
                url: string;
            },
        ): string {
            let server_data: string = '';

            if (type === 'server_locations') {
                const server_country_found: boolean = n(this.server_countries[url]);

                if (server_country_found) {
                    server_data += this.server_countries[url];
                }

                if (server_data !== '') {
                    server_data += ' |';
                }

                if (n(this.server_ips[url])) {
                    if (server_country_found) {
                        server_data += ' ';
                    }

                    server_data += this.server_ips[url];
                }
            }

            return server_data;
        },
    );

    public generate_favicons = async (
        { url }: { url: string },
    ): Promise<void> => err_async(async () => {
        if (data.settings.show_favicons) {
            const google_icon = `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`;
            const yandex_icon = `https://favicon.yandex.net/favicon/v2/${url}`;
            this.favicons[url] = google_icon;

            const google_favicon_is_empty: boolean = await ext.send_msg_resp(
                {
                    msg: 'favicon_is_empty',
                    icon_url: google_icon,
                    provider: 'google',
                },
            );

            if (google_favicon_is_empty) {
                runInAction(() => {
                    this.favicons_loaded[url] = false;
                    this.favicons[url] = yandex_icon;
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
                        this.favicons[url] = 'placeholder';
                    });
                }
            }
        }
    },
    1032);

    public generate_server_locations = async (
        { url }: { url: string },
    ): Promise<void> => err_async(async () => {
        if (data.settings.show_server_locations) {
            const server_info: i_icons_shared.ServerInfo = await ext.send_msg_resp(
                {
                    msg: 'get_server_info',
                    url,
                },
            );
            const server_location_found: boolean = server_info.country_code !== '';

            const flag_path = server_location_found
                ? browser.runtime.getURL(`flags/${server_info.country_code}.png`)
                : 'placeholder';

            runInAction(() => {
                this.server_locations[url] = flag_path;

                if (server_location_found) {
                    if (server_info.country_name !== '') {
                        this.server_countries[url] = server_info.country_name;
                    }

                    if (server_info.ip !== '') {
                        this.server_ips[url] = server_info.ip;
                    }
                }
            });
        }
    },
    1041);

    public get_url = (
        {
            i,
            type,
        }: {
            i: number;
            type: i_icons.IconType;
        },
    ): string => err(() => (
        s_el_parser.Main.i()[type === 'favicons'
            ? 'hrefs'
            : 'hostnames'][i]
    ),
    1071);

    public set_favicons_loaded_to_true = (
        {
            type,
            url,
        }: {
            type: i_icons.IconType;
            url: string;
        },
    ): void => err(() => {
        if (type === 'favicons') {
            this.favicons_loaded[url] = true;
        }
    },
    1088);

    public get_show_icon_bool = ({
        type,
        url,
    }: {
        type: i_icons.IconType;
        url: string
    }): boolean => err(() => {
        const src: string = this[type][url];
        const favicons_loaded: boolean = this.favicons_loaded[url];

        return Boolean(
            n(src)
            && src !== 'placeholder'
            && (
                (
                    type === 'favicons'
                    && favicons_loaded
                    && !s_location.Main.i().is_news_page
                )
                || type === 'server_locations'
            ),
        );
    },
    1089);

    public icon_visibility_cls = ({ show_icon }: { show_icon: boolean }): string => err(() => (
        show_icon
            ? ''
            : 'none'
    ),
    1090);

    public show_placeholder = ({
        type,
        show_icon,
    }: {
        type: i_icons.IconType;
        show_icon: boolean
    }): boolean => err(() => (
        !show_icon && (
            type === 'server_locations'
            || (
                type === 'favicons'
                && !s_location.Main.i().is_news_page
            )
        )
    ),
    1121);

    public show_icon_w = computedFn(
        function (
            this: Main,
            { type }: { type: i_icons.IconType },
        ): string {
            return (
                type === 'favicons'
                && s_location.Main.i().is_news_page
            ) || data.settings[`show_${type}`];
        },
    );
}
