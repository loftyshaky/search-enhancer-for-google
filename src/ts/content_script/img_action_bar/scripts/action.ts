import { s_el_parser, i_img_action_bar } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public run = ({
        type,
        img_viewer_i,
    }: {
        type: string;
        img_viewer_i: i_img_action_bar.ImgViewerI;
    }): void =>
        err(() => {
            const img_el: HTMLImageElement | undefined =
                s_el_parser.ElParser.get_img_in_img_viewer();

            const img_url: string | undefined =
                img_viewer_i === 'main_img_viewer' && img_el
                    ? img_el.src
                    : s_el_parser.ElParser.get_preview_img_url({ img_viewer_i });

            if (n(img_url)) {
                if (type === 'search_by_img') {
                    this.send_msg({
                        type,
                        img_url: `https:www.google.com/searchbyimage?sbisrc=cr_1_5_2&image_url=${img_url}`,
                    });
                } else if (type === 'copy_img_url') {
                    x.copy_text(img_url);
                } else if (type === 'copy_img') {
                    x.copy_img(img_url);
                } else {
                    this.send_msg({
                        type,
                        img_url,
                    });
                }
            }
        }, 'seg_1059');

    private send_msg = ({ type, img_url }: { type: string; img_url: string }): void =>
        err(() => {
            ext.send_msg({
                msg: 'run_img_action',
                type,
                img_url,
            });
        }, 'seg_1060');
}

export const Action = Class.get_instance();
