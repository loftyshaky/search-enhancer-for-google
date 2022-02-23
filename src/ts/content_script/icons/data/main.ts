import { makeObservable, observable, action, runInAction } from 'mobx';
import { computedFn } from 'mobx-utils';

import { t } from '@loftyshaky/shared';
import { s_icons, i_icons as i_icons_shared } from 'shared/internal';
import { s_el_parser, s_location, i_icons } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<
            Main,
            | 'server_ips'
            | 'server_countries'
            | 'generate_favicon_url'
            | 'generate_server_location_url'
        >(this, {
            favicons: observable,
            server_locations: observable,
            server_ips: observable,
            server_countries: observable,
            generate_favicon_url: action,
            generate_server_location_url: action,
            generate_urls: action,
        });
    }

    public favicons: t.StringRecord = {};
    public server_locations: t.StringRecord = {};
    private server_ips: t.StringRecord = {};
    private server_countries: t.StringRecord = {};
    private generate_server_location_url_deferred: t.CallbackVoid[] = [];

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
                // server_data += ' |';
            }

            if (n(this.server_ips[url])) {
                if (server_country_found) {
                    server_data += ' ';
                }

                // server_data += this.server_ips[url];
            }
        }

        return server_data;
    });

    private generate_favicon_url = async ({ url }: { url: string }): Promise<void> =>
        err_async(
            async () => {
                if (data.settings.favicons_is_visible && this.favicons[url] !== 'placeholder') {
                    runInAction(() =>
                        err(() => {
                            this.favicons[url] = 'pre_placeholder';
                        }, 'ges_1175'),
                    );

                    const favicon_providers: string[] = Object.keys(
                        s_icons.Main.i().favicon_providers,
                    );

                    // eslint-disable-next-line no-restricted-syntax
                    for await (const favicon_provider of favicon_providers) {
                        if (data.settings.favicon_providers[favicon_provider]) {
                            const icon_url: string = s_icons.Main.i().construct_favicon_url({
                                favicon_provider,
                                url,
                            });

                            const img = new Image();

                            await new Promise((resolve, reject) => {
                                err(() => {
                                    img.onerror = reject;
                                    img.onload = () => {
                                        resolve(undefined);
                                    };
                                    img.src = icon_url;
                                }, 'ges_1170');
                            });

                            runInAction(() =>
                                err(() => {
                                    this.favicons[url] = icon_url;
                                }, 'ges_1173'),
                            );

                            break;
                        }
                    }

                    const favicon_url: string = await ext.send_msg_resp({
                        msg: 'get_favicon_url',
                        url,
                    });

                    runInAction(() =>
                        err(() => {
                            if (n(favicon_url)) {
                                this.favicons[url] = favicon_url;
                            } else {
                                this.favicons[url] = 'placeholder';
                            }
                        }, 'ges_1046'),
                    );
                }
            },
            'ges_1047',
            { silent: true },
        );

    private generate_server_location_url = async ({ url }: { url: string }): Promise<void> =>
        err_async(async () => {
            if (
                data.settings.server_locations_is_visible &&
                this.server_locations[url] !== 'placeholder'
            ) {
                runInAction(() =>
                    err(() => {
                        this.server_locations[url] = 'pre_placeholder';
                    }, 'ges_1176'),
                );

                const response: i_icons_shared.ServerInfo | string = await ext.send_msg_resp({
                    msg: 'get_server_info',
                    url,
                });

                if (response === 'ip_to_country_arr_is_not_yet_generated') {
                    this.generate_server_location_url_deferred.push(() => {
                        this.generate_server_location_url({ url });
                    });
                } else {
                    const server_info: i_icons_shared.ServerInfo =
                        response as i_icons_shared.ServerInfo;

                    const server_location_found: boolean =
                        n(server_info) && server_info.country_code !== '';

                    const flag_path = server_location_found
                        ? we.runtime.getURL(`flags/${server_info.country_code}.png`)
                        : 'placeholder';

                    runInAction(() =>
                        err(() => {
                            this.server_locations[url] = flag_path;

                            if (server_location_found) {
                                if (server_info.country_name !== '') {
                                    this.server_countries[url] = server_info.country_name;
                                }

                                if (server_info.ip !== '') {
                                    this.server_ips[url] = server_info.ip;
                                }
                            }
                        }, 'ges_1048'),
                    );
                }
            }
        }, 'ges_1049');

    public run_deferred_generate_server_location_url_fs = async (): Promise<void> =>
        err_async(async () => {
            this.generate_server_location_url_deferred.forEach((f: t.CallbackVoid): void =>
                err(() => {
                    f();
                }, 'ges_1205'),
            );

            this.generate_server_location_url_deferred = [];
        }, 'ges_1204');

    public generate_urls = ({ i }: { i: number }): void =>
        err(() => {
            const generate_url_if_its_doesnt_exist = ({
                key_1,
                key_2,
            }: {
                key_1: string;
                key_2: string;
            }): void =>
                err(() => {
                    const that = s_el_parser.Main.i() as any;
                    const that_2 = this as any;
                    const key_2_plural: string = `${key_2}s`;
                    const url: string = that[key_1][i];

                    const cond =
                        !n(that_2[key_2_plural][url]) ||
                        that_2[key_2_plural][url] === 'placeholder';

                    if (cond) {
                        that_2[`generate_${key_2}_url`]({
                            url: that[key_1][i],
                        });
                    }
                }, 'ges_1050');

            generate_url_if_its_doesnt_exist({ key_1: 'hostnames', key_2: 'server_location' });
            generate_url_if_its_doesnt_exist({ key_1: 'hrefs', key_2: 'favicon' });
        }, 'ges_1051');

    public get_url = ({ i, type }: { i: number; type: i_icons.IconType }): string =>
        err(() => s_el_parser.Main.i()[type === 'favicons' ? 'hrefs' : 'hostnames'][i], 'ges_1052');

    public get_show_icon_bool = ({ type, url }: { type: i_icons.IconType; url: string }): boolean =>
        err(() => {
            const src: string = this[type][url];

            return Boolean(
                n(src) &&
                    src !== 'placeholder' &&
                    ((type === 'favicons' && !s_location.Main.i().is_news_page) ||
                        type === 'server_locations'),
            );
        }, 'ges_1053');

    public icon_visibility_cls = ({ show_icon }: { show_icon: boolean }): string =>
        err(() => (show_icon ? '' : 'none'), 'ges_1054');

    public is_any_placeholder = ({ src }: { src: string }): boolean =>
        err(() => ['pre_placeholder', 'placeholder'].includes(src), 'ges_1055');

    public show_placeholder = ({
        pre,
        type,
        url,
    }: {
        pre: boolean;
        type: i_icons.IconType;
        url: string;
    }): boolean =>
        err(() => {
            const src: string = this[type][url];

            return (
                n(src) &&
                src === `${pre ? 'pre_' : ''}placeholder` &&
                (type === 'server_locations' ||
                    (type === 'favicons' && !s_location.Main.i().is_news_page))
            );
        }, 'ges_1055');

    public show_icon_w = computedFn(function (
        this: Main,
        { type }: { type: i_icons.IconType },
    ): string {
        return (
            (type === 'favicons' && s_location.Main.i().is_news_page) ||
            data.settings[`${type}_is_visible`]
        );
    });
}
