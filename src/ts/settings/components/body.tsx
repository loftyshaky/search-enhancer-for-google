import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { c_settings } from '@loftyshaky/shared/settings';
import { d_inputs } from '@loftyshaky/shared/inputs';
import { d_sections } from 'settings/internal';

export const Body: React.FunctionComponent = observer(() => {
    useEffect(
        () =>
            err(() => {
                const run = async () =>
                    err(() => {
                        d_inputs.NestedInput.i().set_all_parents_disbled_vals({
                            sections: d_sections.Main.i().sections,
                        });
                    }, 'ges_1144');

                run();
            }, 'ges_1145'),
        [],
    );

    return (
        <c_settings.Body
            sections={d_sections.Main.i().sections}
            initial_section={d_sections.Main.i().current_section}
            change_section_callback={(): void => {
                d_inputs.NestedInput.i().set_all_parents_disbled_vals({
                    sections: d_sections.Main.i().sections,
                });

                d_sections.Main.i().change_section_val();
            }}
        />
    );
});
