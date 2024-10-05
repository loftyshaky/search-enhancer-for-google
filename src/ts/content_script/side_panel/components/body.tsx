import React, { MouseEvent, KeyboardEvent, useEffect } from 'react';
import { observer } from 'mobx-react';

import { prevent_default } from '@loftyshaky/shared/shared';
import { c_side_panel, d_side_panel, s_tab_index, p_side_panel } from 'content_script/internal';

export const Body: React.FunctionComponent<p_side_panel.Body> = observer((props) => {
    const { on_render } = props;
    const name_1 = 'scroll_to_top';
    const remember_scrolling_position_0_35_seconds = (e: MouseEvent) =>
        err(
            () =>
                d_side_panel.Scroll.remember_scrolling_position_0_35_seconds(
                    {
                        keyboard_call: false,
                    },
                    e,
                ),
            'seg_1103',
        );

    useEffect(() => {
        on_render();
    }, [on_render]);

    return (
        <div
            className={x.cls(['content', 'side_panel', data.settings.prefs.side_panel_position])}
            role='none'
            onMouseUp={d_side_panel.Scroll.stop_remember_scrolling_position_0_35_seconds_timeout}
        >
            {data.settings.prefs.enable_infinite_scrolling &&
            data.settings.prefs.enable_btn_is_visible ? (
                <c_side_panel.Btn
                    name='enable_btn'
                    disabled_cls={d_side_panel.InfiniteScrollingState.disabled_cls}
                    on_click={d_side_panel.InfiniteScrollingState.change}
                />
            ) : undefined}
            {data.settings.prefs.scroll_to_top_btn_is_visible ? (
                <c_side_panel.Btn
                    name={name_1}
                    position_remembered_cls={d_side_panel.Scroll.position_remembered_cls}
                    position_overridden_cls={d_side_panel.Scroll.position_overridden_cls}
                    on_mouse_down={remember_scrolling_position_0_35_seconds}
                    on_mouse_up={d_side_panel.Scroll.scroll}
                    on_context_menu={prevent_default}
                    on_keydown={(e: KeyboardEvent) => {
                        s_tab_index.TabIndex.simulate_side_panel_btn_click_on_enter(
                            { type: name_1 },
                            e,
                        );
                    }}
                />
            ) : undefined}
            {data.settings.prefs.jump_to_related_searches_btn_is_visible ? (
                <c_side_panel.Btn
                    name='jump_to_related_searches'
                    position_remembered_cls={d_side_panel.RelatedSearches.position_remembered_cls}
                    on_mouse_down={d_side_panel.RelatedSearches.jump_to}
                    on_keydown={(e: KeyboardEvent) => {
                        s_tab_index.TabIndex.simulate_side_panel_btn_click_on_enter(
                            {
                                callback: d_side_panel.RelatedSearches.jump_to,
                            },
                            e,
                        );
                    }}
                />
            ) : undefined}
            {data.settings.prefs.enable_infinite_scrolling &&
            data.settings.prefs.page_indicator_is_visible ? (
                <>
                    <c_side_panel.Page name='current' val={d_side_panel.Page.current} />
                    <c_side_panel.Page name='total' val={d_side_panel.Page.total} />
                </>
            ) : undefined}
        </div>
    );
});
