import React from 'react';
import { render } from 'react-dom';

import { CrashHandler } from '@loftyshaky/shared';
import { Suffix } from 'shared/internal';

import {
    s_roots,
    s_el_parser,
    c_icons,
} from 'content_script/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
    // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private component: any = {
        icons: c_icons.Icons,
    };

    public init = ({
        name,
        start = 0,
        limit = Infinity,
    }: {
        name: string;
        start?: number;
        limit?: number
    }): void => err(() => {
        s_roots.Position.i().position_title_el();

        s_el_parser.Main.i().title_els.forEach((
            title_el,
            i,
        ): void => err(() => {
            if (i >= start) {
                const icons_el: HTMLElement | undefined = sb(
                    title_el,
                    `.${new Suffix(name).result}`,
                );

                if (!n(icons_el)) {
                    const root: HTMLDivElement = x.create(
                        'div',
                        new Suffix(name).result,
                    );

                    x.append(
                        title_el,
                        root,
                    );

                    root.attachShadow({ mode: 'open' });

                    const content = x.create(
                        'div',
                        'content',
                    );
                    x.append(
                        root.shadowRoot,
                        content,
                    );

                    if (n(root.shadowRoot)) {
                        x.css(
                            'normalize',
                            root.shadowRoot,
                        );
                        const css = x.css(
                            name,
                            root.shadowRoot,
                        );

                        const Component: any = this.component[name];

                        if (n(css)) {
                            css.addEventListener(
                                'load',
                                (): void => err(() => {
                                    render(
                                        <CrashHandler>
                                            <Component
                                                i={i}
                                                hostname={s_el_parser.Main.i().hostnames[i]}
                                                limit={limit}
                                            />
                                        </CrashHandler>,
                                        content,
                                    );
                                },
                                1043),
                            );
                        }
                    }
                }
            }
        },
        1031));
    },
    1030);

    public apply_root_parent_cls = (): void => err(() => {
        s_el_parser.Main.i().title_els.forEach((title_el): void => err(() => {
            x.add_cls(
                title_el,
                new Suffix('root_parent').result,
            );
        },
        1034));
    },
    1033);
}
