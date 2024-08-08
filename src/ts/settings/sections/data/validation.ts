import { i_data } from '@loftyshaky/shared/shared';
import { d_inputs, i_inputs } from '@loftyshaky/shared/inputs';
import { d_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public validate_input = ({ input }: { input: i_inputs.Input }): boolean =>
        err(() => {
            const val: i_data.Val = d_inputs.Val.access({ input });

            if (typeof val === 'string') {
                if (input.name === 'img_downloads_dir') {
                    const dim: string = '/';
                    const windows_forbidden_chars = [':', '*', '?', '"', '<', '>', '|'];

                    if (d_sections.Val.os === 'win') {
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
                    return d_inputs.Val.validate_input({ input });
                } else {
                    return !/^1$|^0$|^(0\.[0-9]{1,2}|1\.00?)$/.test(val);
                }
            }

            return false;
        }, 'seg_1141');
}

export const Validation = Class.get_instance();
