import { Suffix } from 'shared/internal';
import { run_actions_debounce } from 'content_script/internal';

const observer = new MutationObserver((mutations: any): void => err(() => {
    mutations.forEach((mutation: any): void => err(
        () => {
            if (![
                new Suffix('icons').result,
                new Suffix('root_parent').result,
            ].includes(mutation.target.className)) {
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
