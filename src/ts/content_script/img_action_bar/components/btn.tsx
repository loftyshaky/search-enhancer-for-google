import React from 'react';
import { observer } from 'mobx-react';

import { prevent_default } from '@loftyshaky/shared';
import { d_img_action_bar, p_img_action_bar } from 'content_script/internal';

export const Btn: React.FunctionComponent<p_img_action_bar.Btn> = observer((props) => {
    const { btn } = props;
    const Component = d_img_action_bar.Btns.i().component[btn.name];

    return data.settings[`show_${btn.name}_btn`] &&
        ((btn.is_cut && data.settings.enable_cut_features) || !btn.is_cut) ? (
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
