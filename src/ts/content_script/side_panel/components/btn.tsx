import React from 'react';
import { observer } from 'mobx-react';

import { svg } from 'shared/svg';
import { p_side_panel } from 'content_script/internal';

const component: any = {
    enable_btn: svg.PowerSettingsNew,
    jump_to_related_searches: svg.Article,
    scroll_to_top: svg.KeyboardArrowUp,
};

export const Btn = observer((props: p_side_panel.Btn) => {
    const {
        name,
        state_cls,
        position_remembered_cls,
        position_overridden_cls,
        on_click,
        on_mouse_down,
        on_mouse_up,
        on_context_menu,
    } = props;

    const Component: any = component[name];

    return (
        <button
            className={x.cls([
                'side_panel_item',
                'btn',
                name,
                state_cls,
                position_remembered_cls,
                position_overridden_cls,
            ])}
            type='button'
            title={ext.msg(`${name}_title`)}
            onClick={on_click}
            onMouseDown={on_mouse_down}
            onMouseUp={on_mouse_up}
            onContextMenu={on_context_menu}
        >
            <Component />
        </button>
    );
});
