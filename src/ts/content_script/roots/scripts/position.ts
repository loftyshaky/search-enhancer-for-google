import { Suffix } from 'shared/internal';
import {
    s_el_parser,
    s_roots,
} from 'content_script/internal';

export class Position {
    private static i0: Position;

    public static i(): Position {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public offset_1_cls: string = new Suffix('offset_1').result;
    public offset_2_cls: string = new Suffix('offset_2').result;

    public position_title_el = (): void => err(() => { // needed because in some cases icons go outside container. ex: https://www.google.com/search?q=infinite+scroll&oq=infinite&aqs=chrome.4.69i57j46j0j46j0j69i61j69i60l2.7170j0j1&sourceid=chrome&ie=UTF-8
        this.remove_offset_classes();

        s_el_parser.Main.i().title_els.forEach((title_el): void => err(() => {
            s_roots.Main.i().apply_root_parent_cls_to_title_el({ title_el });

            if (
                data.settings.show_favicons
                && data.settings.show_server_locations
            ) {
                x.add_cls(
                    title_el,
                    this.offset_2_cls,
                );
            } else if (
                (
                    data.settings.show_favicons
                        && !data.settings.show_server_locations
                ) || (
                    !data.settings.show_favicons
                        && data.settings.show_server_locations
                )
            ) {
                x.add_cls(
                    title_el,
                    this.offset_1_cls,
                );
            }
        },
        'ges_1084'));
    },
    'ges_1085');

    public remove_offset_classes = (): void => err(() => { // needed because in some cases icons go outside container. ex: https://www.google.com/search?q=infinite+scroll&oq=infinite&aqs=chrome.4.69i57j46j0j46j0j69i61j69i60l2.7170j0j1&sourceid=chrome&ie=UTF-8
        x.remove_cls(
            s_el_parser.Main.i().title_els,
            s_roots.Position.i().offset_1_cls,
        );
        x.remove_cls(
            s_el_parser.Main.i().title_els,
            s_roots.Position.i().offset_2_cls,
        );
    },
    'ges_1086');
}
