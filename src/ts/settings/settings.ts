import { init_shared } from '@loftyshaky/shared';
import 'shared/internal';
import { init } from 'settings/internal';

import { InitAll } from 'shared/init_all';

init_shared();
init();
InitAll.i().init();
