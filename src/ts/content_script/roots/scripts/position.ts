import { s_suffix } from 'shared_clean/internal';
import { s_el_parser, s_roots } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public offset_1_cls: string = new s_suffix.Suffix('offset_1').result;
    public offset_2_cls: string = new s_suffix.Suffix('offset_2').result;

    public position_title_el = (): void =>
        err(() => {
            s_el_parser.ElParser.title_els.forEach((title_el): void =>
                err(() => {
                    s_roots.Roots.apply_root_parent_cls_to_title_el({ title_el });

                    this.remove_offset_classes({ title_el });

                    if (
                        data.settings.prefs.favicons_is_visible &&
                        data.settings.prefs.server_locations_is_visible
                    ) {
                        x.add_cls(title_el, this.offset_2_cls);
                    } else if (
                        (data.settings.prefs.favicons_is_visible &&
                            !data.settings.prefs.server_locations_is_visible) ||
                        (!data.settings.prefs.favicons_is_visible &&
                            data.settings.prefs.server_locations_is_visible)
                    ) {
                        x.add_cls(title_el, this.offset_1_cls);
                    }
                }, 'seg_1100'),
            );
        }, 'seg_1101');

    private remove_offset_classes = ({ title_el }: { title_el: HTMLElement }): void =>
        err(() => {
            // needed when changing facvicons/server locatiions display settings.
            x.remove_cls(title_el, this.offset_1_cls);
            x.remove_cls(title_el, this.offset_2_cls);
        }, 'seg_1102');
}

export const Position = Class.get_instance();
