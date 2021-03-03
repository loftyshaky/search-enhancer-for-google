import { Utils } from '@loftyshaky/shared';
import {
    o_inputs,
    o_color,
} from '@loftyshaky/shared/inputs';
import { d_settings } from '@loftyshaky/shared/settings';
import { d_sections } from 'settings/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        if (!this.i0) {
            this.i0 = new this();

            this.i0.sections = Utils.i().to_object({ arr: this.i0.sections });
            this.i0.sections.settings.inputs = Utils.i().to_object({
                arr: this.i0.sections.settings.inputs,
                section: 'settings',
            });
            this.i0.sections.links.inputs = Utils.i().to_object({
                arr: this.i0.sections.links.inputs,
                section: 'links',
            });
        }

        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private options: any = {
        side_panel_position: [
            new o_inputs.Option({ name: 'left' }),
            new o_inputs.Option({ name: 'right' }),
        ],
    }

    public sections: any = [
        ...[new o_inputs.Section({
            name: 'settings',
            inputs: [
                new o_inputs.Select({
                    name: 'side_panel_position',
                    options: this.options,
                    event_callback: d_sections.Val.i().change,
                }),
                new o_color.Color({
                    name: 'keyword_color',
                    event_callback: d_sections.Val.i().change,
                    select_palette_color_callback: d_sections.Val.i().save_selected_palette_color,
                    hide_color_help_callback: d_sections.Visibility.i().hide_color_help,
                    remove_color_callback: (
                        d_sections.Val.i().remove_color_callback
                    ),
                    restore_default_palette_callback: (
                        d_sections.Val.i().restore_default_palette_callback
                    ),
                }),
                new o_inputs.Checkbox({
                    name: 'enable_infinite_scrolling',
                    event_callback: d_sections.Val.i().change,
                }),
                new o_inputs.Checkbox({
                    name: 'show_enable_btn',
                    parent: 'enable_infinite_scrolling',
                    event_callback: d_sections.Val.i().change,
                }),
                new o_inputs.Checkbox({
                    name: 'show_jump_to_related_searches_btn',
                    parent: 'enable_infinite_scrolling',
                    event_callback: d_sections.Val.i().change,
                }),
                new o_inputs.Checkbox({
                    name: 'show_page_indicator',
                    parent: 'enable_infinite_scrolling',
                    event_callback: d_sections.Val.i().change,
                }),
                new o_inputs.Checkbox({
                    name: 'show_page_separators',
                    parent: 'enable_infinite_scrolling',
                    event_callback: d_sections.Val.i().change,
                }),
                new o_inputs.Checkbox({
                    name: 'show_favicons',
                    event_callback: d_sections.Val.i().change,
                }),
                new o_inputs.Checkbox({
                    name: 'show_server_locations',
                    event_callback: d_sections.Val.i().change,
                }),
                new o_inputs.Checkbox({
                    name: 'show_scroll_to_top_btn',
                    include_help: true,
                    alt_help_msg: ext.msg('scroll_to_top_title'),
                    event_callback: d_sections.Val.i().change,
                }),
            ],
        })],
        ...d_settings.Sections.i().make_shared_sections(
            {
                download_back_up_callback: ext.storage_get,
                upload_back_up_callback: d_sections.Restore.i().restore_back_up,
                restore_defaults_callback: () => d_sections.Restore.i().restore_confirm(),
            },
        ),
        ...[new o_inputs.Section({
            name: 'links',
            inputs: [
                new o_inputs.Link({
                    name: 'privacy_policy',
                    href: 'http://bit.ly/cws-privacy-policy',
                }),
                new o_inputs.Link({
                    name: 'rate',
                    browser: env.browser,
                    force_resolve: true,
                }),
                new o_inputs.Link({
                    name: 'help_translating',
                    href: 'https://bit.ly/help-translating',
                }),
                new o_inputs.Link({
                    name: 'facebook_page',
                    href: 'http://bit.ly/browservery',
                }),
                new o_inputs.Link({
                    name: 'support_page',
                    href: 'http://bit.ly/browservery-support',
                }),
            ],
        })],
    ]
}
