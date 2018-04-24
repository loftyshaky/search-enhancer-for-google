//> set default settings t

//> on installed t

//> open options page when clicking on browser action t

//> change name of image on download t

//> on message t

b = {};

//> set default settings t
function set_default_settings() {
    x.set({
        'settings': {
            'turned_off': false,
            'show_site_icons': true,
            'show_server_locations': true,
            'stick_header': true,
            'compact_header': true,
            'show_scroll_to_top_btn': true,
            'show_page_separators': true,
            'show_paginator': true,
            'show_people_also_search_for': true,
            'show_turn_off_btn': true,
            'custom_keywords_color': true,
            'keywords_color': '#dd0000',
            'show_view_img_btn': true,
            'show_search_by_image_btn': true,
            'show_download_img_btn': false,
            'show_save_as_dialog_on_img_download': false,
            'show_download_all_imgs_btn': true,
            'show_view_img_btn_on_img_previews': true,
            'show_download_img_btn_on_img_previews': true,
            'show_search_by_image_btn_on_img_previews': true,
            'download_imgs_path': '',
            'unload_pages': false
        }
    });
}
//< set default settings t

//> on installed t
browser.runtime.onInstalled.addListener(async e => {
    if (e.reason === "install") {
        set_default_settings();

    } else if (e.reason === "update") {
        let o = await x.get('settings');

        if (!('compact_header' in o.settings)) { // 16 march 2018
            o.settings.compact_header = true;
        }

        if (!('show_people_also_search_for' in o.settings)) { // 8 april 2018
            o.settings.show_people_also_search_for = true;
        }

        if (!('show_view_img_btn' in o.settings)) { // 8 april 2018
            o.settings.show_view_img_btn = true;
        }

        if (!('show_download_img_btn' in o.settings)) { // 8 april 2018
            o.settings.show_download_img_btn = false;
        }

        if (!('show_save_as_dialog_on_img_download' in o.settings)) { // 8 april 2018
            o.settings.show_save_as_dialog_on_img_download = false;
        }

        if (!('download_imgs_path' in o.settings)) { // 8 april 2018
            o.settings.download_imgs_path = '';
        }

        if (!('unload_pages' in o.settings)) { //  april 17 2018
            o.settings.unload_pages = false;
        }

        if (!('unload_pages' in o.settings)) { //  april 17 2018
            o.settings.unload_pages = false;
        }

        if (!('keywords_color' in o.settings)) { //  april 17 2018
            o.settings.keywords_color = '#dd0000';
        }

        if (!('custom_keywords_color' in o.settings)) { //  april 19 2018
            o.settings.custom_keywords_color = true;
        }

        if (!('show_view_img_btn_on_img_previews' in o.settings)) { //  april 24 2018
            o.settings.show_view_img_btn_on_img_previews = true;
        }

        if (!('show_download_img_btn_on_img_previews' in o.settings)) { //  april 24 2018
            o.settings.show_download_img_btn_on_img_previews = true;
        }

        if (!('show_download_all_imgs_btn' in o.settings)) { //  april 24 2018
            o.settings.show_download_all_imgs_btn = true;
        }

        if (!('show_search_by_image_btn' in o.settings)) { //  april 24 2018
            o.settings.show_search_by_image_btn = true;
        }

        if (!('show_search_by_image_btn_on_img_previews' in o.settings)) { //  april 24 2018
            o.settings.show_search_by_image_btn_on_img_previews = true;
        }

        x.set(o);
    }
});
//< on installed t

//> open options page when clicking on browser action t
browser.browserAction.onClicked.addListener(activeTab => {
    browser.runtime.openOptionsPage()
});
//< open options page when clicking on browser action t

//> change name of image on download t
(async () => {
    b.change_name_of_image_on_download = (download_item, suggest) => {
        suggest({ filename: b.download_imgs_path + download_item.filename });
    };

    let o = await x.get('settings');

    if (Object.keys(o).length !== 0 && o.settings.show_download_img_btn && !o.settings.show_save_as_dialog_on_img_download) {
        browser.downloads.onDeterminingFilename.addListener(b.change_name_of_image_on_download);
    }
})()
//< change name of image on download t

//> on message t
browser.runtime.onMessage.addListener((message_o, sender, send_response) => {
    if (message_o.message === 'load_flag') {
        fetch('https://freegeoip.net/json/' + message_o.host).then(response => {
            return response.json();

        }).then(json => {
            message_o.country_code = json.country_code;
            message_o.country_name = json.country_name;

            send_response(message_o)

        }).catch(er => console.error(er));

        return true;

    } else if (message_o.message === 'view_img' || message_o.message === 'search_by_img') {
        browser.tabs.query({
            currentWindow: true,
            active: true

        }, tab => {
            browser.tabs.create({
                url: message_o.message !== 'search_by_img' ? message_o.img : 'https://www.google.ru/searchbyimage?&image_url=' + message_o.img,
                index: tab[0].index + 1,
                active: message_o.active
            });
        });

    } else if (message_o.message === 'download_img') {
        let download_item = {};

        download_item.url = message_o.img;

        if (!message_o.show_save_as_dialog_on_img_download && message_o.download_imgs_path !== '') {
            download_item.filename = 'img.png'; // will be replaced

        } else {
            download_item.saveAs = message_o.show_save_as_dialog_on_img_download;
        }

        x.get('settings').then(o => {
            b.download_imgs_path = o.settings.download_imgs_path;
            b.download_imgs_path = b.download_imgs_path[b.download_imgs_path.length - 1] !== '/' ? b.download_imgs_path + '/' : b.download_imgs_path

            browser.downloads.download(download_item, () => {
                if (browser.runtime.lastError) {
                    send_response('error');
                }
            });
        });

        return true;

    } else if (message_o.message === 'enable_on_determining_filename_event') {
        browser.downloads.onDeterminingFilename.addListener(b.change_name_of_image_on_download);

    } else if (message_o.message === 'disable_on_determining_filename_event') {
        browser.downloads.onDeterminingFilename.removeListener(b.change_name_of_image_on_download);
    }
});
//< on message t