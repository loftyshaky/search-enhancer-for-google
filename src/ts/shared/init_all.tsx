import React from 'react';
import ReactDOM from 'react-dom/client';

import '@loftyshaky/shared/ext';
import {
    c_crash_handler,
    c_error,
    c_loading_screen,
    d_loading_screen,
    s_no_tr,
    s_tab_index,
    s_theme as s_theme_shared,
} from '@loftyshaky/shared/shared';
import { d_inputs } from '@loftyshaky/shared/inputs';
import { s_css_vars, s_suffix } from 'shared_clean/internal';

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, @typescript-eslint/no-unused-vars
declare let __webpack_public_path__: string;

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    private settings_root: HTMLDivElement | undefined = undefined;
    private spinner_root: ShadowRoot | undefined = undefined;
    private load_end_msg_root: ShadowRoot | undefined = undefined;
    private side_panel_root: ShadowRoot | undefined = undefined;
    private dependencies_root: HTMLDivElement | undefined = undefined;

    public init = (): Promise<void> =>
        new Promise((reslove) => {
            err_async(async () => {
                const on_loading_screen_render = (): void =>
                    err(() => {
                        const loading_screen_root_el = s<HTMLDivElement>(
                            `.${new s_suffix.Suffix('loading_screen').result}`,
                        );

                        if (n(loading_screen_root_el) && n(loading_screen_root_el.shadowRoot)) {
                            const loading_screen_css = x.css(
                                'loading_screen',
                                loading_screen_root_el.shadowRoot,
                            );

                            if (n(loading_screen_css)) {
                                x.bind(loading_screen_css, 'load', (): void =>
                                    err(() => {
                                        if (page === 'dependencies') {
                                            s_theme_shared.Theme.set({
                                                name: data.settings.prefs.options_page_theme,
                                            });
                                        }

                                        d_loading_screen.Visibility.show();

                                        reslove();
                                    }, 'seg_1158'),
                                );
                            }
                        }
                    }, 'seg_1159');

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                __webpack_public_path__ = we.runtime.getURL('');

                if (['settings', 'dependencies'].includes(page)) {
                    this.set_page_title();
                } else if (page === 'content_script') {
                    const { s_icons } = await import('content_script/internal');

                    s_icons.icons.show_or_hide_native_favicons();
                }

                s_css_vars.CssVars.set();

                const error_root: ShadowRoot = this.create_root({ prefix: 'error' }) as ShadowRoot;
                let loading_screen_root: ShadowRoot;

                if (['settings', 'dependencies'].includes(page)) {
                    loading_screen_root = this.create_root({
                        prefix: 'loading_screen',
                    }) as ShadowRoot;
                }

                if (page === 'settings') {
                    this.settings_root = this.create_root({
                        prefix: 'settings',
                        shadow_root: false,
                    }) as HTMLDivElement;
                } else if (page === 'content_script') {
                    x.css('font_face', document.head, new s_suffix.Suffix('font_face_link').result);

                    this.spinner_root = this.create_root({ prefix: 'spinner' }) as ShadowRoot;
                    this.load_end_msg_root = this.create_root({
                        prefix: 'load_end_msg',
                    }) as ShadowRoot;
                    this.side_panel_root = this.create_root({ prefix: 'side_panel' }) as ShadowRoot;
                } else if (page === 'dependencies') {
                    this.dependencies_root = this.create_root({
                        prefix: 'dependencies',
                        shadow_root: false,
                    }) as HTMLDivElement;
                }

                ReactDOM.createRoot(error_root).render(
                    <c_error.Body
                        app_id={s_suffix.app_id}
                        on_render={(): void =>
                            err(() => {
                                if (['settings', 'dependencies'].includes(page)) {
                                    ReactDOM.createRoot(loading_screen_root).render(
                                        <c_crash_handler.Body>
                                            <c_loading_screen.Body
                                                app_id={s_suffix.app_id}
                                                on_render={(): void => {
                                                    on_loading_screen_render();
                                                }}
                                            />
                                        </c_crash_handler.Body>,
                                    );
                                } else {
                                    reslove();
                                }
                            }, 'seg_1206')
                        }
                    />,
                );
            }, 'seg_1160');
        });

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
                x.cls([new s_suffix.Suffix('root').result, new s_suffix.Suffix(prefix).result]),
            );

            x.append(document.body, root);

            if (shadow_root) {
                return root.attachShadow({ mode: 'open' });
            }

            return root;
        }, 'seg_1161');

    private set_page_title = (): void =>
        err(() => {
            const title_el = s<HTMLTitleElement>('title');

            if (n(title_el)) {
                title_el.textContent = ext.msg(`${page}_title_text`);
            }
        }, 'seg_1162');

    public render_settings = (): Promise<void> =>
        err_async(async () => {
            const { Body } = await import('settings/components/body');
            const on_css_load = (): Promise<void> =>
                err_async(async () => {
                    await d_inputs.InputWidth.calculate();

                    d_loading_screen.Visibility.hide({ app_id: s_suffix.app_id });

                    s_tab_index.TabIndex.bind_set_input_type_f();
                }, 'seg_1148');

            if (n(this.settings_root)) {
                ReactDOM.createRoot(this.settings_root).render(
                    <c_crash_handler.Body>
                        <Body
                            on_render={(): void =>
                                err(() => {
                                    const settings_css = x.css('settings_css', document.head);

                                    s_theme_shared.Theme.set({
                                        name: data.settings.prefs.options_page_theme,
                                    });

                                    if (n(settings_css)) {
                                        x.bind(settings_css, 'load', on_css_load);
                                    }
                                }, 'seg_1149')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'seg_1150');

    public render_spinner = (): Promise<void> =>
        err_async(async () => {
            const { c_infinite_scroll } = await import('content_script/internal');

            if (n(this.spinner_root)) {
                ReactDOM.createRoot(this.spinner_root).render(
                    <c_crash_handler.Body>
                        <c_infinite_scroll.Spinner
                            on_render={(): void =>
                                err(() => {
                                    x.css('spinner', this.spinner_root);
                                }, 'seg_1151')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'seg_1152');

    public render_last_end_msg = (): Promise<void> =>
        err_async(async () => {
            const { c_infinite_scroll } = await import('content_script/internal');

            if (n(this.load_end_msg_root)) {
                ReactDOM.createRoot(this.load_end_msg_root).render(
                    <c_crash_handler.Body>
                        <c_infinite_scroll.LoadEndMsg
                            on_render={(): void =>
                                err(() => {
                                    x.css('load_end_msg', this.load_end_msg_root);
                                }, 'seg_1153')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'seg_1154');

    public render_side_panel = (): Promise<void> =>
        err_async(async () => {
            const { c_side_panel, s_location, s_theme } = await import('content_script/internal');

            if (n(this.side_panel_root) && s_location.Location.is_search_results) {
                ReactDOM.createRoot(this.side_panel_root).render(
                    <c_crash_handler.Body>
                        <c_side_panel.Body
                            on_render={(): void =>
                                err(() => {
                                    s_no_tr.State.enable({ el: this.side_panel_root });

                                    s_theme.Theme.adapt_panel_to_dark_theme();
                                    const side_panel_css = x.css(
                                        'side_panel',
                                        this.side_panel_root,
                                    );

                                    if (n(side_panel_css)) {
                                        x.bind(side_panel_css, 'load', (): void =>
                                            err(() => {
                                                s_no_tr.State.disable({
                                                    el: this.side_panel_root,
                                                });
                                            }, 'seg_1155'),
                                        );
                                    }
                                }, 'seg_1156')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'seg_1157');

    public render_dependencies = (): Promise<void> =>
        err_async(async () => {
            const { Body } = await import('dependencies/components/body');

            const on_css_load = (): Promise<void> =>
                err_async(async () => {
                    d_loading_screen.Visibility.hide({ app_id: s_suffix.app_id });
                }, 'seg_1230');

            if (n(this.dependencies_root)) {
                ReactDOM.createRoot(this.dependencies_root).render(
                    <c_crash_handler.Body>
                        <Body
                            on_render={(): void =>
                                err(() => {
                                    const dependencies_css = x.css(
                                        'dependencies_css',
                                        document.head,
                                    );

                                    x.css(
                                        `${data.settings.prefs.options_page_theme}_theme`,
                                        document.head,
                                        'theme_link',
                                    );

                                    if (n(dependencies_css)) {
                                        x.bind(dependencies_css, 'load', on_css_load);
                                    }
                                }, 'seg_1231')
                            }
                        />
                    </c_crash_handler.Body>,
                );
            }
        }, 'seg_1228');
}

export const InitAll = Class.get_instance();
