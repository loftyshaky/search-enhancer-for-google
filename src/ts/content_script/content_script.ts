import '@loftyshaky/shared';
import 'shared/internal';
import { init } from 'content_script/internal';

window.addEventListener('load',
    async (): Promise<void> => {
        await x.delay(0);

        init();
    });
