import { Utils } from '@loftyshaky/shared';
import {
    o_inputs,
    o_color,
} from '@loftyshaky/shared/inputs';
import { d_settings as d_sections_shared } from '@loftyshaky/shared/settings';

export class Main {
    private static i0: Main;

    public static get i() {
        if (!this.i0) {
            this.i0 = new this();

            this.i0.sections = Utils.i.to_object({ arr: this.i0.sections });
            this.i0.sections.settings.inputs = Utils.i.to_object({
                arr: this.i0.sections.settings.inputs,
                section: 'settings',
            });
            this.i0.sections.links.inputs = Utils.i.to_object({
                arr: this.i0.sections.links.inputs,
                section: 'links',
            });
        }

        return this.i0;
    }

    public sections: any = [
        ...[new o_inputs.Section({
            name: 'settings',
            inputs: [new o_color.Color({
                name: 'keyword_color',
                event_callback: () => undefined,
                select_palette_color_callback: () => undefined,
                hide_color_help_callback: () => undefined,
            })],
        })],
        ...d_sections_shared.Sections.i.make_shared_sections(
            {
                download_back_up_callback: (): undefined => undefined,
                upload_back_up_callback: (): undefined => undefined,
                restore_defaults_callback: (): undefined => undefined,
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
