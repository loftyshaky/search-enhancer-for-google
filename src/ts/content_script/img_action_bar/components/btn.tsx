import _ from 'lodash';
import React from 'react';
import { observer } from 'mobx-react';

import { prevent_default } from '@loftyshaky/shared';
import { svg } from 'shared/svg';
import {
    o_img_action_bar,
    d_img_action_bar,
    p_img_action_bar,
} from 'content_script/internal';

const component: any = _.mapValues(
    d_img_action_bar.Btns.i().btns,
    (value: o_img_action_bar.Btn) => svg[value.svg_name],
);

export const Btn = observer((props: p_img_action_bar.Btn) => {
    const { btn } = props;
    const Component: any = component[btn.name];

    return (
        <button
            className='btn'
            type='button'
            title={ext.msg(`${btn.name}_title`)}
            onMouseDown={btn.event_callback}
            onContextMenu={prevent_default}
        >
            <Component />
        </button>
    );
});
