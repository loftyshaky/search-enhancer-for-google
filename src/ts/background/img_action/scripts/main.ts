import { browser } from 'webextension-polyfill-ts';

export class Main {
    private static i0: Main;

    public static i(): Main {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public run = (
        {
            type,
            img_url,
        }: {
            type: string;
            img_url: string
        },
    ): Promise<string> => new Promise(() => err_async(async () => {
        if ([
            'view_img',
            'search_by_img',
        ].includes(type)) {
            browser.tabs.create({ url: img_url });
        }
    },
    1110));
}
