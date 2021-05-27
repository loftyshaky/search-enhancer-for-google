import {
    s_infinite_scroll,
    s_location,
} from 'content_script/internal';

export class ImgLinks {
    private static i0: ImgLinks;

    public static i(): ImgLinks {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() { }

    public bind_all = (): void => err(() => {
        if (
            n(s_infinite_scroll.Iframe.i().last_iframe)
            && n(s_infinite_scroll.Iframe.i().last_iframe!.contentDocument)
        ) {
            const img_links = sab<HTMLLinkElement>(
                s_infinite_scroll.Iframe.i().last_iframe!.contentDocument!,
                `a[href*="tbm=${s_location.Main.i().imgs_param_val}"]`,
            );

            x.bind(
                img_links,
                'click',
                this.open_img_link,
            );
        }
    },
    1130);

    private open_img_link = function (this: HTMLLinkElement): void {
        err(() => {
            window.top.location.href = this.href;
        },
        1129);
    };
}
