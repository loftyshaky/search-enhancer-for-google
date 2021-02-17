import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { Settings } from '@loftyshaky/shared/settings';
import { d_inputs } from '@loftyshaky/shared/inputs';
import { d_sections } from 'settings/internal';
import { d_shared } from 'shared/internal';

export const Body = observer(() => {
    useEffect(() => {
        d_shared.Data.i().set_from_storage();
    },
    []);

    return (
        <Settings
            sections={d_sections.Main.i().sections}
            initial_section='settings'
            change_section_callback={(): void => {
                d_inputs.NestedInput.i().set_all_parents_disbled_vals({
                    sections: d_sections.Main.i().sections,
                });
            }}
        />
    );
});
