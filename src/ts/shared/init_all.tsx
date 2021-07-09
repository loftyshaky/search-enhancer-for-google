import React from 'react';
import { render } from 'react-dom';

import {
    c_crash_handler,
    c_error,
    c_loading_screen,
    d_loading_screen,
    s_no_tr,
    s_tab_index,
    s_theme,
} from '@loftyshaky/shared';
import { d_inputs, i_inputs } from '@loftyshaky/shared/inputs';
import { d_settings, s_css_vars, s_suffix } from 'shared/internal';

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
declare let __webpack_public_path__: string;

export class InitAll {
    private static i0: InitAll;

    public static i(): InitAll {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public init = (): Promise<void> =>
        err_async(async () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            __webpack_public_path__ = we.runtime.getURL('');

            await d_settings.Main.i().set_from_storage();

            if (page === 'settings') {
                this.set_page_title();
            }

            s_css_vars.Main.i().set();

            const error_root: ShadowRoot = this.create_root({ prefix: 'error' }) as ShadowRoot;
            let loading_screen_root: ShadowRoot;
            let settings_root: HTMLDivElement;
            let spinner_root: ShadowRoot;
            let load_end_msg_root: ShadowRoot;
            let side_panel_root: ShadowRoot;

            if (page === 'settings') {
                loading_screen_root = this.create_root({ prefix: 'loading_screen' }) as ShadowRoot;
                settings_root = this.create_root({
                    prefix: 'settings',
                    shadow_root: false,
                }) as HTMLDivElement;
            } else if (page === 'content_script') {
                x.css('font_face', document.head, new s_suffix.Main('font_face_link').result);

                spinner_root = this.create_root({ prefix: 'spinner' }) as ShadowRoot;
                load_end_msg_root = this.create_root({ prefix: 'load_end_msg' }) as ShadowRoot;
                side_panel_root = this.create_root({ prefix: 'side_panel' }) as ShadowRoot;
            }

            const render_settings = (): Promise<void> =>
                err_async(async () => {
                    const { Body } = await import('settings/components/body');
                    const on_render = (): Promise<void> =>
                        err_async(async () => {
                            const { d_sections } = await import('settings/internal');

                            d_inputs.InputWidth.i().calculate_for_all_sections({
                                sections: d_sections.Main.i().sections as i_inputs.Sections,
                            });
                            d_inputs.InputWidth.i().set_max_width();

                            d_loading_screen.Main.i().hide();

                            s_tab_index.Main.i().bind_set_input_type_f();
                        }, 'ges_1122');

                    render(
                        <c_crash_handler.Body>
                            <Body />
                        </c_crash_handler.Body>,
                        settings_root,
                        (): void =>
                            err(() => {
                                const settings_css = x.css('settings_css', document.head);

                                s_theme.Main.i().set({
                                    name: data.settings.options_page_theme,
                                });

                                if (n(settings_css)) {
                                    x.bind(settings_css, 'load', on_render);
                                }
                            }, 'ges_1137'),
                    );
                }, 'ges_1123');

            const render_spinner = (): Promise<void> =>
                err_async(async () => {
                    const { c_infinite_scroll } = await import('content_script/internal');

                    render(
                        <c_crash_handler.Body>
                            <c_infinite_scroll.Spinner />
                        </c_crash_handler.Body>,
                        spinner_root,
                        (): void =>
                            err(() => {
                                x.css('spinner', spinner_root);
                            }, 'ges_1138'),
                    );
                }, 'ges_1124');

            const render_last_end_msg = (): Promise<void> =>
                err_async(async () => {
                    const { c_infinite_scroll } = await import('content_script/internal');

                    render(
                        <c_crash_handler.Body>
                            <c_infinite_scroll.LoadEndMsg />
                        </c_crash_handler.Body>,
                        load_end_msg_root,
                        (): void =>
                            err(() => {
                                x.css('load_end_msg', load_end_msg_root);
                            }, 'ges_1139'),
                    );
                }, 'ges_1125');

            const render_side_panel = (): Promise<void> =>
                err_async(async () => {
                    const { c_side_panel, s_location } = await import('content_script/internal');

                    if (s_location.Main.i().is_search_results) {
                        render(
                            <c_crash_handler.Body>
                                <c_side_panel.Body />
                            </c_crash_handler.Body>,
                            side_panel_root,
                            (): void =>
                                err(() => {
                                    s_no_tr.Main.i().enable({ el: side_panel_root });

                                    const side_panel_css = x.css('side_panel', side_panel_root);

                                    if (n(side_panel_css)) {
                                        x.bind(side_panel_css, 'load', (): void =>
                                            err(() => {
                                                s_no_tr.Main.i().disable({ el: side_panel_root });
                                            }, 'ges_1126'),
                                        );
                                    }
                                }, 'ges_1140'),
                        );
                    }
                }, 'ges_1127');

            render(<c_error.Body app_id={s_suffix.app_id} />, error_root, (): void => {
                if (page === 'settings') {
                    render(
                        <c_crash_handler.Body>
                            <c_loading_screen.Body />
                        </c_crash_handler.Body>,
                        loading_screen_root,
                        (): void =>
                            err(() => {
                                const loading_screen_root_el = s<HTMLDivElement>(
                                    `.${new s_suffix.Main('loading_screen').result}`,
                                );

                                if (
                                    n(loading_screen_root_el) &&
                                    n(loading_screen_root_el.shadowRoot)
                                ) {
                                    const loading_screen_css = x.css(
                                        'loading_screen',
                                        loading_screen_root_el.shadowRoot,
                                    );

                                    if (n(loading_screen_css)) {
                                        x.bind(loading_screen_css, 'load', (): void =>
                                            err(() => {
                                                d_loading_screen.Main.i().show();

                                                render_settings();
                                            }, 'ges_1128'),
                                        );
                                    }
                                }
                            }, 'ges_1141'),
                    );
                } else if (page === 'content_script') {
                    render_spinner();
                    render_last_end_msg();
                    render_side_panel();
                }
            });
        }, 'ges_1129');

    private create_root = ({
        prefix,
        shadow_root = true,
    }: {
        prefix: string;
        shadow_root?: boolean;
    }): HTMLDivElement | ShadowRoot | undefined =>
        err(() => {
            const root = x.create(
                'div',
                x.cls([new s_suffix.Main('root').result, new s_suffix.Main(prefix).result]),
            );

            x.append(document.body, root);

            if (shadow_root) {
                return root.attachShadow({ mode: 'open' });
            }

            return root;
        }, 'ges_1130');

    private set_page_title = (): void =>
        err(() => {
            const title_el = s<HTMLTitleElement>('title');

            if (n(title_el)) {
                title_el.textContent = ext.msg(`${page}_title_text`);
            }
        }, 'ges_1131');
}
