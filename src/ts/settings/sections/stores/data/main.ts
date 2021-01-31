import { Utils } from '@loftyshaky/shared';
import {
    o_inputs,
    o_color,
} from '@loftyshaky/shared/inputs';
import { d_settings } from '@loftyshaky/shared/settings';
import { d_shared } from 'shared/internal';
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

    public sections: any = [
        ...[new o_inputs.Section({
            name: 'settings',
            inputs: [
                new o_inputs.Checkbox({
                    name: 'show_favicons',
                    event_callback: d_sections.Val.i().change,
                }),
                new o_inputs.Checkbox({
                    name: 'show_server_locations',
                    event_callback: d_sections.Val.i().change,
                }),
                new o_inputs.Checkbox({
                    name: 'show_scroll_to_top_button',
                    event_callback: d_sections.Val.i().change,
                }),
                new o_color.Color({
                    name: 'keyword_color',
                    event_callback: d_sections.Val.i().change,
                    select_palette_color_callback: d_sections.Val.i().save_selected_palette_color,
                    hide_color_help_callback: d_sections.Visibility.i().hide_color_help,
                }),
            ],
        })],
        ...d_settings.Sections.i().make_shared_sections(
            {
                download_back_up_callback: ext.storage_get,
                upload_back_up_callback: d_shared.Data.i().restore_back_up,
                restore_defaults_callback: () => d_shared.Data.i().restore_confirm(),
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