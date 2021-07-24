import { t } from '@loftyshaky/shared';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
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
            'ges_1171',
        );
}
