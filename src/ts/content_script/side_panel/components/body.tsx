import React from 'react';
import { observer } from 'mobx-react';

import { prevent_default } from '@loftyshaky/shared';
import {
    u_side_panel,
    c_side_panel,
} from 'content_script/internal';

export const Body = observer(() => (
    <div
        className={
            x.cls([
                'side_panel',
                'left',
            ])
        }
        role='none'
        onMouseUp={
            u_side_panel.Scroll.i().stop_remember_scrolling_position_0_35_seconds_timeout
        }
    >
        {
            data.settings.enable_infinite_scrolling
            && data.settings.show_enable_btn
                ? (
                    <c_side_panel.Btn
                        name='enable_btn'
                        state_cls={u_side_panel.InfiniteScrollingState.i().state_cls}
                        on_click={u_side_panel.InfiniteScrollingState.i().change}
                    />
                )
                : undefined
        }
        {
            data.settings.show_scroll_to_top_btn
                ? (
                    <c_side_panel.Btn
                        name='scroll_to_top'
                        position_remembered_cls={
                            u_side_panel.Scroll.i().position_remembered_cls
                        }
                        position_overridden_cls={
                            u_side_panel.Scroll.i().position_overridden_cls
                        }
                        on_mouse_down={
                            u_side_panel.Scroll.i().remember_scrolling_position_0_35_seconds
                        }
                        on_mouse_up={u_side_panel.Scroll.i().scroll}
                        on_context_menu={prevent_default}
                    />
                )
                : undefined
        }
        {
            data.settings.enable_infinite_scrolling
            && data.settings.show_jump_to_related_searches_btn
                ? (
                    <c_side_panel.Btn
                        name='jump_to_related_searches'
                        position_remembered_cls={
                            u_side_panel.RelatedSearches.i().position_remembered_cls
                        }
                        on_click={u_side_panel.RelatedSearches.i().jump_to}
                    />
                )
                : undefined
        }
        {
            data.settings.enable_infinite_scrolling
            && data.settings.show_page_indicator
                ? (
                    <>
                        <c_side_panel.Page
                            name='current'
                            val={u_side_panel.Page.i().current}
                        />
                        <c_side_panel.Page
                            name='total'
                            val={u_side_panel.Page.i().total}
                        />
                    </>
                )
                : undefined
        }
    </div>
));
