import tinycolor from 'tinycolor2';
import { s_keywords } from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static get i() {
        this.i0 = new this();

        return this.i0;
    }

    private saturation_1 = 0.20;
    private saturation_2 = 0.30;

    public run = (): void => err(
        () => {
            const keyword_els: HTMLElement[] = this.get_keyword_els();
            const title_els: HTMLElement[] = [];
            let hostnames: string[] = [];

            const get_title_els_and_hostnames = (): void => err(() => {
                const links = sa<HTMLLinkElement>('a');

                if (n(links)) {
                    const filtered_links = [...links].filter((el: HTMLLinkElement): boolean => err(
                        () => {
                            const children = sab<HTMLElement>(
                                el,
                                '*',
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
                                                font_size >= 18
                                                && color_hsv.s >= this.saturation_2
                                                && el_2.getBoundingClientRect().left <= 300
                                                && this.check_if_el_has_immediate_text({ el: el_2 })
                                            ) {
                                                title_els.push(el_2);

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

                    hostnames = filtered_links.map((el: HTMLLinkElement): string => err(
                        () => new URL(el.href).hostname,
                        1029,
                    ));
                }
            },
            1019);

            get_title_els_and_hostnames();

            s_keywords.Main.i.color_keywords({ keyword_els });
        },
        1018,
    );

    private get_keyword_els = (): HTMLElement[] => err(
        () => {
            const bold_els = sa<HTMLElement>('em, b, strong');

            if (n(bold_els)) {
                return [...bold_els].filter((el: HTMLElement): boolean => err(
                    () => {
                        const font_weight: number = x.get_numeric_css_val(
                            el,
                            'font-weight',
                        );

                        const color_hsv = this.get_el_hsv_color({ el });

                        return (
                            font_weight >= 600
                            || font_weight <= 700
                        )
                        && (
                            color_hsv.s <= this.saturation_1
                            || color_hsv.s >= this.saturation_2
                        );
                    },
                    1023,
                ));
            }

            return [];
        },
        1022,
    );

    private check_if_el_has_immediate_text = ({ el }: { el: HTMLElement }): boolean => err(
        () => {
            const children: NodeListOf<ChildNode> = el.childNodes;

            return [...children].some((el_2: ChildNode): boolean => err(
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
}
