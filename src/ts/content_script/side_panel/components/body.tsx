import React from 'react';
import { observer } from 'mobx-react';

import {
    u_side_panel,
    c_side_panel,
} from 'content_script/internal';

export const Body = observer(() => (
    <div className={x.cls([
        'side_panel',
        'left',
    ])}
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
            data.settings.enable_infinite_scrolling
            && data.settings.show_jump_to_related_searches_btn
                ? (
                    <c_side_panel.Btn
                        name='jump_to_related_searches'
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
