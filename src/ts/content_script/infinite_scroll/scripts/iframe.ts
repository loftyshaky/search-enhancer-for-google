import { makeObservable, observable, action, runInAction } from 'mobx';

import { s_suffix } from 'shared/internal';
import {
    d_infinite_scroll,
    d_side_panel,
    s_actions,
    s_el_parser,
    s_infinite_scroll,
    s_location,
    s_roots,
    s_theme,
} from 'content_script/internal';

export class Iframe {
    private static i0: Iframe;

    public static i(): Iframe {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            inserting_iframe: observable,
            insert: action,
        });
    }

    public iframes: HTMLIFrameElement[] = [];
    public last_iframe: HTMLIFrameElement | undefined;
    private cur_iframe_i: number = 0;
    public inserting_iframe: boolean = false;
    private search_results_w_selector: string = s_location.Main.i().is_shopping_page
        ? '#rso'
        : '#search';

    private captcha_error_occurred_once: boolean = false;

    public insert = (): void =>
        err(() => {
            if (
                !this.captcha_error_occurred_once &&
                !this.inserting_iframe &&
                n(s_el_parser.Main.i().next_page_href)
            ) {
                this.inserting_iframe = true;

                const loading_first_iframe: boolean = !n(this.last_iframe);
                const el_to_append_iframe_to = loading_first_iframe
                    ? s<HTMLElement>(`.${new s_suffix.Main('spinner').result}`)
                    : this.last_iframe;
                const iframe_and_body_classes: string = x.cls([
                    new s_suffix.Main(s_location.Main.i().current_location).result,
                    loading_first_iframe ? new s_suffix.Main('first_inserted').result : undefined,
                ]);

                this.last_iframe = x.create(
                    'iframe',
                    x.cls([
                        new s_suffix.Main('iframe').result,
                        new s_suffix.Main('hidden').result,
                        new s_suffix.Main('opacity_0').result,
                        iframe_and_body_classes,
                    ]),
                );

                this.iframes.push(this.last_iframe);

                this.last_iframe.src = s_el_parser.Main.i().next_page_href!;

                x[loading_first_iframe ? 'before' : 'after'](
                    el_to_append_iframe_to,
                    this.last_iframe,
                );

                x.bind(this.last_iframe, 'load', (): void =>
                    err(() => {
                        const show_page = (): void => {
                            globalThis.requestAnimationFrame(
                                async (): Promise<void> =>
                                    err_async(async () => {
                                        s_actions.Main.i().run_reload_actions();

                                        if (this.last_iframe) {
                                            const iframe_doc: Document | null =
                                                this.last_iframe.contentDocument;

                                            if (n(iframe_doc)) {
                                                iframe_doc.body.className = x.cls([
                                                    iframe_doc.body.className,
                                                    iframe_and_body_classes,
                                                ]);

                                                await s_roots.Main.i().append_root({
                                                    name: 'separator',
                                                    parent: iframe_doc.body,
                                                    i: this.cur_iframe_i + 2,
                                                    append_f_name: 'as_first',
                                                });

                                                s_theme.Main.i().adapt_separator_to_dark_theme({
                                                    iframe_doc,
                                                });
                                            }
                                        }

                                        this.observe_iframe_resizing({
                                            cur_iframe_i: this.cur_iframe_i,
                                        });

                                        x.remove_cls(
                                            this.last_iframe,
                                            new s_suffix.Main('hidden').result,
                                        );
                                        x.remove_cls(
                                            this.last_iframe,
                                            new s_suffix.Main('opacity_0').result,
                                        );

                                        this.cur_iframe_i += 1;

                                        d_side_panel.Page.i().set_total();

                                        const is_last_page: boolean = !n(
                                            s_el_parser.Main.i().next_page_href,
                                        );

                                        s_infinite_scroll.ImgLinks.i().bind_all();

                                        if (is_last_page) {
                                            show_load_end_msg();
                                        }

                                        runInAction(() =>
                                            err(() => {
                                                this.inserting_iframe = false;
                                            }, 'seg_1065'),
                                        );
                                    }, 'seg_1066'),
                            );
                        };

                        const show_load_end_msg = (): void =>
                            err(() => {
                                d_infinite_scroll.LoadEndMsg.i().change_visibility({
                                    is_visible: true,
                                });
                            }, 'seg_1067');

                        this.captcha_error_occurred_once =
                            n(this.last_iframe) &&
                            n(this.last_iframe.contentDocument) &&
                            n(this.last_iframe.contentDocument.body.textContent) &&
                            this.last_iframe.contentDocument.body.textContent.length <= 2000;

                        if (this.captcha_error_occurred_once) {
                            this.captcha_error_occurred_once = true;

                            show_err_ribbon(err_obj('A captcha error occurred.'), 'seg_1068', {
                                silent: true,
                            });

                            runInAction(() =>
                                err(() => {
                                    this.inserting_iframe = false;
                                }, 'seg_1069'),
                            );

                            d_infinite_scroll.LoadEndMsg.i().change_type({ type: 'error' });
                            show_load_end_msg();
                        } else {
                            this.hide_everything_from_iframe_except_search_results();

                            s_el_parser.Main.i().get_next_page_href();

                            if (this.last_iframe) {
                                const iframe_doc: Document | null =
                                    this.last_iframe.contentDocument;

                                if (n(iframe_doc)) {
                                    x.css(
                                        'font_face',
                                        iframe_doc.head,
                                        new s_suffix.Main('font_face_link').result,
                                    );

                                    x.css('content_script_css', iframe_doc.head);
                                    const css = x.css('google_iframe_inner', iframe_doc.head);

                                    if (n(css)) {
                                        x.bind(css, 'load', show_page);
                                    }
                                }
                            }
                        }
                    }, 'seg_1070'),
                );
            }
        }, 'seg_1071');

    public get_iframe_doc = ({ cur_iframe_i }: { cur_iframe_i?: number } = {}):
        | Document
        | undefined =>
        err(() => {
            if (n(this.last_iframe)) {
                const iframe_doc: Document | null = n(cur_iframe_i)
                    ? this.iframes[cur_iframe_i].contentDocument
                    : this.last_iframe.contentDocument;

                if (n(iframe_doc)) {
                    return iframe_doc;
                }
            }

            return undefined;
        }, 'seg_1072');

    private observe_iframe_resizing = ({ cur_iframe_i }: { cur_iframe_i: number }): void =>
        err(() => {
            const iframe_doc: Document | undefined = this.get_iframe_doc({ cur_iframe_i });

            if (n(iframe_doc)) {
                const separator_root = sb<HTMLIFrameElement>(
                    iframe_doc.body,
                    `.${new s_suffix.Main('separator').result}`,
                );

                if (n(separator_root) && n(separator_root.shadowRoot)) {
                    const mutation_observer = new MutationObserver((): void => {
                        this.resize_iframe({ cur_iframe_i });
                    });

                    mutation_observer.observe(separator_root.shadowRoot, {
                        childList: true,
                        subtree: true,
                        attributes: true,
                    });
                }

                const search_results_w = sb<HTMLElement>(
                    iframe_doc.body,
                    this.search_results_w_selector,
                );

                const resize_observer = new ResizeObserver((): void => {
                    this.resize_iframe({ cur_iframe_i });
                });

                if (n(search_results_w)) {
                    resize_observer.observe(search_results_w);
                }
            }
        }, 'seg_1073');

    private resize_iframe = ({ cur_iframe_i }: { cur_iframe_i: number }): Promise<void> =>
        err_async(async () => {
            const scroll_top = document.documentElement.scrollTop;
            const cur_iframe: HTMLIFrameElement = this.iframes[cur_iframe_i];
            const iframe_doc: Document | undefined = this.get_iframe_doc({ cur_iframe_i });

            await globalThis.requestAnimationFrame(
                async (): Promise<void> =>
                    err_async(async () => {
                        cur_iframe.style.height = '';

                        await globalThis.requestAnimationFrame(
                            (): Promise<void> =>
                                err(async () => {
                                    await x.delay(0);

                                    runInAction(() => {
                                        if (n(iframe_doc)) {
                                            cur_iframe.style.height = `${iframe_doc.documentElement.scrollHeight}px`;
                                            iframe_doc.documentElement.scrollTop = 0;
                                            document.documentElement.scrollTop = scroll_top;
                                        }
                                    });
                                }, 'seg_1168'),
                        );
                    }, 'seg_1169'),
            );
        }, 'seg_1074');

    private hide_everything_from_iframe_except_search_results = (): void =>
        err(() => {
            const iframe_doc: Document | undefined = this.get_iframe_doc();

            if (n(iframe_doc)) {
                const search_results_w = sb<HTMLElement>(
                    iframe_doc.body,
                    this.search_results_w_selector,
                );
                const els = sab<HTMLElement>(iframe_doc.body, '*');

                if (n(els)) {
                    [...els].forEach((el: HTMLElement): void =>
                        err(() => {
                            if (
                                n(search_results_w) &&
                                !el.contains(search_results_w) &&
                                !x.closest(el, this.search_results_w_selector)
                            ) {
                                x.add_cls(el, 'none');
                            }
                        }, 'seg_1075'),
                    );
                }
            }
        }, 'seg_1076');

    public get_content_document = ({
        base_el,
    }: {
        base_el: HTMLIFrameElement;
    }): Document | undefined =>
        err(() => {
            if (n(base_el.contentDocument)) {
                return base_el.contentDocument;
            }

            return undefined;
        }, 'seg_1077');
}
