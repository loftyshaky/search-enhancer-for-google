import { CssVars as CssVarsShared } from '@loftyshaky/shared';

export class CssVars {
    private static i0: CssVars;

    public static i(): CssVars {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public set = (): void => err(() => {
        const roots = [
            'settings',
            'content_script',
        ].includes(page)
            ? [document.documentElement]
            : [];

        CssVarsShared.i().set_transition_vars(
            {
                roots,
                transition_duration: data.settings.transition_duration,
            },
        );

        CssVarsShared.i().set_var(
            {
                roots,
                name: 'offset_from_header',
                val: '147px',
            },
        );
    },
    'ges_1120');
}
