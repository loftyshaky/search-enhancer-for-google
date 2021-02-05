import { Viewport } from '@loftyshaky/shared';
import { s_infinite_scroll } from 'content_script/internal';

export class Scroll {
    private static i0: Scroll;

    public static i(): Scroll {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() { }

    public observe = (): void => err(() => {
        if (
            (document.body.scrollHeight - document.documentElement.scrollTop)
            <= (Viewport.i().get_dim({ dim: 'height' }))
        ) {
            s_infinite_scroll.Iframe.i().insert();
        }
    },
    1064);
}
