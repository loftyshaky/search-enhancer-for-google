import React from 'react';
import { observer } from 'mobx-react';

import { prevent_default } from '@loftyshaky/shared';
import { c_side_panel, u_side_panel, s_tab_index } from 'content_script/internal';

export const Body = observer(() => {
    const name_1 = 'scroll_to_top';
    const remember_scrolling_position_0_35_seconds = (e: any) =>
        u_side_panel.Scroll.i().remember_scrolling_position_0_35_seconds(
            {
                keyboard_call: false,
            },
            e,
        );

    return (
        <div
            className={x.cls(['content', 'side_panel', data.settings.side_panel_position])}
            role='none'
            onMouseUp={
                u_side_panel.Scroll.i().stop_remember_scrolling_position_0_35_seconds_timeout
            }
        >
            {data.settings.enable_infinite_scrolling && data.settings.show_enable_btn ? (
                <c_side_panel.Btn
                    name='enable_btn'
                    disabled_cls={u_side_panel.InfiniteScrollingState.i().disabled_cls}
                    on_click={u_side_panel.InfiniteScrollingState.i().change}
                />
            ) : undefined}
            {data.settings.show_scroll_to_top_btn ? (
                <c_side_panel.Btn
                    name={name_1}
                    position_remembered_cls={u_side_panel.Scroll.i().position_remembered_cls}
                    position_overridden_cls={u_side_panel.Scroll.i().position_overridden_cls}
                    on_mouse_down={remember_scrolling_position_0_35_seconds}
                    on_mouse_up={u_side_panel.Scroll.i().scroll}
                    on_context_menu={prevent_default}
                    on_keydown={(e: any) => {
                        s_tab_index.Main.i().simulate_side_panel_btn_click_on_enter(
                            { type: name_1 },
                            e,
                        );
                    }}
                />
            ) : undefined}
            {data.settings.enable_infinite_scrolling &&
            data.settings.show_jump_to_related_searches_btn ? (
                <c_side_panel.Btn
                    name='jump_to_related_searches'
                    position_remembered_cls={
                        u_side_panel.RelatedSearches.i().position_remembered_cls
                    }
                    on_mouse_down={u_side_panel.RelatedSearches.i().jump_to}
                    on_keydown={(e: any) => {
                        s_tab_index.Main.i().simulate_side_panel_btn_click_on_enter(
                            {
                                callback: u_side_panel.RelatedSearches.i().jump_to,
                            },
                            e,
                        );
                    }}
                />
            ) : undefined}
            {data.settings.enable_infinite_scrolling && data.settings.show_page_indicator ? (
                <>
                    <c_side_panel.Page name='current' val={u_side_panel.Page.i().current} />
                    <c_side_panel.Page name='total' val={u_side_panel.Page.i().total} />
                </>
            ) : undefined}
        </div>
    );
});
