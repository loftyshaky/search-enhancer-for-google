import { Suffix } from 'shared/internal';
import { run_actions_debounce } from 'content_script/internal';

const observer = new MutationObserver((mutation: any): void => err(() => {
    mutation.forEach((target: HTMLElement): void => err(
        () => {
            if (target.className !== new Suffix('icons').result) {
                run_actions_debounce();
            }
        },
        1036,
    ));
},
1035));

observer.observe(
    document.body,
    {
        subtree: true,
        childList: true,
    },
);
