import { s_el_parser } from 'content_script/internal';

export class Action {
    private static i0: Action;

    public static i(): Action {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public run = (
        { type }: { type: string },
    ): void => err(() => {
        const img_el: HTMLImageElement | undefined = s_el_parser.Main.i().get_img_in_img_viewer();

        if (n(img_el)) {
            const img_url: string = img_el.src;

            if (type === 'search_by_img') {
                this.send_msg({
                    type,
                    img_url: `https://www.google.com/searchbyimage?&image_url=${img_url}`,
                });
            } else if (type === 'copy_img_url') {
                this.copy_img_url({ img_url });
            } else {
                this.send_msg({
                    type,
                    img_url,
                });
            }
        }
    },
    1109);

    private send_msg = (
        {
            type,
            img_url,
        }: {
            type: string;
            img_url: string
        },
    ): void => err(() => {
        ext.send_msg({
            msg: 'run_img_action',
            type,
            img_url,
        });
    },
    1111);

    private copy_img_url = (
        { img_url }: { img_url: string },
    ): Promise<void> => err(async () => {
        await navigator.clipboard.writeText(img_url);
    },
    1112);
}
