import React from 'react';
import { render } from 'react-dom';
import { browser } from 'webextension-polyfill-ts';

import {
    CrashHandler,
    Error,
    LoadingScreenVisibility,
    LoadingScreenBody,
    Theme,
} from '@loftyshaky/shared';
import { u_settings } from '@loftyshaky/shared/settings';
import {
    app_id,
    Suffix,
    CssVars,
} from 'shared/internal';

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

    public init = (): void => err(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        __webpack_public_path__ = browser.runtime.getURL('');

        if (page === 'settings') {
            this.set_page_title();
        }

        CssVars.i().set();

        const error_root: ShadowRoot = this.create_root({ prefix: 'error' }) as ShadowRoot;
        let loading_screen_root: ShadowRoot;
        let settings_root: HTMLDivElement;
        let spinner_root: ShadowRoot;

        if (page === 'settings') {
            loading_screen_root = this.create_root({ prefix: 'loading_screen' }) as ShadowRoot;
            settings_root = this.create_root({
                prefix: 'settings',
                shadow_root: false,
            }) as HTMLDivElement;
        } else if (page === 'content_script') {
            spinner_root = this.create_root({ prefix: 'spinner' }) as ShadowRoot;
        }

        const render_settings = (): Promise<void> => err_async(async () => {
            const { Body } = await import('settings/components/body');
            const on_render = (): Promise<void> => err_async(async () => {
                const { d_sections } = await import('settings/internal');

                u_settings.InputsWidth.i().calculate_for_all_sections(
                    { sections: d_sections.Main.i().sections },
                );
                u_settings.InputsWidth.i().set_max_width();

                LoadingScreenVisibility.i().hide();
            },
            1013);

            render(
                <CrashHandler><Body /></CrashHandler>,
                settings_root,
                (): void => {
                    x.css(
                        'normalize',
                        document.head,
                    );

                    const settings_css = x.css(
                        'settings_css',
                        document.head,
                    );

                    if (n(settings_css)) {
                        settings_css.addEventListener(
                            'load',
                            on_render,
                        );
                    }
                },
            );
        },
        1003);

        const render_spinner = (): Promise<void> => err_async(async () => {
            const { c_infinite_scroll } = await import('content_script/internal');

            render(
                <CrashHandler><c_infinite_scroll.Spinner /></CrashHandler>,
                spinner_root,
                (): void => {
                    x.css(
                        'spinner',
                        spinner_root,
                    );
                },
            );
        },
        1072);

        render(
            <Error app_id={app_id} />,
            error_root,
            (): void => {
                if (page === 'settings') {
                    render(
                        <CrashHandler><LoadingScreenBody /></CrashHandler>,
                        loading_screen_root,
                        (): void => {
                            const loading_screen_root_el = s<HTMLDivElement>(`.${new Suffix('loading_screen').result}`);

                            if (
                                n(loading_screen_root_el)
                                && n(loading_screen_root_el.shadowRoot)
                            ) {
                                Theme.i().set({ name: 'light' });

                                x.css(
                                    'normalize',
                                    loading_screen_root_el.shadowRoot,
                                );
                                const loading_screen_css = x.css(
                                    'loading_screen',
                                    loading_screen_root_el.shadowRoot,
                                );

                                if (n(loading_screen_css)) {
                                    loading_screen_css.addEventListener(
                                        'load',
                                        (): void => err(() => {
                                            LoadingScreenVisibility.i().show();

                                            render_settings();
                                        },
                                        1012),
                                    );
                                }
                            }
                        },
                    );
                } else if (page === 'content_script') {
                    render_spinner();
                }
            },
        );
    },
    1000);

    private create_root = (
        {
            prefix,
            shadow_root = true,
        }: {
            prefix: string;
            shadow_root?: boolean
        },
    ): HTMLDivElement | ShadowRoot | undefined => err(() => {
        const root = x.create(
            'div',
            x.cls([
                new Suffix('root').result,
                new Suffix(prefix).result,
            ]),
        );

        x.append(
            document.body,
            root,
        );

        if (shadow_root) {
            return root.attachShadow({ mode: 'open' });
        }

        return root;
    },
    1001);

    private set_page_title = (): void => err(() => {
        const title_el = s<HTMLTitleElement>('title');

        if (n(title_el)) {
            title_el.textContent = ext.msg(`${page}_title_text`);
        }
    },
    1002);
}
