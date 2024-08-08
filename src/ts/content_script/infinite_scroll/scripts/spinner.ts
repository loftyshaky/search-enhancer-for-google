import { d_color } from '@loftyshaky/shared/inputs';
import { s_suffix } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_color = (): void =>
        err(() => {
            const spinner = s<HTMLElement>(`.${new s_suffix.Suffix('spinner').result}`);

            if (n(spinner) && n(spinner.shadowRoot)) {
                const spinner_color: string = d_color.Color.access_from_val({
                    val: data.settings.spinner_color,
                });

                x.dynamic_css(
                    spinner.shadowRoot,
                    'spinner_keyframes',
                    `@keyframes bounce_spinner {0% {transform: scale(1);background-color: ${spinner_color};}100% {transform: scale(0.3);background-color: #ffffff;}`,
                );
            }
        }, 'seg_1081');
}

export const Spinner = Class.get_instance();
