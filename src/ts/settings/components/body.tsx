import React from 'react';
import { observer } from 'mobx-react';

import { Settings } from '@loftyshaky/shared/settings';
import { d_sections } from 'settings/internal';

export const Body = observer(() => (
    <Settings
        sections={d_sections.Main.i.sections}
        initial_section='settings'
        change_section_callback={() => undefined}
    />
));
