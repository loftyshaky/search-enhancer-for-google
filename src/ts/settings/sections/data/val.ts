import { i_color as i_color_loftyshaky_color, i_data } from '@loftyshaky/shared/shared';
import { o_color, d_inputs, d_color, i_color, i_inputs } from '@loftyshaky/shared/inputs';
import { s_sections } from '@loftyshaky/shared/settings';
import { d_data, s_css_vars } from 'shared_clean/internal';
import { d_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {
        this.get_os();
    }

    public os: string = '';

    public get_os = (): Promise<void> =>
        err_async(async () => {
            const platform_info = await we.runtime.getPlatformInfo();

            this.os = platform_info.os;
        }, 'seg_1136');

    public change = ({ input, i }: { input: i_inputs.Input; i?: i_color.I }): Promise<void> =>
        err_async(async () => {
            let val: i_data.Val;

            const set_val = (): Promise<void> =>
                err_async(async () => {
                    d_inputs.Val.set({
                        val,
                        input,
                    });

                    d_inputs.NestedInput.set_parent_disbled_vals({
                        input,
                        sections: d_sections.Sections.sections as i_inputs.Sections,
                    });

                    s_css_vars.CssVars.set();

                    await d_data.Manipulation.send_msg_to_update_settings({
                        settings: data.settings,
                        load_settings_content_script: true,
                    });
                }, 'seg_1137');

            if (input.type === 'color' && n(i)) {
                val = d_color.Color.access({
                    input,
                    i,
                });
            } else {
                val = d_inputs.Val.access({ input });
            }

            if (input.type === 'text') {
                if (!d_sections.Validation.validate_input({ input })) {
                    await set_val();
                }
            } else if (input.type !== 'color' || i === 'main') {
                await set_val();

                s_sections.Theme.change({
                    input,
                    name: val as string,
                });
            } else if (n(i)) {
                const { colors } = data.settings.prefs;

                colors[i] = val;

                s_css_vars.CssVars.set();

                await d_data.Manipulation.send_msg_to_update_settings({
                    settings: {
                        prefs: {
                            ...data.settings.prefs,
                            colors,
                        },
                    },
                    load_settings: true,
                });
            }
        }, 'seg_1138');

    public remove_val = ({ input }: { input: i_inputs.Input }): Promise<void> =>
        err_async(async () => {
            this.change({ input });
        }, 'seg_1142');

    public save_selected_palette_color = ({
        input,
        i,
    }: {
        input: i_inputs.Input;
        i: i_color.I;
    }): Promise<void> =>
        err_async(async () => {
            await d_data.Manipulation.send_msg_to_update_settings({
                settings: {
                    prefs: {
                        ...data.settings.prefs,
                        [input.name]: i,
                    },
                },
                load_settings: true,
            });
        }, 'seg_1143');

    public remove_color_callback = ({ input }: { input: o_color.Color }): Promise<void> =>
        err_async(async () => {
            await d_data.Manipulation.send_msg_to_update_settings({
                settings: {
                    prefs: {
                        ...data.settings.prefs,
                        [input.name]: '',
                    },
                },
                load_settings: true,
            });
        }, 'seg_1144');

    public restore_default_palette_callback = ({
        default_colors,
    }: {
        default_colors: i_color_loftyshaky_color.Color[];
    }): Promise<void> =>
        err_async(async () => {
            await d_data.Manipulation.send_msg_to_update_settings({
                settings: {
                    prefs: {
                        ...data.settings.prefs,
                        colors: default_colors,
                    },
                },
                load_settings: true,
            });
        }, 'seg_1145');

    public enable_developer_mode_save_callback = (): Promise<void> =>
        err_async(async () => {
            await d_data.Manipulation.send_msg_to_update_settings({
                settings: {
                    prefs: {
                        ...data.settings.prefs,
                        developer_mode: data.settings.prefs.developer_mode,
                    },
                },
                load_settings: true,
            });
        }, 'seg_1210');
}

export const Val = Class.get_instance();
