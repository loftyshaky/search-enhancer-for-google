import React from 'react';
import { observer } from 'mobx-react';

import { svg } from 'shared/svg';
import { p_side_panel } from 'content_script/internal';

const component: any = {
    enable_btn: svg.PowerSettingsNew,
    jump_to_related_searches: svg.Article,
};

export const Btn = observer((props: p_side_panel.Btn) => {
    const {
        name,
        state_cls,
        on_click,
    } = props;

    const Component: any = component[name];

    return (
        <button
            className={x.cls([
                'side_panel_item',
                'btn',
                name,
                state_cls,
            ])}
            type='button'
            title={ext.msg(`${name}_title`)}
            onClick={on_click}
        >
            <Component />
        </button>
    );
});
