import { t } from '@loftyshaky/shared/shared_clean';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public favicon_providers: t.StringRecord = {
        google: 'https://s2.googleusercontent.com/s2/favicons?domain_url=',
        yandex: 'https://favicon.yandex.net/favicon/v2/',
        duckduckgo: 'https://icons.duckduckgo.com/ip2/',
    };

    public construct_favicon_url = ({
        url,
        favicon_provider,
    }: {
        url: string;
        favicon_provider: string;
    }): string =>
        err(
            () =>
                favicon_provider === 'duckduckgo'
                    ? `${this.favicon_providers[favicon_provider]}${new URL(url).hostname}.ico`
                    : `${this.favicon_providers[favicon_provider]}${url}`,
            'seg_1171',
        );
}

export const Icons = Class.get_instance();
