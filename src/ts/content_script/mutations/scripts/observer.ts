import { Suffix } from 'shared/internal';
import { s_actions } from 'content_script/internal';

const observer = new MutationObserver((mutations: any): void => err(() => {
    mutations.forEach((mutation: any): void => err(
        () => {
            if (![
                new Suffix('icons').result,
                new Suffix('root_parent').result,
            ].includes(mutation.target.className)
                && n(mutation.addedNodes[0])
                && mutation.addedNodes[0].className !== new Suffix('iframe').result
            ) {
                s_actions.Main.i().run_reload_actions_debounce();
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
