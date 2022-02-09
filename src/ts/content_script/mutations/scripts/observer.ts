import { s_suffix } from 'shared/internal';
import { s_actions } from 'content_script/internal';

const observer = new MutationObserver((mutations): void =>
    err(() => {
        mutations.forEach((mutation): void =>
            err(() => {
                if (
                    !x.matches(
                        mutation.target as HTMLElement,
                        `.${new s_suffix.Main('root_parent').result}`,
                    ) &&
                    !x.matches(
                        mutation.target as HTMLElement,
                        `.${new s_suffix.Main('icons').result}`,
                    ) &&
                    n(mutation.addedNodes[0]) &&
                    !x.matches(
                        mutation.addedNodes[0] as HTMLElement,
                        `.${new s_suffix.Main('icons').result}`,
                    ) &&
                    !x.matches(
                        mutation.addedNodes[0] as HTMLElement,
                        `.${new s_suffix.Main('img_action_bar').result}`,
                    ) &&
                    !x.matches(
                        mutation.addedNodes[0] as HTMLElement,
                        `.${new s_suffix.Main('spinner').result}`,
                    )
                ) {
                    s_actions.Main.i().run_reload_actions_2_debounce();
                }
            }, 'ges_1087'),
        );
    }, 'ges_1088'),
);

observer.observe(document.body, {
    subtree: true,
    childList: true,
});
