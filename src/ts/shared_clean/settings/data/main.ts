import { t, d_settings } from '@loftyshaky/shared/shared_clean';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public allow_rerun_actions = true;

    public change = ({ key, val }: { key: string; val: t.AnyUndefined }): Promise<void> =>
        err_async(async () => {
            this.allow_rerun_actions = false;

            await d_settings.Main.i().change({ key, val });
        }, 'seg_1165');
}
