import _ from 'lodash';
import tinycolor from 'tinycolor2';

import { t, s_viewport } from '@loftyshaky/shared';
import { s_env, s_suffix } from 'shared/internal';
import {
    s_icons,
    s_infinite_scroll,
    s_location,
    s_text_dir,
    i_img_action_bar,
} from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private pseudo = ':not(#searchform *):not(.donut-container *)'; // searchform - Google Header; donut-container - web of trust
    public keyword_els: HTMLElement[] = [];
    public title_els: HTMLElement[] = [];
    public footer_el: HTMLElement | undefined = undefined;
    public related_searches_el: HTMLElement | undefined = undefined;
    public pagination_el: HTMLElement | undefined = undefined;
    public img_viewer: HTMLLinkElement | undefined = undefined;
    public img_viewer_w: HTMLElement | undefined = undefined;
    public preview_img_viewers: HTMLElement[] = [];
    public preview_img_viewer_ws: HTMLElement[] = [];
    public hostnames: string[] = [];
    public hrefs: string[] = [];
    public next_page_href: string | undefined;
    public img_data: t.AnyRecord[] = [];
    public loaded_all_pages: boolean = false;
    public search_result_body: HTMLElement | undefined = undefined;
    private attempted_to_acquire_img_data: boolean = false;

    public get_els = (): void =>
        err(() => {
            this.get_keyword_els();
            this.get_title_els_and_hostnames();
            this.get_footer_el();
            this.get_related_searches_el();
            this.get_pagination_el();
            this.get_img_viewer();
            this.get_img_viewer_w();
            this.get_preview_img_viewers();
            this.get_img_data();
            this.get_search_result_body();

            if (s_env.Main.i().is_dev() && s_location.Main.i().is_imgs_page) {
                l('preview_img_viewers:', this.preview_img_viewers, 'img_data:', this.img_data);
            }
        }, 'ges_1022');

    private get_els_of_all_frames = ({ selector }: { selector: string }): HTMLElement[] =>
        err(() => {
            const base_els: (Document | HTMLIFrameElement)[] = [
                document,
                ...s_infinite_scroll.Iframe.i().iframes,
            ];
            let all_els: HTMLElement[] = [];

            base_els.forEach((base_el: Document | HTMLIFrameElement): void =>
                err(() => {
                    const els = sab<HTMLElement>(
                        base_el.nodeType === 9
                            ? base_el
                            : s_infinite_scroll.Iframe.i().get_content_document({
                                  base_el: base_el as HTMLIFrameElement,
                              }),
                        selector,
                    );

                    if (n(els)) {
                        all_els = [...all_els, ...els];
                    }
                }, 'ges_1023'),
            );

            return all_els;
        }, 'ges_1024');

    private get_keyword_els = (): void =>
        err(() => {
            const bold_els: HTMLElement[] = this.get_els_of_all_frames({
                selector: `em${this.pseudo}, strong${this.pseudo}, b${this.pseudo}`,
            });

            this.keyword_els.forEach((keyword_el: HTMLElement): void =>
                err(() => {
                    x.remove_cls(keyword_el, new s_suffix.Main('keyword').result);
                }, 'ges_1025'),
            );

            this.keyword_els = bold_els.filter((el: HTMLElement): boolean =>
                err(
                    () => this.text_is_bold({ el }) && this.check_if_el_has_immediate_text({ el }),
                    // additional search results under search result (in blue). Ex: https://www.google.com/search?q=javascript+stack+overflow+declare+variable
                    'ges_1026',
                ),
            );
        }, 'ges_1027');

    private get_title_els_and_hostnames = (): void =>
        err(() => {
            const links: HTMLElement[] = this.get_els_of_all_frames({
                selector: `a${this.pseudo}`,
            });
            const filtered_links: HTMLLinkElement[] = [];
            this.title_els = [];
            const viewport_width: number = s_viewport.Main.i().get_dim({ dim: 'width' });

            links.forEach((el: HTMLElement): boolean =>
                err(() => {
                    const children = sab<HTMLElement>(el, `*${this.pseudo}`);

                    if (n(children)) {
                        ([...children] as HTMLElement[]).forEach((el_2: HTMLElement): void =>
                            err(() => {
                                const font_size: number = x.get_numeric_css_val(el_2, 'font-size');
                                const news_icon_selector: string = 'g-img';

                                if (
                                    !x.matches(el_2, `.${new s_suffix.Main('icons').result}`) &&
                                    ((s_location.Main.i().is_news_page &&
                                        el_2.offsetHeight <= 40 &&
                                        el_2.firstElementChild &&
                                        (x.matches(
                                            el_2.firstElementChild as HTMLElement,
                                            news_icon_selector,
                                        ) ||
                                            x.matches(
                                                // eslint-disable-next-line max-len
                                                el_2.firstElementChild
                                                    .nextElementSibling as HTMLElement,
                                                news_icon_selector,
                                            ))) ||
                                        (!s_location.Main.i().is_non_standard_search_results &&
                                            font_size >= 18 &&
                                            !this.text_is_bold({ el: el_2 }) && // ex (bold text after "Did you mean:"): https://www.google.com/search?q=jghj&oq=jghj&aqs=chrome.0.     69i59j0i10l3j0j0i10i395l2j0i395l3.731j1j1&sourceid=chrome&ie=UTF-8
                                            ((s_text_dir.Main.i().dir === 'ltr' &&
                                                el_2.getBoundingClientRect().left <= 300) ||
                                                (s_text_dir.Main.i().dir === 'rtl' &&
                                                    viewport_width -
                                                        el_2.getBoundingClientRect().right <=
                                                        300)) &&
                                            ((!s_location.Main.i().is_news_page &&
                                                /H[0-6]/.test(el_2.tagName) &&
                                                !el_2.hasAttribute('role')) || // !el_2.hasAttribute('role')) === not "Images for ..."
                                                (s_location.Main.i().is_news_page &&
                                                    this.check_if_el_has_immediate_text({
                                                        el: el_2,
                                                    }))) &&
                                            n((el as HTMLLinkElement).href) &&
                                            (el as HTMLLinkElement).href))
                                ) {
                                    filtered_links.push(el as HTMLLinkElement);
                                    this.title_els.push(el_2);
                                }
                            }, 'ges_1028'),
                        );
                    }

                    return false;
                }, 'ges_1029'),
            );

            this.hostnames = filtered_links.map((el: HTMLLinkElement): string =>
                err(() => new URL(el.href).hostname, 'ges_1030'),
            );
            this.hrefs = filtered_links.map((el: HTMLLinkElement): string =>
                err(() => el.href, 'ges_1031'),
            );

            s_icons.Main.i().prevent_titles_and_icons_from_wrapping({ filtered_links });
        }, 'ges_1032');

    private get_footer_el = (): void =>
        err(() => {
            this.footer_el = s<HTMLElement>('#footcnt');
        }, 'ges_1033');

    private get_related_searches_el = (): void =>
        err(() => {
            this.related_searches_el = s<HTMLElement>('#brs, #bres');
        }, 'ges_1034');

    private get_pagination_el = (): void =>
        err(() => {
            this.pagination_el = s<HTMLElement>('#xjs');
        }, 'ges_1035');

    public get_img_viewer = (): void =>
        err(() => {
            if (
                data.settings.img_viewer_img_action_bar_is_visible &&
                s_location.Main.i().is_imgs_page
            ) {
                const links = sa<HTMLLinkElement>('a[role="link"]');

                if (n(links)) {
                    this.img_viewer = [...links].find((link: HTMLLinkElement): boolean =>
                        err(() => {
                            const img = sb<HTMLImageElement>(link, 'img');

                            if (n(img)) {
                                return (
                                    Boolean(img.offsetWidth) && n(img.style) && n(img.style.height)
                                );
                            }

                            return false;
                        }, 'ges_1036'),
                    );
                }
            }
        }, 'ges_1037');

    public get_img_in_img_viewer = (): HTMLImageElement | undefined =>
        err(() => sb<HTMLImageElement>(this.img_viewer, 'img'), 'ges_1038');

    private get_img_viewer_w = (): void =>
        err(() => {
            if (
                data.settings.img_viewer_img_action_bar_is_visible &&
                s_location.Main.i().is_imgs_page
            ) {
                const parents: HTMLElement[] = [];

                if (n(this.img_viewer)) {
                    parents.push(this.img_viewer);

                    while (
                        this.img_viewer.getBoundingClientRect().bottom ===
                        _.last(parents)!.getBoundingClientRect().bottom
                    ) {
                        const last = _.last(parents);

                        if (n(last) && n(last.parentElement)) {
                            parents.push(last.parentElement);
                        }
                    }
                }

                this.img_viewer_w = parents[parents.length - 2];

                if (n(this.img_viewer_w)) {
                    this.img_viewer_w.dataset.img_viewer_i = 'main';
                }
            }
        }, 'ges_1172');

    public get_preview_img_viewers = (): void =>
        err(() => {
            if (
                data.settings.preview_img_viewer_img_action_bar_is_visible &&
                s_location.Main.i().is_imgs_page
            ) {
                const imgs = sa<HTMLDivElement>('.rg_i[data-iml], .rg_i[data-ils]');

                if (n(imgs)) {
                    this.preview_img_viewers = [];
                    this.preview_img_viewer_ws = [];

                    imgs.forEach((img): void =>
                        err(() => {
                            const link: HTMLLinkElement | undefined = x.closest(img, 'a');

                            if (n(link) && n(link.parentElement)) {
                                this.preview_img_viewers.push(link);
                                this.preview_img_viewer_ws.push(link.parentElement);

                                link.dataset.img_viewer_i = (
                                    this.preview_img_viewers.length - 1
                                ).toString();
                            }
                        }, 'ges_1191'),
                    );
                }
            }
        }, 'ges_1189');

    private get_img_data = (): void =>
        err(() => {
            if (!this.attempted_to_acquire_img_data) {
                this.attempted_to_acquire_img_data = true;

                if (s_location.Main.i().is_imgs_page) {
                    const script_els = sa<HTMLScriptElement>('script');

                    if (n(script_els)) {
                        const img_data_el: HTMLScriptElement | undefined = _.findLast(
                            script_els,
                            (script_el: HTMLScriptElement): boolean =>
                                script_el.innerHTML.startsWith('AF_initDataCallback'),
                        );

                        if (n(img_data_el)) {
                            const img_data_el_html: string = img_data_el.innerHTML;
                            const img_data_el_html_no_before: string = img_data_el_html.substring(
                                img_data_el_html.indexOf('[') - 0,
                            );
                            const img_data_el_html_no_after: string =
                                img_data_el_html_no_before.substring(
                                    0,
                                    img_data_el_html_no_before.lastIndexOf(']') + 1,
                                );

                            // eslint-disable-next-line prefer-destructuring
                            const img_data_initial = JSON.parse(img_data_el_html_no_after)[56];

                            // eslint-disable-next-line prefer-destructuring
                            this.img_data =
                                img_data_initial[
                                    img_data_initial.length === 1 ? 0 : img_data_initial.length - 1
                                ][0][0][1][0]; // array of image data that contains needed link to image

                            this.img_data = this.img_data.filter((not_used, i: number): boolean =>
                                err(
                                    () => n(this.get_preview_img_url({ img_viewer_i: i })),
                                    'ges_1192',
                                ),
                            );
                        }
                    }
                }
            }
        }, 'ges_1188');

    public get_search_result_body = (): void =>
        err(() => {
            this.search_result_body = s<HTMLElement>('#center_col');
        }, 'ges_1039');

    public get_next_page_href = (): void =>
        err(() => {
            if (!this.loaded_all_pages) {
                const iframe_doc: Document | undefined =
                    s_infinite_scroll.Iframe.i().get_iframe_doc();
                const page_btn_els = sab<HTMLLinkElement>(
                    iframe_doc || document,
                    '[href*="start="]',
                );

                if (n(page_btn_els)) {
                    const next_page_el = _.last(page_btn_els);

                    if (n(next_page_el)) {
                        const omnibox_start_val: number = this.get_page_val({
                            next_page_href: globalThis.location.href,
                        });
                        const next_start_val: number = this.get_page_val({
                            next_page_href: next_page_el.href,
                        });
                        const previous_start_val: number = this.get_page_val({
                            next_page_href: this.next_page_href,
                        });

                        if (
                            next_start_val > omnibox_start_val &&
                            (!n(this.next_page_href) || next_start_val > previous_start_val)
                        ) {
                            this.next_page_href = next_page_el.href;
                        } else {
                            this.loaded_all_pages = true;
                            this.next_page_href = undefined;
                        }
                    }
                }
            }
        }, 'ges_1040');

    private check_if_el_has_immediate_text = ({ el }: { el: HTMLElement }): boolean =>
        err(() => {
            const children: NodeListOf<ChildNode> = el.childNodes;

            return [...children].some((el_2: ChildNode): boolean =>
                err(
                    () =>
                        el_2.nodeType === Node.TEXT_NODE ||
                        x.matches(el_2 as HTMLElement, `.${new s_suffix.Main('icons').result}`),
                    'ges_1041',
                ),
            );
        }, 'ges_1042');

    public get_el_hsv_color = ({ el, key }: { el: HTMLElement; key: string }): t.AnyRecord =>
        err(() => {
            const color_hex: string = x.get_css_val(el, key);

            return tinycolor(color_hex).toHsv();
        }, 'ges_1043');

    private text_is_bold = ({ el }: { el: HTMLElement }): boolean =>
        err(() => {
            const font_weight: number = x.get_numeric_css_val(el, 'font-weight');

            return font_weight >= 600;
        }, 'ges_1044');

    private get_page_val = ({ next_page_href }: { next_page_href: string | undefined }): number =>
        err(() => {
            if (n(next_page_href)) {
                const match: RegExpMatchArray | null = next_page_href.match(/start=\d*/);

                if (n(match)) {
                    return +match[0].replace(/start=/, '');
                }
            }

            return 0;
        }, 'ges_1045');

    public get_preview_img_url = ({
        img_viewer_i,
    }: {
        img_viewer_i: i_img_action_bar.ImgViewerI;
    }): string | undefined =>
        err(() => {
            const data = _.get(this.img_data, `[${img_viewer_i}][0][0].444383007[1][3][0]`);

            if (typeof data === 'string') {
                return data; // link to image
            }

            return undefined;
        }, 'ges_1190');
}
