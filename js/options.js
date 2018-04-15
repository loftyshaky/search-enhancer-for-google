//> enable transition t

//> localization t

//> settings t

//>1 change settings (populate storage) t

//>1 restore_settings_on_load f

//>1 restore defaults t

//>1 expand_subotions f

//>1 ask for permission to be granted or remove it t

//>1 enable_or_disable_on_determining_filename_event f

op = {};

//> enable transition t
document.addEventListener('DOMContentLoaded', async () => {
    await x.delay(500);

    x.remove(s('.no_transition'));
});
//< enable transition t

//> localization t
(() => {
    let els = sa('[data-ih]');

    for (el of els) {
        el.innerHTML = x.message(el.dataset.ih); // ih = innerHTML
    }

    els = sa('[data-ihh]');

    for (el of els) {
        el.href = x.message(el.dataset.ihh); // ihh = innerHTML href
    }

    els = sa('[data-t]');

    for (el of els) {
        el.title = x.message(el.dataset.t); // t = title 
    }
})();
//< localization t

//> settings t
(() => {
    //>1 change settings (populate storage) t
    async function change_settings() {
        try {
            let o = await x.get('settings');

            let storage_name = this.dataset.storage;

            if (this.type === 'checkbox') {
                if (storage_name === 'show_download_img_btn') {
                    await ask_for_permission_or_remove_it({ permissions: ['downloads'] }, this, false);
                }

                o.settings[storage_name] = this.checked;

                expand_subotions(storage_name, o.settings[storage_name]);

                enable_or_disable_on_determining_filename_event(o);

            } else if (this.type === 'text') {
                o.settings[storage_name] = this.value;
            }

            x.set(o);

        } catch (er) {
            console.error(er);
        }
    }
    //<1 change settings (populate storage) t

    //>1 restore_settings_on_load f
    async function restore_settings_on_load() { // g
        let o = await x.get('settings');
        let els = sa('.settings_items');

        for (el of els) {
            let storage_name = el.dataset.storage;

            if (el.type === 'checkbox') {
                el.checked = o.settings[storage_name];

                expand_subotions(storage_name, o.settings[storage_name]);

                enable_or_disable_on_determining_filename_event(o);

            } else if (el.type === 'text') {
                el.value = o.settings[storage_name];
            }
        }
    }
    //<1 restore_settings_on_load f

    //>1 restore defaults t
    s('.restore_defaults_btn').addEventListener('click', function () {
        browser.runtime.getBackgroundPage(background => {
            background.set_default_settings(); // call function set_default_settings from background.js

            restore_settings_on_load();

            ask_for_permission_or_remove_it({ permissions: ['downloads'] }, null, true);
        });
    });
    //<1 restore defaults t 

    //>1 expand_subotions f
    function expand_subotions(storage_name, storage_vsalue) {
        let subotions = s('.' + storage_name + '_subotions');

        if (subotions) {
            if (storage_vsalue) {
                x.fade_in(subotions, false);

            } else {
                x.fade_out(subotions, false);
            }
        }
    }
    //<1 expand_subotions f

    //>1 ask for permission to be granted or remove it t
    function ask_for_permission_or_remove_it(permissions, el_to_uncheck, force_permission_removal) {
        return new Promise((resolve, reject) => {
            if (!force_permission_removal && (el_to_uncheck && el_to_uncheck.checked)) {
                browser.permissions.request(permissions, granted => {
                    if (browser.runtime.lastError) {
                        reject(browser.runtime.lastError.message);
                    }

                    if (granted) {
                        resolve();

                    } else {
                        el_to_uncheck.checked = false;

                        reject('Permission not granted.');
                    }
                });

            } else {
                browser.permissions.remove(permissions, removed => {
                    if (browser.runtime.lastError) {
                        reject(browser.runtime.lastError.message);
                    }

                    if (removed) {
                        resolve();
                    }
                });
            }
        });
    }
    //<1 ask for permission to be granted or remove it t

    //>1 enable_or_disable_on_determining_filename_event f
    function enable_or_disable_on_determining_filename_event(o) {
        if (o.settings.show_download_img_btn) {
            if (o.settings.show_save_as_dialog_on_img_download) {
                x.send_message_to_background({ message: 'disable_on_determining_filename_event' });

            } else {
                x.send_message_to_background({ message: 'enable_on_determining_filename_event' });
            }
        }
    }
    //<1 enable_or_disable_on_determining_filename_event f

    restore_settings_on_load();

    s('#download_imgs_path').addEventListener('input', change_settings);
    x.add_event_listener_to_multiple_els(document, '.settings_items', 'change', change_settings);
    x.add_event_listener_with_params_to_multiple_els(document, '.subotions', 'transitionend', x.set_faded_out_to_none, ['opacity_0']);
})();
//< settings t