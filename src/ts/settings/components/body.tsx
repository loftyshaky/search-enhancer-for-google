import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_settings } from '@loftyshaky/shared/settings';
import { d_inputs, i_inputs } from '@loftyshaky/shared/inputs';
import { d_sections, p_settings } from 'settings/internal';

export const Body: React.FunctionComponent<p_settings.Body> = observer((props) => {
    const { on_render } = props;

    useEffect(() => {
        on_render();
    }, [on_render]);

    useEffect(
        () =>
            err(() => {
                const run = async () =>
                    err(() => {
                        d_inputs.NestedInput.i().set_all_parents_disbled_vals({
                            sections: d_sections.Main.i().sections as i_inputs.Sections,
                        });
                    }, 'seg_1123');

                run();
            }, 'seg_1124'),
        [],
    );

    return (
        <div className='main'>
            <c_settings.Body
                sections={d_sections.Main.i().sections as i_inputs.Sections}
                initial_section={d_sections.Main.i().current_section}
                change_section_callback={(): void => {
                    d_inputs.NestedInput.i().set_all_parents_disbled_vals({
                        sections: d_sections.Main.i().sections as i_inputs.Sections,
                    });

                    d_sections.Main.i().change_section_val();
                }}
                enable_developer_mode_save_callback={
                    d_sections.Val.i().enable_developer_mode_save_callback
                }
            />
        </div>
    );
});
