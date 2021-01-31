import '@loftyshaky/shared';
import 'shared/internal';
import {
    run_initial_actions,
    run_on_load_actions,
} from 'content_script/internal';

run_initial_actions();

window.addEventListener(
    'load',
    run_on_load_actions,
);
