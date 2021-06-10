import { browser } from 'webextension-polyfill-ts';

(browser as any).action.onClicked.addListener((): void => err(() => {
    browser.runtime.openOptionsPage();
},
1132));
