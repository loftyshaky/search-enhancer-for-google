import {
    makeObservable,
    observable,
    action,
    runInAction,
} from 'mobx';

import { Suffix } from 'shared/internal';
import {
    s_el_parser,
    s_actions,
    u_side_panel,
} from 'content_script/internal';

export class Iframe {
    private static i0: Iframe;

    public static i(): Iframe {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                inserting_iframe: observable,
                insert: action,
            },
        );
    }

    public iframes: HTMLIFrameElement[] = [];
    public last_iframe: HTMLIFrameElement | undefined;
    private cur_iframe_i: number= 0;
    public inserting_iframe: boolean = false;
    private search_results_w_selector: string = '#search';

    public insert = (): void => err(() => {
        if (
            !this.inserting_iframe
            && n(s_el_parser.Main.i().next_page_href)
        ) {
            this.inserting_iframe = true;

            const loading_first_iframe: boolean = !n(this.last_iframe);
            const el_to_append_iframe_to = loading_first_iframe
                ? s<HTMLElement>(`.${new Suffix('spinner').result}`)
                : this.last_iframe;

            this.last_iframe = x.create(
                'iframe',
                x.cls([
                    new Suffix('iframe').result,
                    new Suffix('hidden').result,
                    new Suffix('opacity_0').result,
                ]),
            );

            this.iframes.push(this.last_iframe);

            this.last_iframe.src = s_el_parser.Main.i().next_page_href!;

            x[loading_first_iframe
                ? 'before'
                : 'after'](
                el_to_append_iframe_to,
                this.last_iframe,
            );

            this.last_iframe.addEventListener(
                'load',
                (): void => err(() => {
                    this.hide_everything_from_iframe_except_search_results();
                    this.observe_iframe_resizing({ cur_iframe_i: this.cur_iframe_i });

                    s_el_parser.Main.i().get_next_page_href();

                    if (this.last_iframe) {
                        const iframe_doc: Document | null = this.last_iframe.contentDocument;

                        if (n(iframe_doc)) {
                            x.css(
                                'content_script_css',
                                iframe_doc.head,
                            );
                            const css = x.css(
                                'iframe_inner',
                                iframe_doc.head,
                            );

                            if (n(css)) {
                                css.addEventListener(
                                    'load',
                                    (): void => err(() => {
                                        x.remove_cls(
                                            this.last_iframe,
                                            new Suffix('hidden').result,
                                        );
                                        x.remove_cls(
                                            this.last_iframe,
                                            new Suffix('opacity_0').result,
                                        );

                                        s_actions.Main.i().run_reload_actions();

                                        this.resize_iframe({ cur_iframe_i: this.cur_iframe_i });

                                        this.cur_iframe_i += 1;

                                        u_side_panel.Page.i().set_total();

                                        runInAction(() => {
                                            this.inserting_iframe = false;
                                        });
                                    },
                                    1062),
                                );
                            }
                        }
                    }
                },
                1062),
            );
        }
    },
    1058);

    public get_iframe_doc = (
        { cur_iframe_i }: { cur_iframe_i?: number } = {},
    ): Document | undefined => err(() => {
        if (n(this.last_iframe)) {
            const iframe_doc: Document | null = n(cur_iframe_i)
                ? this.iframes[cur_iframe_i].contentDocument
                : this.last_iframe.contentDocument;

            if (n(iframe_doc)) {
                return iframe_doc;
            }
        }

        return undefined;
    },
    1063);

    private observe_iframe_resizing = (
        { cur_iframe_i }: { cur_iframe_i: number },
    ): void => err(() => {
        const iframe_doc: Document | undefined = this.get_iframe_doc({ cur_iframe_i });

        if (n(iframe_doc)) {
            const search_results_w = sb<HTMLElement>(
                iframe_doc.body!,
                this.search_results_w_selector,
            );

            const resize_observer: any = new ResizeObserver((): void => {
                this.resize_iframe({ cur_iframe_i });
            });

            resize_observer.observe(search_results_w);
        }
    },
    1059);

    private resize_iframe = (
        { cur_iframe_i }: { cur_iframe_i: number },
    ): Promise<void> => err_async(async () => {
        const cur_iframe: HTMLIFrameElement = this.iframes[cur_iframe_i];
        const iframe_doc: Document | undefined = this.get_iframe_doc({ cur_iframe_i });

        if (n(iframe_doc)) {
            cur_iframe.style.height = '';
            // eslint-disable-next-line no-unused-expressions
            cur_iframe.offsetWidth;
            cur_iframe.style.height = `${iframe_doc.body.scrollHeight}px`;
        }
    },
    1066);

    private hide_everything_from_iframe_except_search_results = (): void => err(() => {
        const iframe_doc: Document | undefined = this.get_iframe_doc();

        if (n(iframe_doc)) {
            const search_results_w = sb<HTMLElement>(
                iframe_doc.body!,
                this.search_results_w_selector,
            );
            const els = sab<HTMLElement>(
                iframe_doc.body,
                '*',
            );

            if (n(els)) {
                [...els].forEach((el: HTMLElement): void => err(
                    () => {
                        if (
                            !el.contains(search_results_w!)
                            && !x.closest(
                                el,
                                this.search_results_w_selector,
                            )
                        ) {
                            x.add_cls(
                                el,
                                'none',
                            );
                        }
                    },
                    1061,
                ));
            }
        }
    },
    1060);
}
