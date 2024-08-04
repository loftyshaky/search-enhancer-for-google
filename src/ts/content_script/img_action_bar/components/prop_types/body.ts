import { t } from '@loftyshaky/shared/shared';
import { i_img_action_bar } from 'content_script/internal';

export interface Body {
    img_viewer_i: i_img_action_bar.ImgViewerI;
    on_render?: t.CallbackVoid;
}
