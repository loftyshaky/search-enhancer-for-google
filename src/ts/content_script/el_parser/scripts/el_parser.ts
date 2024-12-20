import last from 'lodash/last';
import get from 'lodash/get';
import tinycolor from 'tinycolor2';

import { t, s_viewport } from '@loftyshaky/shared/shared';
import { s_suffix } from 'shared_clean/internal';
import {
    s_icons,
    s_infinite_scroll,
    s_location,
    s_text_dir,
    i_img_action_bar,
} from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private pseudo = ':not(#searchform *):not(.donut-container *)'; // searchform - Google Header; donut-container - web of trust
    public keyword_els: HTMLElement[] = [];
    public title_els: HTMLElement[] = [];
    public favicon_els: (HTMLElement | undefined)[] = [];
    public footer_el: HTMLElement | undefined = undefined;
    public related_searches_el: HTMLElement | undefined = undefined;
    public more_results_btn: HTMLElement | undefined = undefined;
    public more_results_btn_spinner: HTMLElement | undefined = undefined;
    public pagination_el: HTMLElement | undefined = undefined;
    public page_els: HTMLElement[] = [];
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
    //  private attempted_to_acquire_img_data: boolean = false;

    public get_els = (): void =>
        err(() => {
            this.get_keyword_els();
            this.get_title_els_and_hostnames();
            this.get_footer_el();
            this.get_related_searches_el();
            this.get_more_results_btn();
            this.get_pagination_el();
            this.get_page_els();
            this.get_img_viewer();
            this.get_img_viewer_w();
            this.get_preview_img_viewers();
            this.get_img_data();
            this.get_search_result_body();
        }, 'seg_1022');

    private get_els_of_all_frames = ({ selector }: { selector: string }): HTMLElement[] =>
        err(() => {
            const base_els: (Document | HTMLIFrameElement)[] = [
                document,
                ...s_infinite_scroll.Iframe.iframes,
            ];
            let all_els: HTMLElement[] = [];

            base_els.forEach((base_el: Document | HTMLIFrameElement): void =>
                err(() => {
                    const els = sab<HTMLElement>(
                        base_el.nodeType === 9
                            ? base_el
                            : s_infinite_scroll.Iframe.get_content_document({
                                  base_el: base_el as HTMLIFrameElement,
                              }),
                        selector,
                    );

                    if (n(els)) {
                        all_els = [...all_els, ...els];
                    }
                }, 'seg_1023'),
            );

            return all_els;
        }, 'seg_1024');

    private get_keyword_els = (): void =>
        err(() => {
            const bold_els: HTMLElement[] = this.get_els_of_all_frames({
                selector: `em${this.pseudo}, strong${this.pseudo}, b${this.pseudo}`,
            });

            this.keyword_els.forEach((keyword_el: HTMLElement): void =>
                err(() => {
                    x.remove_cls(keyword_el, new s_suffix.Suffix('keyword').result);
                }, 'seg_1025'),
            );

            this.keyword_els = bold_els.filter((el: HTMLElement): boolean =>
                err(
                    () => this.text_is_bold({ el }) && this.check_if_el_has_immediate_text({ el }),
                    // additional search results under search result (in blue). Ex: https://www.google.com/search?q=javascript+stack+overflow+declare+variable
                    'seg_1026',
                ),
            );
        }, 'seg_1027');

    private get_title_els_and_hostnames = (): void =>
        err(() => {
            const links: HTMLElement[] = this.get_els_of_all_frames({
                selector: `a${this.pseudo}`,
            });
            const filtered_links: HTMLLinkElement[] = [];
            this.title_els = [];
            const viewport_width: number = s_viewport.Viewport.get_dim({ dim: 'width' });

            links.forEach((el: HTMLElement): boolean =>
                err(() => {
                    const children = sab<HTMLElement>(el, `*${this.pseudo}`);

                    if (n(children)) {
                        ([...children] as HTMLElement[]).forEach((el_2: HTMLElement): void =>
                            err(() => {
                                const font_size: number = x.get_numeric_css_val(el_2, 'font-size');
                                const news_icon_selector: string = 'g-img';

                                if (
                                    !x.matches(el_2, `.${new s_suffix.Suffix('icons').result}`) &&
                                    !n(el_2.getAttribute('aria-hidden')) &&
                                    ((s_location.Location.is_news_page &&
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
                                        (!s_location.Location.is_non_standard_search_results &&
                                            font_size >= 18 &&
                                            !this.text_is_bold({ el: el_2 }) && // ex (bold text after "Did you mean:"): https://www.google.com/search?q=jghj&oq=jghj&aqs=chrome.0.     69i59j0i10l3j0j0i10i395l2j0i395l3.731j1j1&sourceid=chrome&ie=UTF-8
                                            ((s_text_dir.TextDir.dir === 'ltr' &&
                                                el_2.getBoundingClientRect().left <= 300) ||
                                                (s_text_dir.TextDir.dir === 'rtl' &&
                                                    viewport_width -
                                                        el_2.getBoundingClientRect().right <=
                                                        300)) &&
                                            ((!s_location.Location.is_news_page &&
                                                /H[0-6]/.test(el_2.tagName) &&
                                                !el_2.hasAttribute('role')) || // !el_2.hasAttribute('role')) === not "Images for ..."
                                                (s_location.Location.is_news_page &&
                                                    this.check_if_el_has_immediate_text({
                                                        el: el_2,
                                                    }))) &&
                                            n((el as HTMLLinkElement).href) &&
                                            (el as HTMLLinkElement).href))
                                ) {
                                    filtered_links.push(el as HTMLLinkElement);
                                    this.title_els.push(el_2);
                                }
                            }, 'seg_1028'),
                        );
                    }

                    return false;
                }, 'seg_1029'),
            );

            this.hostnames = filtered_links.map((el: HTMLLinkElement): string =>
                err(() => new URL(el.href).hostname, 'seg_1030'),
            );
            this.hrefs = filtered_links.map((el: HTMLLinkElement): string =>
                err(() => el.href, 'seg_1031'),
            );

            this.get_favicon_els({ filtered_links });

            s_icons.icons.prevent_titles_and_icons_from_wrapping({ filtered_links });
        }, 'seg_1032');

    private get_favicon_els = ({ filtered_links }: { filtered_links: HTMLLinkElement[] }): void =>
        err(() => {
            const get_favicon = ({
                el,
            }: {
                el: HTMLElement | undefined | null;
            }): HTMLElement | undefined =>
                err(() => {
                    const parent = ru(el);

                    if (n(parent)) {
                        const el_width: number = parent.offsetWidth;
                        const el_height: number = parent.offsetHeight;

                        if (el_width === el_height && el_width >= 24) {
                            const favicon_cls: string = new s_suffix.Suffix('favicon').result;

                            if (!x.matches(parent, `.${favicon_cls}`)) {
                                x.add_cls(parent, favicon_cls);
                            }

                            return parent;
                        }
                    }

                    return undefined;
                }, 'seg_1216');

            const imgs: (HTMLImageElement | undefined)[] = filtered_links.map(
                (filtered_link: HTMLLinkElement): HTMLImageElement | undefined =>
                    err(() => sb(filtered_link, 'img, svg'), 'seg_1217'),
            );

            if (n(imgs)) {
                this.favicon_els = [...imgs].map(
                    (
                        img: HTMLImageElement | SVGGraphicsElement | undefined,
                    ): HTMLElement | undefined =>
                        err(() => {
                            if (n(img)) {
                                const rect = img.getBoundingClientRect();
                                const img_width: number = rect.width;
                                const img_height: number = rect.height;

                                if (
                                    img_width === img_height &&
                                    img_width >= 16 &&
                                    img_width <= 32 &&
                                    img.tagName === 'IMG'
                                ) {
                                    let parent = ru(
                                        img_width >= 20 && n(img.parentElement)
                                            ? img.parentElement.parentElement
                                            : img.parentElement,
                                    );
                                    let favicon: HTMLElement | undefined = get_favicon({
                                        el: parent,
                                    });

                                    if (n(favicon)) {
                                        return favicon;
                                    }

                                    while (n(parent) && parent.offsetHeight < 23) {
                                        favicon = get_favicon({ el: parent.parentElement });

                                        parent = ru(parent.parentElement);
                                    }

                                    return favicon;
                                }
                            }

                            return undefined;
                        }, 'seg_1215'),
                );
            }
        }, 'seg_1214');

    private get_footer_el = (): void =>
        err(() => {
            this.footer_el = s<HTMLElement>('#footcnt');
        }, 'seg_1033');

    private get_related_searches_el = (): void =>
        err(() => {
            this.related_searches_el = s<HTMLElement>('#brs, #bres');
        }, 'seg_1034');

    public get_more_results_btn = (): void =>
        err(() => {
            const more_results_svgs = sa<HTMLElement>(
                'path[d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"]',
            );

            if (n(more_results_svgs)) {
                more_results_svgs.forEach((svg: HTMLElement): void =>
                    err(() => {
                        this.more_results_btn = x.closest(svg, 'a');
                        this.more_results_btn_spinner = s(
                            '[style*="www.gstatic.com/ui/v2/activityindicator/mspin_googcolor_medium.svg"]',
                        );
                    }, 'seg_1224'),
                );
            }
        }, 'seg_1225');

    private get_pagination_el = (): void =>
        err(() => {
            this.pagination_el = s<HTMLElement>('#xjs');
        }, 'seg_1035');

    private get_page_els = (): void =>
        err(() => {
            const page_els = sa<HTMLElement>('[id^=arc-srp_]');

            if (n(page_els)) {
                this.page_els = [...page_els];
            }
        }, 'seg_1222');

    public get_img_viewer = (): void =>
        err(() => {
            if (
                data.settings.prefs.img_viewer_img_action_bar_is_visible &&
                s_location.Location.is_imgs_page
            ) {
                const links = sa<HTMLLinkElement>('a[role="link"]');

                if (n(links)) {
                    this.img_viewer = [...links].find((link: HTMLLinkElement): boolean =>
                        err(() => {
                            const img = sb<HTMLImageElement>(link, 'img');
                            const inside_div = sb<HTMLElement>(link, 'div');

                            if (n(img) && !n(inside_div)) {
                                return (
                                    Boolean(img.offsetWidth) && n(img.style) && n(img.style.height)
                                );
                            }

                            return false;
                        }, 'seg_1036'),
                    );
                }
            }
        }, 'seg_1037');

    public get_img_in_img_viewer = (): HTMLImageElement | undefined =>
        err(() => sb<HTMLImageElement>(this.img_viewer, 'img'), 'seg_1038');

    private get_img_viewer_w = (): void =>
        err(() => {
            if (
                data.settings.prefs.img_viewer_img_action_bar_is_visible &&
                s_location.Location.is_imgs_page
            ) {
                const parents: HTMLElement[] = [];

                if (n(this.img_viewer)) {
                    parents.push(this.img_viewer);

                    while (
                        this.img_viewer.getBoundingClientRect().bottom ===
                        last(parents)!.getBoundingClientRect().bottom
                    ) {
                        const last_2 = last(parents);

                        if (n(last_2) && n(last_2.parentElement)) {
                            parents.push(last_2.parentElement);
                        }
                    }
                }

                this.img_viewer_w = parents[parents.length - 2];

                if (n(this.img_viewer_w)) {
                    this.img_viewer_w.dataset.img_viewer_i = 'main_img_viewer';
                }
            }
        }, 'seg_1172');

    public get_preview_img_viewers = (): void =>
        err(() => {
            if (
                data.settings.prefs.preview_img_viewer_img_action_bar_is_visible &&
                s_location.Location.is_imgs_page
            ) {
                const imgs = sa<HTMLDivElement>('#rso [id^=dimg_]');

                if (n(imgs)) {
                    this.preview_img_viewers = [];
                    this.preview_img_viewer_ws = [];

                    imgs.forEach((img): void =>
                        err(() => {
                            const link: HTMLLinkElement | undefined = x.closest(img, 'g-img');

                            if (n(link) && n(link.parentElement)) {
                                this.preview_img_viewers.push(link);
                                this.preview_img_viewer_ws.push(link.parentElement);

                                link.dataset.img_viewer_i = (
                                    this.preview_img_viewers.length - 1
                                ).toString();
                            }
                        }, 'seg_1191'),
                    );
                }
            }
        }, 'seg_1189');

    private get_img_data = (): void =>
        err(() => {
            /*
            if (!this.attempted_to_acquire_img_data) {
                this.attempted_to_acquire_img_data = true;

                if (s_location.Main.is_imgs_page) {
                    const script_els = sa<HTMLScriptElement>('script');

                    if (n(script_els)) {
                        const img_data_el: HTMLScriptElement | undefined = findLast(
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
                                    'seg_1192',
                                ),
                            );
                        }
                    }
                }
            }
*/
        }, 'seg_1188');

    public get_search_result_body = (): void =>
        err(() => {
            this.search_result_body = s<HTMLElement>('#center_col');
        }, 'seg_1039');

    public get_next_page_href = (): void =>
        err(() => {
            if (!this.loaded_all_pages) {
                const iframe_doc: Document | undefined = s_infinite_scroll.Iframe.get_iframe_doc();
                const page_btn_els = sab<HTMLLinkElement>(
                    iframe_doc || document,
                    '[href*="start="]:not([ping])', // :not([ping]) - prevent selecting "Try without personalisation" link in the footer
                );

                if (n(page_btn_els)) {
                    const next_page_el = last(page_btn_els);

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
        }, 'seg_1040');

    private check_if_el_has_immediate_text = ({ el }: { el: HTMLElement }): boolean =>
        err(() => {
            const children: NodeListOf<ChildNode> = el.childNodes;

            return [...children].some((el_2: ChildNode): boolean =>
                err(
                    () =>
                        el_2.nodeType === Node.TEXT_NODE ||
                        x.matches(el_2 as HTMLElement, `.${new s_suffix.Suffix('icons').result}`),
                    'seg_1041',
                ),
            );
        }, 'seg_1042');

    public get_el_hsv_color = ({ el, key }: { el: HTMLElement; key: string }): t.AnyRecord =>
        err(() => {
            const color_hex: string = x.get_css_val(el, key);

            return tinycolor(color_hex).toHsv();
        }, 'seg_1043');

    private text_is_bold = ({ el }: { el: HTMLElement }): boolean =>
        err(() => {
            const font_weight: number = x.get_numeric_css_val(el, 'font-weight');

            return font_weight >= 600;
        }, 'seg_1044');

    private get_page_val = ({ next_page_href }: { next_page_href: string | undefined }): number =>
        err(() => {
            if (n(next_page_href)) {
                const match: RegExpMatchArray | null = next_page_href.match(/start=\d*/);
                if (n(match)) {
                    return +match[0].replace(/start=/, '');
                }
            }

            return 0;
        }, 'seg_1045');

    public get_preview_img_url = ({
        img_viewer_i,
    }: {
        img_viewer_i: i_img_action_bar.ImgViewerI;
    }): string | undefined =>
        err(() => {
            const data = get(this.img_data, `[${img_viewer_i}][0][0].444383007[1][3][0]`);

            if (typeof data === 'string') {
                return data; // link to image
            }

            return undefined;
        }, 'seg_1190');
}

export const ElParser = Class.get_instance();
