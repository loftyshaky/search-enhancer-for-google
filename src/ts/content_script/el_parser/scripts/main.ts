import tinycolor from 'tinycolor2';

import { Suffix } from 'shared/internal';

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
    private font_weight_1 = 600;
    private font_weight_2 = 700;
    private pseudo = ':not(#searchform *):not(.donut-container *)'; // searchform - Google Header; donut-container - web of trust
    public keyword_els: HTMLElement[] = [];
    public title_els: HTMLElement[] = [];
    public hostnames: string[] = [];

    public get_els = (): void => err(() => {
        this.get_keyword_els();
        this.get_title_els_and_hostnames();
    },
    1018);

    private get_keyword_els = (): void => err(
        () => {
            const bold_els = sa<HTMLElement>(`em${this.pseudo}, strong${this.pseudo}, b${this.pseudo}`);

            if (n(bold_els)) {
                this.keyword_els = [...bold_els].filter((el: HTMLElement): boolean => err(
                    () => {
                        const color_hsv = this.get_el_hsv_color({ el });

                        return (
                            color_hsv.s <= this.saturation_1
                            || color_hsv.s >= this.saturation_2
                        )
                            && this.text_is_bold({ el })
                            && this.check_if_el_has_immediate_text({ el });
                    },
                    1023,
                ));
            }
        },
        1022,
    );

    private get_title_els_and_hostnames = (): void => err(() => {
        const links = sa<HTMLLinkElement>(`a${this.pseudo}`);

        if (n(links)) {
            this.title_els = [];

            const filtered_links = [...links].filter((el: HTMLLinkElement): boolean => err(
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
                                    const color_hsv = this.get_el_hsv_color({ el: el_2 });

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
        }
    },
    1019);

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

    private get_el_hsv_color = ({ el }: { el: HTMLElement }): any => err(() => {
        const color_hex: string = x.get_css_val(
            el,
            'color',
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
}
