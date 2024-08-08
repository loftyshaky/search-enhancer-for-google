import { MouseEvent } from 'react';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import { s_css_vars } from '@loftyshaky/shared/shared';
import { i_side_panel } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable<Class, 'remember_position' | 'reset_position'>(this, {
            remembered_position: observable,
            position_overridden: observable,
            position_remembered_cls: computed,
            position_overridden_cls: computed,
            remember_position: action,
            reset_position: action,
            scroll: action,
        });
    }

    public remembered_position: i_side_panel.RememberedPosition = 'none';
    public position_overridden = false;
    private remember_scrolling_position_0_35_seconds_timeout: boolean | number = false;

    private middle_button_holded_more_than_0_35_seconds: boolean = false;

    get position_remembered_cls() {
        return this.remembered_position === 'none' ? '' : 'position_remembered';
    }

    get position_overridden_cls() {
        return this.position_overridden ? 'position_overridden' : '';
    }

    public scroll_to_position = ({ position }: { position: number }): void =>
        err(() => {
            document.documentElement.scrollTop = position;
        }, 'seg_1112');

    public get_current_position = (): number =>
        err(() => {
            const doc = document.documentElement;

            return (globalThis.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        }, 'seg_1113');

    private remember_position = (): void =>
        err(() => {
            this.remembered_position = this.get_current_position();
        }, 'seg_1114');

    private reset_position = (): void =>
        err(() => {
            this.remembered_position = 'none';
        }, 'seg_1115');

    public remember_scrolling_position_0_35_seconds = (
        { keyboard_call }: { keyboard_call: boolean },
        e: MouseEvent,
    ): void =>
        err(() => {
            if (n(e.preventDefault)) {
                e.preventDefault();
            }

            if (e.button === 1) {
                this.remember_scrolling_position_0_35_seconds_timeout = self.setTimeout(
                    async () => {
                        this.remember_position();

                        if (!keyboard_call) {
                            this.middle_button_holded_more_than_0_35_seconds = true;
                        }

                        runInAction(() =>
                            err(() => {
                                this.position_overridden = true;
                            }, 'seg_1116'),
                        );

                        await x.delay(
                            +s_css_vars.CssVars.get({
                                name: 'transition_duration',
                            }) + 150,
                        );

                        runInAction(() =>
                            err(() => {
                                this.position_overridden = false;
                            }, 'seg_1117'),
                        );
                    },
                    keyboard_call ? 0 : 350,
                );
            }
        }, 'seg_1118');

    public stop_remember_scrolling_position_0_35_seconds_timeout = (): void =>
        err(() => {
            clearTimeout(this.remember_scrolling_position_0_35_seconds_timeout as number);
        }, 'seg_1119');

    public scroll = (e: MouseEvent): void =>
        err(() => {
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
        }, 'seg_1120');
}

export const Scroll = Class.get_instance();
