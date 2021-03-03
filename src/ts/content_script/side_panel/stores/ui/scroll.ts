import {
    makeObservable,
    observable,
    computed,
    action,
    runInAction,
} from 'mobx';

import { CssVars } from '@loftyshaky/shared';
import { i_side_panel } from 'content_script/internal';

export class Scroll {
    private static i0: Scroll;

    public static i(): Scroll {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                remembered_position: observable,
                position_overridden: observable,
                position_remembered_cls: computed,
                position_overridden_cls: computed,
                remember_position: action,
                reset_position: action,
                scroll: action,
            },
        );
    }

    public remembered_position: i_side_panel.RememberedPosition = 'none';
    public position_overridden = false;
    private remember_scrolling_position_0_35_seconds_timeout:
    any = false;

    private middle_button_holded_more_than_0_35_seconds: boolean = false;

    get position_remembered_cls() {
        return this.remembered_position === 'none'
            ? ''
            : 'position_remembered';
    }

    get position_overridden_cls() {
        return this.position_overridden
            ? 'position_overridden'
            : '';
    }

    public scroll_to_position = ({ position }: {position: number}): void => err(() => {
        document.documentElement.scrollTop = position;
    },
    1099);

    public get_current_position = (): number => err(() => {
        const doc = document.documentElement;

        return (
            window.pageYOffset
            || doc.scrollTop
        ) - (
            doc.clientTop
                || 0
        );
    },
    1096);

    public remember_position = (): void => err(() => {
        this.remembered_position = this.get_current_position();
    },
    1092);

    public reset_position = (): void => err(() => {
        this.remembered_position = 'none';
    },
    1093);

    public remember_scrolling_position_0_35_seconds = (
        e: MouseEvent,
    ): void => err(() => {
        e.preventDefault();

        if (e.button === 1) {
            this.remember_scrolling_position_0_35_seconds_timeout = (
                window.setTimeout(async () => {
                    this.remember_position();

                    this.middle_button_holded_more_than_0_35_seconds = true;
                    runInAction((): void => {
                        this.position_overridden = true;
                    });

                    await x.delay(
                        +CssVars.i().get({
                            name: 'transition_duration',
                        }) + 200,
                    );

                    runInAction((): void => {
                        this.position_overridden = false;
                    });
                },
                350)
            );
        }
    },
    1094);

    public stop_remember_scrolling_position_0_35_seconds_timeout = (): void => err(() => {
        clearTimeout(this.remember_scrolling_position_0_35_seconds_timeout);
    },
    1095);

    public scroll = (e: MouseEvent): void => err(() => {
        if (this.middle_button_holded_more_than_0_35_seconds) {
            this.middle_button_holded_more_than_0_35_seconds = false;
        } else if (e.button === 0) {
            this.remember_position();

            document.documentElement.scrollTop = 0;
        } else if (e.button === 2) {
            this.remember_position();

            const { body } = document;
            const html = document.documentElement;

            const height: number = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight,
            );

            document.documentElement.scrollTop = height;
        } else if (e.button === 1) {
            if (this.remembered_position === 'none') {
                this.remember_position();
            } else {
                this.scroll_to_position({ position: this.remembered_position });

                this.reset_position();
            }
        }
    },
    1091);
}
