import { makeObservable, observable, action, runInAction } from 'mobx';
import { computedFn } from 'mobx-utils';
import { browser } from 'webextension-polyfill-ts';

import { i_icons as i_icons_shared } from 'shared/internal';
import { s_el_parser, s_location, i_icons } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            favicons: observable,
            server_locations: observable,
            server_ips: observable,
            server_countries: observable,
            generate_favicons: action,
            generate_server_locations: action,
        });
    }

    public favicons: { [index: string]: string } = {};
    public server_locations: { [index: string]: string } = {};
    public server_ips: { [index: string]: string } = {};
    public server_countries: { [index: string]: string } = {};

    public server_data = computedFn(function (
        this: Main,
        {
            type,
            url,
        }: {
            type: i_icons.IconType;
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
    });

    public generate_favicons = async ({ url }: { url: string }): Promise<void> =>
        err_async(async () => {
            if (data.settings.show_favicons) {
                this.favicons[url] = 'placeholder';

                const favicon_url: string = await ext.send_msg_resp({
                    msg: 'get_favicon_url',
                    url,
                });

                if (n(favicon_url)) {
                    runInAction(() => {
                        this.favicons[url] = favicon_url;
                    });
                }
            }
        }, 'ges_1041');

    public generate_server_locations = async ({ url }: { url: string }): Promise<void> =>
        err_async(
            async () => {
                if (data.settings.show_server_locations) {
                    this.server_locations[url] = 'placeholder';

                    const server_info: i_icons_shared.ServerInfo = await ext.send_msg_resp({
                        msg: 'get_server_info',
                        url,
                    });
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
            'ges_1042',
            { silent: true },
        );

    public get_url = ({ i, type }: { i: number; type: i_icons.IconType }): string =>
        err(() => s_el_parser.Main.i()[type === 'favicons' ? 'hrefs' : 'hostnames'][i], 'ges_1043');

    public get_show_icon_bool = ({ type, url }: { type: i_icons.IconType; url: string }): boolean =>
        err(() => {
            const src: string = this[type][url];

            return Boolean(
                n(src) &&
                    src !== 'placeholder' &&
                    ((type === 'favicons' && !s_location.Main.i().is_news_page) ||
                        type === 'server_locations'),
            );
        }, 'ges_1044');

    public icon_visibility_cls = ({ show_icon }: { show_icon: boolean }): string =>
        err(() => (show_icon ? '' : 'none'), 'ges_1045');

    public show_placeholder = ({
        type,
        show_icon,
    }: {
        type: i_icons.IconType;
        show_icon: boolean;
    }): boolean =>
        err(
            () =>
                !show_icon &&
                (type === 'server_locations' ||
                    (type === 'favicons' && !s_location.Main.i().is_news_page)),
            'ges_1046',
        );

    public show_icon_w = computedFn(function (
        this: Main,
        { type }: { type: i_icons.IconType },
    ): string {
        return (
            (type === 'favicons' && s_location.Main.i().is_news_page) ||
            data.settings[`show_${type}`]
        );
    });
}
