import { s_el_parser, i_img_action_bar } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public calculate_bottom = ({
        img_viewer_i,
    }: {
        img_viewer_i: i_img_action_bar.ImgViewerI;
    }): number =>
        err(() => {
            if (img_viewer_i !== 'main') {
                return (
                    s_el_parser.Main.i().preview_img_viewer_ws[img_viewer_i].offsetHeight -
                    s_el_parser.Main.i().preview_img_viewers[img_viewer_i].offsetHeight
                );
            }

            return 0;
        }, 'ges_1193');
}
