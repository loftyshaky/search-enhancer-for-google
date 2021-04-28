import { Suffix } from 'shared/internal';
import { s_actions } from 'content_script/internal';

const observer = new MutationObserver((mutations: any): void => err(() => {
    mutations.forEach((mutation: any): void => err(
        () => {
            if (
                !x.matches(
                    mutation.target,
                    `.${new Suffix('root_parent').result}`,
                )
                && !x.matches(
                    mutation.target,
                    `.${new Suffix('icons').result}`,
                ) && (
                    n(mutation.addedNodes[0])
                    && !x.matches(
                        mutation.addedNodes[0],
                        `.${new Suffix('icons').result}`,
                    )
                    && !x.matches(
                        mutation.addedNodes[0],
                        `.${new Suffix('img_action_bar').result}`,
                    )
                    && !x.matches(
                        mutation.addedNodes[0],
                        `.${new Suffix('spinner').result}`,
                    )
                )
            ) {
                s_actions.Main.i().run_reload_actions_2();
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
