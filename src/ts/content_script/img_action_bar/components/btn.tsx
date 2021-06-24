import React from 'react';
import { observer } from 'mobx-react';

import { prevent_default } from '@loftyshaky/shared';
import { d_img_action_bar, p_img_action_bar } from 'content_script/internal';

export const Btn = observer((props: p_img_action_bar.Btn) => {
    const { btn } = props;
    const Component: any = d_img_action_bar.Btns.i().component[btn.name];

    return data.settings[`show_${btn.name}_btn`] ? (
        <button
            className='btn'
            type='button'
            title={ext.msg(`${btn.name}_title`)}
            onClick={(): void => {
                btn.event_callback({ type: btn.name });
            }}
            onContextMenu={prevent_default}
        >
            <Component />
        </button>
    ) : null;
});
