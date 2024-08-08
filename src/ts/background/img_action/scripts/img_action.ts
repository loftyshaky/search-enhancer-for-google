import { Downloads } from 'webextension-polyfill';

import { i_data } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public run = ({ type, img_url }: { type: string; img_url: string }): Promise<void> =>
        new Promise(() => {
            err_async(async () => {
                if (['view_img', 'search_by_img'].includes(type)) {
                    we.tabs.create({ url: img_url });
                } else if (['download_img', 'save_img_as'].includes(type)) {
                    const img_filename: string | undefined = img_url.split('/').pop();

                    if (n(img_filename)) {
                        const img_filename_2: string = img_filename.split('#')[0].split('?')[0];
                        const img_filename_final: string = /\.(webp|jpeg|jpg|gif|png)$/.test(
                            img_filename_2,
                        )
                            ? img_filename_2
                            : `${img_filename_2}.png`;

                        const download_item = {
                            url: img_url,
                            filename: img_filename_final,
                            saveAs: type === 'save_img_as',
                        };

                        if (env.browser !== 'firefox') {
                            const storage: i_data.Settings =
                                await ext.storage_get('img_downloads_dir');

                            const suggest_dir = (
                                download_item_2: Downloads.DownloadItem,
                                suggest: ({ filename }: { filename: string }) => void,
                            ): void =>
                                err(() => {
                                    suggest({
                                        filename: `${storage.img_downloads_dir}/${download_item_2.filename}`,
                                    });

                                    we.downloads.onDeterminingFilename.removeListener(suggest_dir);
                                }, 'seg_1014');

                            we.downloads.onDeterminingFilename.addListener(suggest_dir);
                        }

                        await we.downloads.download(download_item);
                    }
                }
            }, 'seg_1015');
        });
}

export const ImgAction = Class.get_instance();
