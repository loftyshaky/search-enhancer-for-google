import { d_color } from '@loftyshaky/shared/inputs';
import { s_suffix } from 'shared/internal';

export class Spinner {
    private static i0: Spinner;

    public static i(): Spinner {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public set_color = (): void =>
        err(() => {
            const spinner = s<HTMLElement>(`.${new s_suffix.Main('spinner').result}`);

            if (n(spinner) && n(spinner.shadowRoot)) {
                const spinner_color: string = d_color.Color.i().access_from_val({
                    val: data.settings.spinner_color,
                });

                x.dynamic_css(
                    spinner.shadowRoot,
                    'spinner_keyframes',
                    `@keyframes bounce_spinner {0% {transform: scale(1);background-color: ${spinner_color};}100% {transform: scale(0.3);background-color: #ffffff;}`,
                );
            }
        }, 'ges_1154');
}
