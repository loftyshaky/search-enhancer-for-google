import _ from 'lodash';
import { browser, Runtime } from 'webextension-polyfill-ts';

import { d_inputs, o_color, d_color, i_inputs, i_color } from '@loftyshaky/shared/inputs';
import { s_settings } from '@loftyshaky/shared/settings';
import { CssVars } from 'shared/internal';
import { d_sections } from 'settings/internal';

export class Val {
    private static i0: Val;

    public static i(): Val {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {
        this.get_os();
    }

    private os: string = '';

    public get_os = (): Promise<void> =>
        err_async(async () => {
            const platform_info: Runtime.PlatformInfo = await browser.runtime.getPlatformInfo();

            this.os = platform_info.os;
        }, 'ges_1110');

    public change = _.debounce(
        ({ input, i }: { input: i_inputs.Input; i?: i_color.I }): Promise<void> =>
            err_async(async () => {
                let val: any;

                const set_val = (): Promise<void> =>
                    err_async(async () => {
                        d_inputs.Val.i().set({
                            val,
                            input,
                        });

                        await ext.send_msg_resp({
                            msg: 'update_settings',
                            settings: data.settings,
                        });
                    }, 'ges_1111');

                if (input.type === 'color' && n(i)) {
                    val = d_color.Color.i().access({
                        input,
                        i,
                    });
                } else {
                    val = d_inputs.Val.i().access({ input });
                }

                if (input.type === 'text') {
                    if (
                        !this.validate_input({ input }) ||
                        !d_inputs.Val.i().validate_input({ input })
                    ) {
                        await set_val();
                    }
                } else if (input.type !== 'color' || i === 'main') {
                    s_settings.Theme.i().change({
                        input,
                        val,
                    });

                    await set_val();
                } else if (n(i)) {
                    const { colors } = data.settings;

                    colors[i] = val;

                    await ext.send_msg_resp({
                        msg: 'update_settings',
                        settings: { colors },
                    });
                }

                d_inputs.NestedInput.i().set_parent_disbled_vals({
                    input,
                    sections: d_sections.Main.i().sections,
                });

                CssVars.i().set();

                ext.iterate_all_tabs({ msg: 'rerun_actions' });
            }, 'ges_1112'),
        200,
    );

    public validate_input = ({ input }: { input: i_inputs.Input }): boolean =>
        err(() => {
            const val: string = d_inputs.Val.i().access({ input });

            if (input.name === 'img_downloads_dir') {
                const dim: string = '/';
                const windows_forbidden_chars = [':', '*', '?', '"', '<', '>', '|'];

                if (this.os === 'win') {
                    const dir_path_has_forbidden_characters: boolean = windows_forbidden_chars.some(
                        (char: string): boolean => err(() => val.includes(char), 'ges_1113'),
                    );

                    if (dir_path_has_forbidden_characters) {
                        return true;
                    }
                }

                const dir_path_contains_backslash = val.includes('\\');
                const dir_path_is_only_dim = val === dim;
                const first_character_in_dir_path_is_dim = val[0] === dim;
                const last_character_in_dir_path_is_dim = val[val.length - 1] === dim;
                const dim_repeat_reg: any = RegExp(`(${dim})\\1+`);
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
            } else {
                return !/^1$|^0$|^(0\.[0-9]{1,2}|1\.00?)$/.test(val);
            }

            return false;
        }, 'ges_1114');

    public remove_val = ({ input }: { input: i_inputs.Input }): Promise<void> =>
        err_async(async () => {
            this.change({ input });
        }, 'ges_1115');

    public save_selected_palette_color = ({
        input,
        i,
    }: {
        input: i_inputs.Input;
        i: i_color.I;
    }): Promise<void> =>
        err_async(async () => {
            await ext.send_msg_resp({
                msg: 'update_settings',
                settings: { [input.name]: i },
            });

            ext.iterate_all_tabs({ msg: 'rerun_actions' });
        }, 'ges_1116');

    public remove_color_callback = ({ input }: { input: o_color.Color }): Promise<void> =>
        err_async(async () => {
            await ext.send_msg_resp({
                msg: 'update_settings',
                settings: { [input.name]: '' },
            });

            ext.iterate_all_tabs({ msg: 'rerun_actions' });
        }, 'ges_1117');

    public restore_default_palette_callback = ({
        default_colors,
    }: {
        default_colors: any;
    }): Promise<void> =>
        err_async(async () => {
            await ext.send_msg_resp({
                msg: 'update_settings',
                settings: { colors: default_colors },
            });

            ext.iterate_all_tabs({ msg: 'rerun_actions' });
        }, 'ges_1118');
}
