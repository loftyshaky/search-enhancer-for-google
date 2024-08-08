import clone from 'lodash/clone';
import { MouseEvent, KeyboardEvent } from 'react';
import { makeObservable, observable, computed, action } from 'mobx';

import { s_css_vars } from '@loftyshaky/shared/shared';
import { d_side_panel, s_el_parser, i_side_panel } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable<Class, 'remembered_position' | 'remember_position'>(this, {
            remembered_position: observable,
            position_remembered_cls: computed,
            remember_position: action,
            reset_position: action,
        });
    }

    private remembered_position: i_side_panel.RememberedPosition = 'none';
    public last_related_searches_position: number = 0;

    get position_remembered_cls() {
        return this.remembered_position === 'none' ? '' : 'position_remembered';
    }

    private remember_position = (): void =>
        err(() => {
            const current_position: number = d_side_panel.Scroll.get_current_position();

            this.remembered_position = current_position;
            d_side_panel.Scroll.remembered_position = current_position;
        }, 'seg_1109');

    public reset_position = (): void =>
        err(() => {
            this.remembered_position = 'none';
        }, 'seg_1110');

    public jump_to = (e?: MouseEvent | KeyboardEvent): void =>
        err(() => {
            if (n(e)) {
                e.preventDefault();
            }

            if (this.remembered_position === 'none') {
                let el_to_jump_to: HTMLElement | undefined;

                if (n(s_el_parser.ElParser.related_searches_el)) {
                    el_to_jump_to = s_el_parser.ElParser.related_searches_el;
                } else if (n(s_el_parser.ElParser.pagination_el)) {
                    el_to_jump_to = s_el_parser.ElParser.pagination_el;
                }

                if (n(el_to_jump_to)) {
                    this.remember_position();

                    const new_position: number =
                        document.documentElement.scrollTop +
                        el_to_jump_to.getBoundingClientRect().top -
                        parseInt(s_css_vars.CssVars.get({ name: 'offset_from_header' }), 10);

                    d_side_panel.Scroll.scroll_to_position({
                        position: new_position,
                    });

                    this.last_related_searches_position = document.documentElement.scrollTop;
                }
            } else {
                const old_position = clone(this.remembered_position);

                this.remember_position();

                d_side_panel.Scroll.scroll_to_position({ position: old_position });

                this.reset_position();
            }
        }, 'seg_1111');
}

export const RelatedSearches = Class.get_instance();
