import { i_color as i_color_loftyshaky_color, i_data } from '@loftyshaky/shared/shared';
import { o_color, d_inputs, d_color, i_color, i_inputs } from '@loftyshaky/shared/inputs';
import { s_settings } from '@loftyshaky/shared/settings';
import { s_css_vars } from 'shared_clean/internal';
import { d_sections } from 'settings/internal';

export class Val {
    private static i0: Val;

    public static i(): Val {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {
        this.get_os();
    }

    private os: string = '';

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
                    d_inputs.Val.i().set({
                        val,
                        input,
                    });

                    d_inputs.NestedInput.i().set_parent_disbled_vals({
                        input,
                        sections: d_sections.Main.i().sections as i_inputs.Sections,
                    });

                    s_css_vars.Main.i().set();

                    await ext.send_msg_resp({
                        msg: 'update_settings_background',
                        settings: data.settings,
                        rerun_actions_content_script: true,
                    });
                }, 'seg_1137');

            if (input.type === 'color' && n(i)) {
                val = d_color.Color.i().access({
                    input,
                    i,
                });
            } else {
                val = d_inputs.Val.i().access({ input });
            }

            if (input.type === 'text') {
                if (!this.validate_input({ input })) {
                    await set_val();
                }
            } else if (input.type !== 'color' || i === 'main') {
                await set_val();

                s_settings.Theme.i().change({
                    input,
                    name: val as string,
                });
            } else if (n(i)) {
                const { colors } = data.settings;

                colors[i] = val;

                s_css_vars.Main.i().set();

                await ext.send_msg_resp({
                    msg: 'update_settings_background',
                    settings: { colors },
                    rerun_actions: true,
                });
            }
        }, 'seg_1138');

    public validate_input = ({ input }: { input: i_inputs.Input }): boolean =>
        err(() => {
            const val: i_data.Val = d_inputs.Val.i().access({ input });

            if (typeof val === 'string') {
                if (input.name === 'img_downloads_dir') {
                    const dim: string = '/';
                    const windows_forbidden_chars = [':', '*', '?', '"', '<', '>', '|'];

                    if (this.os === 'win') {
                        const dir_path_has_forbidden_characters: boolean =
                            windows_forbidden_chars.some((char: string): boolean =>
                                err(() => val.includes(char), 'seg_1140'),
                            );

                        if (dir_path_has_forbidden_characters) {
                            return true;
                        }
                    }

                    const dir_path_contains_backslash = val.includes('\\');
                    const dir_path_is_only_dim = val === dim;
                    const first_character_in_dir_path_is_dim = val[0] === dim;
                    const last_character_in_dir_path_is_dim = val[val.length - 1] === dim;
                    const dim_repeat_reg = RegExp(`(${dim})\\1+`);
                    const dim_repeats_in_dir_path: boolean = dim_repeat_reg.test(val);

                    if (
                        dir_path_contains_backslash ||
                        dir_path_is_only_dim ||
                        first_character_in_dir_path_is_dim ||
                        last_character_in_dir_path_is_dim ||
                        dim_repeats_in_dir_path
                    ) {
                        return true;
                    }
                } else if (input.name === 'transition_duration') {
                    return d_inputs.Val.i().validate_input({ input });
                } else {
                    return !/^1$|^0$|^(0\.[0-9]{1,2}|1\.00?)$/.test(val);
                }
            }

            return false;
        }, 'seg_1141');

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
            await ext.send_msg_resp({
                msg: 'update_settings_background',
                settings: { [input.name]: i },
                rerun_actions: true,
            });
        }, 'seg_1143');

    public remove_color_callback = ({ input }: { input: o_color.Color }): Promise<void> =>
        err_async(async () => {
            await ext.send_msg_resp({
                msg: 'update_settings_background',
                settings: { [input.name]: '' },
                rerun_actions: true,
            });
        }, 'seg_1144');

    public restore_default_palette_callback = ({
        default_colors,
    }: {
        default_colors: i_color_loftyshaky_color.Color[];
    }): Promise<void> =>
        err_async(async () => {
            await ext.send_msg_resp({
                msg: 'update_settings_background',
                settings: { colors: default_colors },
                rerun_actions: true,
            });
        }, 'seg_1145');

    public enable_developer_mode_save_callback = (): Promise<void> =>
        err_async(async () => {
            await ext.send_msg_resp({
                msg: 'update_settings_background',
                settings: { developer_mode: data.settings.developer_mode },
                rerun_actions: true,
            });
        }, 'seg_1210');
}
