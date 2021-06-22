import { browser, Downloads } from 'webextension-polyfill-ts';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public run = ({ type, img_url }: { type: string; img_url: string }): Promise<string> =>
        new Promise(() =>
            err_async(async () => {
                if (['view_img', 'search_by_img'].includes(type)) {
                    browser.tabs.create({ url: img_url });
                } else if (['download_img', 'save_img_as'].includes(type)) {
                    const img_filename: string = img_url
                        .split('/')
                        .pop()!
                        .split('#')[0]
                        .split('?')[0];
                    const img_filename_final: string = /\.(webp|jpeg|jpg|gif|png)$/.test(
                        img_filename,
                    )
                        ? img_filename
                        : `${img_filename}.png`;

                    const download_item: Downloads.DownloadOptionsType = {
                        url: img_url,
                        filename: img_filename_final,
                        saveAs: type === 'save_img_as',
                    };

                    if (env.browser !== 'firefox') {
                        const storage: any = await ext.storage_get('img_downloads_dir');

                        const suggest_dir = (
                            download_item_2: Downloads.DownloadItem,
                            suggest: any,
                        ): void =>
                            err(() => {
                                suggest({
                                    filename: `${storage.img_downloads_dir}/${download_item_2.filename}`,
                                });

                                (browser.downloads as any).onDeterminingFilename.removeListener(
                                    suggest_dir,
                                );
                            }, 'ges_1007');

                        (browser.downloads as any).onDeterminingFilename.addListener(suggest_dir);
                    }

                    await browser.downloads.download(download_item);
                }
            }, 'ges_1008'),
        );
}
