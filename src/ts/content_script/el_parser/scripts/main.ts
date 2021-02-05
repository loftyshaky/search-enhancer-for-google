import _ from 'lodash';
import tinycolor from 'tinycolor2';

import { Suffix } from 'shared/internal';
import { s_infinite_scroll } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() { }

    private saturation_1 = 0.20;
    private saturation_2 = 0.30;
    private pseudo = ':not(#searchform *):not(.donut-container *)'; // searchform - Google Header; donut-container - web of trust
    public keyword_els: HTMLElement[] = [];
    public title_els: HTMLElement[] = [];
    public footer_el: HTMLElement | undefined = undefined;
    public hostnames: string[] = [];
    public next_page_href: string | undefined;
    public loaded_all_pages: boolean = false;

    public get_els = (): void => err(() => {
        this.get_keyword_els();
        this.get_title_els_and_hostnames();
        this.get_footer_el();
    },
    1018);

    private get_els_of_all_frames = (
        { selector }: { selector: string },
    ): any[] => err(() => {
        const base_els: (Document | HTMLIFrameElement)[] = [
            document,
            ...s_infinite_scroll.Iframe.i().iframes,
        ];
        let all_els: HTMLElement[] = [];

        base_els.forEach(
            (base_el: Document | HTMLIFrameElement): void => err(() => {
                const els = sab<HTMLElement>(
                    base_el.nodeType === 9
                        ? base_el
                        : (base_el as HTMLIFrameElement).contentDocument!,
                    selector,
                );

                if (n(els)) {
                    all_els = [
                        ...all_els,
                        ...els,
                    ];
                }
            },
            1068),
        );

        return all_els;
    },
    1067);

    private get_keyword_els = (): void => err(
        () => {
            const bold_els: HTMLElement[] = this.get_els_of_all_frames({ selector: `em${this.pseudo}, strong${this.pseudo}, b${this.pseudo}` });

            this.keyword_els.forEach((keyword_el: HTMLElement): void => err(
                () => {
                    x.remove_cls(
                        keyword_el,
                        new Suffix('keyword').result,
                    );
                },
                1052,
            ));

            this.keyword_els = bold_els.filter((el: HTMLElement): boolean => err(
                () => {
                    const color_hsv = this.get_el_hsv_color({
                        el,
                        key: 'color',
                    });

                    return (
                        color_hsv.s <= this.saturation_1
                            || color_hsv.s >= this.saturation_2
                    )
                            && this.text_is_bold({ el })
                            && this.check_if_el_has_immediate_text({ el });
                },
                1023,
            ));
        },
        1022,
    );

    private get_title_els_and_hostnames = (): void => err(() => {
        const links: HTMLLinkElement[] = this.get_els_of_all_frames({ selector: `a${this.pseudo}` });

        this.title_els = [];

        const filtered_links = links.filter((el: HTMLLinkElement): boolean => err(
            () => {
                const children = sab<HTMLElement>(
                    el,
                    `*${this.pseudo}`,
                );

                if (n(children)) {
                    return ([...children] as HTMLElement[]).some(
                        (el_2: HTMLElement): boolean => err(
                            () => {
                                const font_size: number = x.get_numeric_css_val(
                                    el_2,
                                    'font-size',
                                );
                                const color_hsv = this.get_el_hsv_color({
                                    el: el_2,
                                    key: 'color',
                                });

                                if (
                                    !x.matches(
                                        el_2,
                                        new Suffix('.icons').result,
                                    )
                                        && font_size >= 18
                                        && color_hsv.s >= this.saturation_2
                                        && !this.text_is_bold({ el: el_2 }) // ex (bold text after "Did you mean:"): https://www.google.com/search?q=jghj&oq=jghj&aqs=chrome.0.69i59j0i10l3j0j0i10i395l2j0i395l3.731j1j1&sourceid=chrome&ie=UTF-8
                                        && el_2.getBoundingClientRect().left <= 300
                                        && this.check_if_el_has_immediate_text({ el: el_2 })
                                ) {
                                    this.title_els.push(el_2);

                                    return true;
                                }

                                return false;
                            },
                            1021,
                        ),
                    );
                }

                return false;
            },
            1020,
        ));

        this.hostnames = filtered_links.map((el: HTMLLinkElement): string => err(
            () => new URL(el.href).hostname,
            1029,
        ));
    },
    1019);

    private get_footer_el = (): void => err(
        () => {
            this.footer_el = s<HTMLElement>('[role="contentinfo"]');
        },
        1053,
    );

    public get_next_page_href = (): void => err(() => {
        if (!this.loaded_all_pages) {
            const iframe_doc: Document | undefined = s_infinite_scroll.Iframe.i().get_iframe_doc();
            const page_btn_els = sab<HTMLLinkElement>(
                iframe_doc || document,
                '[href*="start="]',
            );

            if (n(page_btn_els)) {
                const next_page_el = _.last(page_btn_els);

                if (n(next_page_el)) {
                    const omnibox_start_val: number = this.get_page_val(
                        { next_page_href: window.location.href },
                    );
                    const next_start_val: number = this.get_page_val(
                        { next_page_href: next_page_el.href },
                    );
                    const previous_start_val: number = this.get_page_val(
                        { next_page_href: this.next_page_href },
                    );

                    if (
                        next_start_val > omnibox_start_val
                        && (
                            !n(this.next_page_href)
                            || next_start_val > previous_start_val
                        )
                    ) {
                        this.next_page_href = next_page_el.href;
                    } else {
                        this.loaded_all_pages = true;
                        this.next_page_href = undefined;
                    }
                }
            }
        }
    },
    1055);

    private check_if_el_has_immediate_text = ({ el }: { el: HTMLElement }): boolean => err(
        () => {
            const children: NodeListOf<ChildNode> = el.childNodes;

            return [...children].every((el_2: ChildNode): boolean => err(
                () => el_2.nodeType === Node.TEXT_NODE,
                1025,
            ));
        },
        1024,
    );

    private get_el_hsv_color = (
        {
            el,
            key,
        }: {
            el: HTMLElement;
            key: string
        },
    ): any => err(() => {
        const color_hex: string = x.get_css_val(
            el,
            key,
        );

        return tinycolor(color_hex).toHsv();
    },
    1026);

    private text_is_bold = ({ el }: { el: HTMLElement }): boolean => err(() => {
        const font_weight: number = x.get_numeric_css_val(
            el,
            'font-weight',
        );

        return (
            font_weight >= 600
            && font_weight <= 700
        );
    },
    1040);

    private get_page_val = (
        { next_page_href }: { next_page_href: string | undefined },
    ): number => err(() => {
        if (n(next_page_href)) {
            const match: RegExpMatchArray | null = next_page_href.match(/start=\d*/);

            if (n(match)) {
                return +match[0].replace(
                    /start=/,
                    '',
                );
            }
        }

        return 0;
    },
    1065);
}
