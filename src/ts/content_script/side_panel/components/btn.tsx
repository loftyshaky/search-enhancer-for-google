import React from 'react';
import { observer } from 'mobx-react';

import { t } from '@loftyshaky/shared/shared';
import { svg } from 'shared/internal';
import { d_side_panel, p_side_panel } from 'content_script/internal';

const component: t.AnyRecord = {
    enable_btn: svg.PowerSettingsNew,
    jump_to_related_searches: svg.Article,
    scroll_to_top: svg.KeyboardArrowUp,
};

export const Btn: React.FunctionComponent<p_side_panel.Btn> = observer(
    (props: p_side_panel.Btn) => {
        const {
            name,
            disabled_cls,
            position_remembered_cls,
            position_overridden_cls,
            on_click,
            on_mouse_down,
            on_mouse_up,
            on_context_menu,
            on_keydown,
        } = props;

        const Component = component[name];

        return (
            <button
                className={x.cls([
                    'side_panel_item',
                    'btn',
                    name,
                    disabled_cls,
                    position_remembered_cls,
                    position_overridden_cls,
                ])}
                type='button'
                title={d_side_panel.Btn.i().msg({ name })}
                aria-label='Side panel button'
                onClick={on_click}
                onMouseDown={on_mouse_down}
                onMouseUp={on_mouse_up}
                onContextMenu={on_context_menu}
                onKeyDown={on_keydown}
            >
                <Component />
            </button>
        );
    },
);
