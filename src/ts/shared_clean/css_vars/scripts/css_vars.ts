import { s_css_vars } from '@loftyshaky/shared/shared_clean';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set = (): void =>
        err(() => {
            const roots = ['settings', 'content_script', 'dependencies'].includes(page)
                ? [document.documentElement]
                : [];

            s_css_vars.CssVars.set_transition_vars({
                roots,
                transition_duration: data.settings.transition_duration,
            });

            s_css_vars.CssVars.set_var({
                roots,
                name: 'offset_from_header',
                val: '193px',
            });
        }, 'seg_1147');
}

export const CssVars = Class.get_instance();
