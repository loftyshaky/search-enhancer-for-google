import { s_suffix } from 'shared_clean/internal';
import { s_actions, s_infinite_scroll, s_location } from 'content_script/internal';

const observer = new MutationObserver((mutations): void =>
    err(() => {
        mutations.forEach(
            (mutation): Promise<void> =>
                err_async(async () => {
                    if (
                        !x.matches(
                            mutation.target as HTMLElement,
                            `.${new s_suffix.Suffix('root_parent').result}`,
                        ) &&
                        !x.matches(
                            mutation.target as HTMLElement,
                            `.${new s_suffix.Suffix('icons').result}`,
                        ) &&
                        n(mutation.addedNodes[0]) &&
                        !x.matches(
                            mutation.addedNodes[0] as HTMLElement,
                            `.${new s_suffix.Suffix('icons').result}`,
                        ) &&
                        !x.matches(
                            mutation.addedNodes[0] as HTMLElement,
                            `.${new s_suffix.Suffix('img_action_bar').result}`,
                        ) &&
                        !x.matches(
                            mutation.addedNodes[0] as HTMLElement,
                            `.${new s_suffix.Suffix('spinner').result}`,
                        )
                    ) {
                        s_actions.Actions.run_reload_actions_2_debounce();

                        if (s_location.Location.is_shopping_page) {
                            await x.delay(1000);

                            s_infinite_scroll.FooterEls.append_to_footer();
                        }
                    }
                }, 'seg_1087'),
        );
    }, 'seg_1088'),
);

observer.observe(document.body, {
    subtree: true,
    childList: true,
});
