//> get_window_scroll_top f

//> actions on page load t

//>1 get open in new tab google search setting t + //>2 decide how to open links t

//>1 localize t

//>1 show paginator if settings.show_paginator === true t

//>1 stick header if settings.stick_header === true t

//>1 hide people also search block if settings.show_people_also_search_for === false t

//>1 turn off / on button t

//>2 disable / enable infinity scroll t

//>1 scroll to top t

//>2 hide_or_show_scroll_to_top_btn f

//>2 scroll_to_top f

//>1 move related searches element on page load t

//>1 move extra titles (games, movies) and copyright notice ex search: need for speed 2015 t 

//>1 stick els on page load (execution; binding) t

//>1 load site icons on page load t

//>1 catch dom changes t + //>2 hide pagination when on appbar load slides t; //>2 append "View image" button t

//> loading o

//>1 load page t

//>2 load_page f + //>3 load loading bar t; //>3 append iframe to body t; //>3 decide how to open links t; //>3 fix css of results and separator t; //>3 hide people also search block if settings.show_people_also_search_for === false t; //>3 load site icons (execution) t; //>3 update element with namber of pages t; //>3 handle image section t

//>2 get_search_results_height f

//>2 resize_iframe f

//>2 resize_iframe_on_its_body_resize f

//>2 open_img f

//>2 show_message_to_user f

//>1 load site icons and run load flags function t

//>1 load_site_flags f

//>1 set_link_opening_rule f

//>1 fix non clickable, non hoverable site flags (title not showing) t

//>1 generate_unique_id f

//> sticking elements t

//>1 stick or unstick pagination, turn off / on button and header t + //>2 pagination and turn_off_btn t;  //>2 related searches t; //<2 header f; //>3 fix bug with image viewer (bug: 4/6/18 4:15 AM) t; //>3 hide tools menu t

//>1 get_header_size f

//>1 set_stick_size f

//>1 get_margin_of_view_saved_or_safe_search f

//>1 hide paginator and turn off btn if appbar visible t

//>1 move_related_searches_el f

//>1 set_box_shadow_on_searchbar_if_not_on_top t

//> view_or_download_img o

//>1 append_view_and_download_img_btns f + //>2 set height of my_img_action_trs to eight of tallest td in image viewer t;

//>1 view_or_download_img f

//>1 send_message_to_background_to_view_or_download_img f

cs = {};
svg = {};
settings = {};
locale = {};

cs.open_search_results_in_new_tab = true;

svg.turn_off = '<svg viewBox="0 0 100 100"><g><path d="M50.304,99.651C24.221,99.651,3,78.431,3,52.348c0-13.036,5.459-25.621,14.979-34.534   c2.42-2.256,6.201-2.13,8.463,0.278c2.256,2.414,2.133,6.201-0.281,8.46c-7.218,6.756-11.192,15.917-11.192,25.797   c0,19.485,15.85,35.335,35.335,35.335s35.335-15.85,35.335-35.335c0-9.658-3.828-18.681-10.777-25.402   c-2.373-2.297-2.437-6.087-0.14-8.463c2.297-2.367,6.084-2.443,8.463-0.14c9.298,8.997,14.424,21.075,14.424,34.005   C97.608,78.431,76.387,99.651,50.304,99.651z"></path></g><path d="M50.304,51.19c-3.308,0-5.985-2.68-5.985-5.985V5.985C44.319,2.68,46.996,0,50.304,0s5.985,2.68,5.985,5.985  v39.221C56.288,48.511,53.612,51.19,50.304,51.19z"></path></svg>';
svg.image = '<svg viewBox="0 0 89.8 89.8""><g><path d="M80.1,4.9H9.9C4.4,4.9,0,9.3,0,14.8V75c0,5.5,4.4,9.9,9.9,9.9h70.2c5.5,0,9.9-4.4,9.9-9.9V14.8C90,9.3,85.6,4.9,80.1,4.9z M10,75v-8l20.2-20.2l31.7,28.1L10,75z M80,74.9h-3.1L55.8,56.2L65,47l1 ,15V74.9z M68.5,36.4c-2-2-5.1-2-7.1,0L48.3,49.5l-15-13.3 c-2-1.8-5-1.7-6.9,0.2L10,52.9l-0.1-38L80,14.8v33L68.5,36.4z"/></g></svg>';
svg.download = '<svg viewBox="0 0 17 17"><style type="text/css">.st0{fill:none;}</style><path d="M15.5,6h-4V0h-6v6h-4l7,7L15.5,6z M1.5,15v2h14v-2H1.5z"/><path class="st0" d="M-3.5-3h24v24h-24V-3z"/></svg>';


(async () => {
    let o = await x.get('settings');

    settings.turned_off = o.settings.turned_off;
    settings.show_site_icons = o.settings.show_site_icons;
    settings.show_server_locations = o.settings.show_server_locations;
    settings.stick_header = o.settings.stick_header;
    settings.compact_header = o.settings.compact_header;
    settings.show_scroll_to_top_btn = o.settings.show_scroll_to_top_btn;
    settings.show_page_separators = o.settings.show_page_separators;
    settings.show_paginator = o.settings.show_paginator;
    settings.show_people_also_search_for = o.settings.show_people_also_search_for;
    settings.show_turn_off_btn = o.settings.show_turn_off_btn;
    settings.show_view_img_btn = o.settings.show_view_img_btn;
    settings.show_download_img_btn = o.settings.show_download_img_btn;
    settings.show_save_as_dialog_on_img_download = o.settings.show_save_as_dialog_on_img_download;
    settings.download_imgs_path = o.settings.download_imgs_path;
})();

//> get_window_scroll_top f
cs.get_window_scroll_top = () => {
    return document.documentElement.scrollTop;
}
//< get_window_scroll_top f

//> actions on page load t
document.addEventListener('DOMContentLoaded', async () => {
    //>1 get open in new tab google search setting t
    (() => {
        let preferences_iframe = x.create('iframe', ext_id('preferences_iframe'));

        preferences_iframe.onload = () => {
            let open_search_results_in_new_tab_hidden_input_value = sb(preferences_iframe.contentDocument, '#nwc').nextElementSibling.value;

            if (open_search_results_in_new_tab_hidden_input_value === '0') {
                cs.open_search_results_in_new_tab = false;
            }

            //>2 decide how to open links t
            cs.loading.set_link_opening_rule(null, false);
            //<2 decide how to open links t

            x.remove(preferences_iframe);
        };

        preferences_iframe.src = window.location.origin + '/preferences';
        x.append(document.body, preferences_iframe);
    })();
    //<1 get open in new tab google search setting t

    //>1 localize t
    locale.view_img_btns_text = 'View image';
    locale.download_img_btns_text = 'Download image';
    locale.img_download_error_alert = 'An error occurred while downloading the image.';
    locale.message_to_user_error_text = "An error occured. Google thinks you're a robot. Reload the page and solve captcha.";
    locale.message_to_user_last_page_text = 'Last page.';

    (() => {
        let all = s('#hdtb-msb-vis .hdtb-mitem');

        if (all) {
            if (all.textContent === 'Все') {
                locale.view_img_btns_text = 'Открыть в полном размере';
                locale.download_img_btns_text = 'Скачать картинку';
                locale.img_download_error_alert = 'Произошла ошибка при скачивании картинки.';
                locale.message_to_user_error_text = 'Произошла ошибка. Google думает что вы робот. Перезагрузите страницу и решите каптчу.';
                locale.message_to_user_last_page_text = 'Последняя страница.';
            }
        }
    })();
    //<1 localize t

    await x.delay(0);

    //>1 show paginator if settings.show_paginator === true t
    (() => {
        let paginator = s('#navcnt');

        if (settings.show_paginator && paginator) {
            x.add_class(paginator, ext_id('visible'));

            paginator.offsetWidth;
        }
    })();
    //<1 show paginator t

    //>1 stick header if settings.stick_header === true t
    if (settings.stick_header) {
        x.load_css(document, 'sticky_header');
    }
    //<1 stick header if settings.stick_header === true t

    //>1 hide people also search block if settings.show_people_also_search_for === false t
    if (!settings.show_people_also_search_for) {
        x.load_css(document, 'hiddden_people_also_search_for');
    }
    //<1 hide people also search block if settings.show_people_also_search_for === false t

    //>1 turn off / on button t
    (() => {
        let paginator = s('#navcnt');

        if (paginator) {
            if (settings.show_turn_off_btn) {
                if (!s('#gs_si0')) { // if not google home page or Images page
                    let turn_off_btn = x.create('button', ext_id('turn_off_btn'));
                    turn_off_btn.innerHTML = svg.turn_off;
                    x.append(document.body, turn_off_btn);

                    if (settings.turned_off) {
                        x.add_class(turn_off_btn, ext_id('turned_off'));
                    }

                    turn_off_btn.addEventListener('click', toggle_infinity_scroll);
                }

            } else {
                if (settings.stick_header) {
                    x.add_class(s('#navcnt'), ext_id('paginator_when_turn_off_btn_hidden_and_header_sticked'));

                } else {
                    x.add_class(s('#navcnt'), ext_id('paginator_when_turn_off_btn_hidden_and_header_unsticked'));
                }
            }
        }

        //>2 disable / enable infinity scroll t
        async function toggle_infinity_scroll() {
            let o = await x.get('settings');

            let turn_off_btn = s('.' + ext_id('turn_off_btn'));

            if (settings.turned_off) {
                settings.turned_off = false;
                o.settings.turned_off = false;

                x.remove_class(turn_off_btn, ext_id('turned_off'));

            } else {
                settings.turned_off = true;
                o.settings.turned_off = true;

                x.add_class(turn_off_btn, ext_id('turned_off'));
            }

            x.set(o);
        }
        //<2 disable / enable infinity scroll t
    })();
    //<1 turn off / on button t

    //>1 scroll to top t
    (() => {
        if (settings.show_scroll_to_top_btn) { //> create scroll to top button if settings.show_scroll_to_top_btn === true t
            var scroll_to_top_btn = x.create('div', ext_id('scroll_to_top_btn') + ' ' + ext_id('none'));
            x.append(document.body, scroll_to_top_btn);

            scroll_to_top_btn.addEventListener('click', scroll_to_top);
            window.addEventListener('scroll', hide_or_show_scroll_to_top_btn);

            hide_or_show_scroll_to_top_btn();

            //>2 hide_or_show_scroll_to_top_btn f
            function hide_or_show_scroll_to_top_btn() {

                if (cs.get_window_scroll_top() === 0) {
                    if (!x.has_class(scroll_to_top_btn, ext_id('none'))) {
                        x.fade_out(scroll_to_top_btn, true);

                    } else {
                        x.add_class(scroll_to_top_btn, ext_id('opacity_0'));
                    }

                } else {
                    if (x.has_class(scroll_to_top_btn, ext_id('opacity_0'))) {
                        x.fade_in(scroll_to_top_btn, true);

                    } else {
                        x.remove_class(scroll_to_top_btn, ext_id('none'));
                    }
                }
            }
            //<2 hide_or_show_scroll_to_top_btn f
        }

        //>2 scroll_to_top f
        function scroll_to_top() {
            document.documentElement.scrollTop = 0;

            if (scroll_to_top_btn) { // if scroll to top button exist; declared above (var scroll_to_top_btn = x.create('div', ext_id('scroll_to_top_btn') + ' ' + ext_id('opacity_0'));)
                x.fade_out(scroll_to_top_btn, true);
            }
        }
        //<2 scroll_to_top f

        s('#hdtb-tls').addEventListener('click', scroll_to_top); // scroll to top when clicking on "Tools" button
    })();
    //<1 scroll to top t

    //>1 move related searches element on page load t
    (() => {
        let related_searches_el = s('#brs');
        cs.sticking.move_related_searches_el(related_searches_el);
    })();
    //<1 move related searches element on page load t

    //>1 move extra titles (games, movies) and copyright notice ex search: need for speed 2015 t 
    (() => {
        let rhs_block = s('#rhs_block');

        if (rhs_block) {
            x.append(rhs_block, s('#extrares'));
        }
    })();
    //<1 move extra titles (games, movies) and copyright notice ex search: need for speed 2015 t 

    //>1 stick els on page load (execution; binding) t
    cs.sticking.stick_els();

    window.addEventListener('scroll', cs.sticking.stick_els);
    window.addEventListener('resize', cs.sticking.stick_els);
    //<1 stick els on page load (execution; binding) t

    //>1 load site icons on page load t
    (() => {
        var search_results = sa('.g:not(.mnr-c):not(.knavi)'); // knavi ex search: de

        for (search_result of search_results) {
            cs.loading.load_site_icons(search_result, 'not_iframe');
        }
    })();
    //<1 load site icons on page load t

    //>1 catch dom changes t
    (() => {
        let observer = new MutationObserver(function (mutations) {
            for (mutation of mutations) {
                let target = mutation.target;

                //>2 hide pagination when on appbar load slides t
                let paginator = sb(target, '#navcnt');

                if (paginator) {
                    cs.sticking.hide_paginator_and_turn_off_btn();
                }
                //<2 hide pagination when on appbar load slides t

                //>2 append "View image" button t
                cs.view_or_download_img.append_view_and_download_img_btns(target);
                //<2 append "View image" button t
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    })();
    //<1 catch dom changes t
});
//< actions on page load t

//> loading o
cs.loading = (() => {
    //>1 set variables t
    let loading_iframe = false;
    let el_to_insert_iframe_after;
    let current_search_results_height = 9999999999;
    let loading_bar_html = '<div id="fountainG_1" class="fountainG"></div><div id="fountainG_2" class="fountainG"></div><div id="fountainG_3" class="fountainG"></div><div id="fountainG_4" class="fountainG"></div><div id="fountainG_5" class="fountainG"></div><div id="fountainG_6" class="fountainG"></div><div id="fountainG_7" class="fountainG"></div><div id="fountainG_8" class="fountainG"></div>';

    document.addEventListener('DOMContentLoaded', async () => {
        current_search_results_height = await get_search_results_height();

        let search_results = sa('#rso .bkWMgd:not(:empty)'); // sometimes last bkWMgd is empty :not(:empty) prevents selecting it

        el_to_insert_iframe_after = search_results[search_results.length - 1];
    });
    //<1 set variables t

    //>1 load page t
    //>2 load_page f
    function load_page() {
        if (Math.max(current_search_results_height - (window.pageYOffset + window.innerHeight), 0) < 400 && !loading_iframe && !settings.turned_off) { // check distance between scroll position and bottom of page and load page if specified condition met t
            loading_iframe = true;
            let last_g = sab(el_to_insert_iframe_after.contentDocument ? el_to_insert_iframe_after.contentDocument : el_to_insert_iframe_after, '.g');
            last_g = last_g[last_g.length - 1];

            if (el_to_insert_iframe_after) {
                let current_page_el = s('#foot .cur');

                if (current_page_el && current_page_el.nextElementSibling && sb(current_page_el.nextElementSibling, '.fl')) { // if not last page // !s('.sr__price-range') - if not shopping page 
                    if (!s('.sr__price-range')) { //if not shopping page 
                        //>3 load loading bar t
                        let loading_bar = document.createElement('div');
                        loading_bar.id = 'fountainG';
                        loading_bar.innerHTML = loading_bar_html;
                        x.after(el_to_insert_iframe_after, loading_bar);
                        //<3 load loading bar t

                        //>3 append iframe to body t
                        let next_page_url = sb(current_page_el.nextElementSibling, '.fl').href;
                        let iframe_id = 'iframe_' + generate_unique_id();

                        let iframe = x.create('iframe', ext_id('iframe') + ' ' + ext_id('none'));
                        iframe.id = iframe_id;
                        iframe.src = next_page_url;
                        x.after(el_to_insert_iframe_after, iframe);

                        el_to_insert_iframe_after = iframe;
                        //<3 append iframe to body t

                        iframe.onload = () => {
                            //>3 decide how to open links t
                            try {
                                cs.loading.set_link_opening_rule(iframe, true);

                            } catch (er) { // if google thinks you are robot
                                x.remove(loading_bar);

                                show_message_to_user(iframe, 'error');

                                return;
                            }

                            //<3 decide how to open links t

                            iframe.contentDocument.body.className += ext_id('none') + ' ' + ext_id('opacity_0');

                            if (settings.show_page_separators) {
                                var separator = x.create('div', ext_id('separator') + ' ' + ext_id('none') + ' ' + ext_id('opacity_0'));
                                separator.textContent = +current_page_el.textContent + 1;
                                x.before(iframe, separator);
                            }

                            let iframe_css = x.load_css(iframe.contentDocument, 'iframe');

                            iframe_css.onload = () => {
                                x.remove(loading_bar);

                                let new_search_results = sab(iframe.contentDocument, '#rso .bkWMgd');

                                //>3 fix css of results and separator t
                                let first_g_in_inserted_iframe = sb(iframe.contentDocument, '.g');

                                if (first_g_in_inserted_iframe.id === 'imagebox_bigimages') {
                                    last_g.style.marginBottom = '0';

                                    if (separator) {
                                        x.add_class(separator, ext_id('separator_of_image_and_text_results'));
                                    }

                                } else {
                                    last_g.style.marginBottom = '24px';
                                }
                                //<3 fix css of results and separator t

                                if (separator) {
                                    x.fade_in(separator, true);
                                }

                                x.remove_class(iframe, ext_id('none'));

                                x.fade_in(iframe.contentDocument.body, true);

                                let cs_and_iframe_css = x.load_css(iframe.contentDocument, 'cs_and_iframe');

                                //>3 hide people also search block if settings.show_people_also_search_for === false t
                                if (!settings.show_people_also_search_for) {
                                    x.load_css(iframe.contentDocument, 'hiddden_people_also_search_for');
                                }
                                //<3 hide people also search block if settings.show_people_also_search_for === false t

                                cs_and_iframe_css.onload = async () => {
                                    await resize_iframe(iframe);

                                    current_search_results_height = await get_search_results_height();

                                    //>3 load site icons (execution) t
                                    for (new_search_result of new_search_results) {
                                        let gs = sab(new_search_result, '.g');

                                        for (g of gs) {
                                            cs.loading.load_site_icons(g, iframe_id);
                                        }
                                    }
                                    //<3 load site icons (execution) t

                                    //>3 update element with namber of pages t
                                    let nav = s('#nav');
                                    let el_to_append_iframe_nav = nav.parentNode;
                                    let iframe_nav = sb(iframe.contentDocument, '#nav');

                                    x.remove(nav);

                                    x.append(el_to_append_iframe_nav, iframe_nav);
                                    //<3 update element with namber of pages t

                                    //>3 handle image section t
                                    let links = sab(iframe.contentDocument, '#imagebox_bigimages a.iu-card-header, #imagebox_bigimages a.Q2MMlc'); // Images for x;  More images for x

                                    for (link of links) {
                                        link.setAttribute('target', '_parent');
                                    }

                                    let el_that_makes_imgs_link_opening_in_iframe = sb(iframe.contentDocument, '#imagebox_bigimages div[data-rtid]');

                                    if (el_that_makes_imgs_link_opening_in_iframe) {
                                        el_that_makes_imgs_link_opening_in_iframe.removeAttribute('data-rtid');
                                    }

                                    x.add_event_listener_to_multiple_els(iframe.contentDocument, '#imagebox_bigimages a.bia', 'click', open_img);
                                    //<3 handle image section t

                                    iframe.contentDocument.body.dataset.id = iframe_id;

                                    resize_iframe_on_its_body_resize(iframe.contentDocument.body);

                                    loading_iframe = false;
                                };
                            }
                        };
                    }

                } else {
                    show_message_to_user(el_to_insert_iframe_after, 'last_page');
                }

            } else {
                loading_iframe = false;
            }
        }
    }
    //<2 load_page f

    //>2 get_search_results_height f
    async function get_search_results_height() {
        await x.delay(0);

        return s('#center_col').offsetHeight;
    }
    //<2 get_search_results_height f

    //>2 resize_iframe f
    async function resize_iframe(iframe) {
        await x.delay(0);

        iframe.style.height = iframe.contentDocument.body.scrollHeight + 'px';
        iframe.style.width = iframe.contentDocument.body.scrollWidth + 'px';
    }
    //<2 resize_iframe f

    //>2 resize_iframe_on_its_body_resize f
    function resize_iframe_on_its_body_resize(iframe_body) {
        let observer = new MutationObserver(function (mutations) {
            for (mutation of mutations) {
                var iframe_id = mutation.target.closest('body').dataset.id;

                resize_iframe(s('#' + iframe_id));
            }
        });

        observer.observe(iframe_body, { childList: true, subtree: true, attributes: true, characterData: true });

    }
    //<2 resize_iframe_on_its_body_resize f

    //>2 open_img f
    function open_img() {
        window.parent.location.href = this.href;
    }
    //<2 open_img f

    //>2 show_message_to_user f
    function show_message_to_user(el_to_insert_after, class_suffix) {
        var message_to_user = x.create('div', ext_id('message_to_user') + ' ' + ext_id('message_to_user_' + class_suffix) + ' ' + ext_id('none') + ' ' + ext_id('opacity_0'));
        message_to_user.textContent = locale['message_to_user_' + class_suffix + '_text'];
        x.after(el_to_insert_after, message_to_user);

        x.fade_in(message_to_user, true);
    }
    //<2 show_message_to_user f
    //<1 load page t

    //>1 load site icons and run load flags function t
    function load_site_icons(search_result, iframe_id) { // g
        let link_el = sb(search_result, 'a');

        if (link_el && (!search_result.id || search_result.id !== 'imagebox_bigimages')) { // if ordinary search result (not images)
            let path_array = link_el.href.split('/');
            let host = path_array[2];
            let host_with_protocol = path_array[0] + '//' + host; // path_array[0] = protocol
            let icons_wrapper_2_id = 'icons_wrapper_' + generate_unique_id();

            let icons_wrapper_1 = x.create('div', ext_id('icons_wrappers_1'));
            x.before(search_result, icons_wrapper_1);

            let icons_wrapper_2 = x.create('div', ext_id('icons_wrappers_2'));
            icons_wrapper_2.id = icons_wrapper_2_id;
            x.append(icons_wrapper_1, icons_wrapper_2);

            if (settings.show_site_icons) {
                let site_icon = x.create('img', ext_id('site_icon') + ' ' + ext_id('favicons_and_flags') + ' ' + ext_id('opacity_0'));
                site_icon.src = 'https://www.google.com/s2/favicons?domain_url=' + host_with_protocol;
                x.append(icons_wrapper_2, site_icon);

                x.fade_in(site_icon, true);
            }

            if (settings.show_server_locations) {
                load_site_flags(host, iframe_id, icons_wrapper_2_id);
            }
        }
    }
    //<1 load site icons and run load flags function t

    //>1 load_site_flags f
    function load_site_flags(host, iframe_id, icons_wrapper_2_id) {
        browser.runtime.sendMessage({ 'message': 'load_flag', host: host, iframe_id: iframe_id, icons_wrapper_2_id: icons_wrapper_2_id }, response_o => {
            if (response_o.iframe_id === 'not_iframe') {
                var doc = document;

            } else {
                var doc = s('#' + response_o.iframe_id).contentDocument;
            }

            let icons_wrapper_2 = sb(doc, '#' + response_o.icons_wrapper_2_id);

            let site_flag = x.create('img', ext_id('site_flag') + ' ' + ext_id('favicons_and_flags') + ' ' + ext_id('opacity_0'));
            site_flag.title = response_o.country_name;
            site_flag.src = browser.extension.getURL("/flags/" + response_o.country_code + ".png");
            x.as_first(icons_wrapper_2, site_flag);

            x.fade_in(site_flag, true);

            site_flag.addEventListener('transitionend', () => {
                fix_non_clickable_site_flags(iframe_id, 0);
                fix_non_clickable_site_flags(iframe_id, 500);
            });
        });
    }
    //<1 load_site_flags f

    //>1 set_link_opening_rule f
    function set_link_opening_rule(iframe, one_iframe) { // g
        if (cs.open_search_results_in_new_tab) { // if open links in new window google search setting enabled (=is_true) t
            var target = 'target';

        } else { // if disabled
            var target = 'parent';
        }

        let html = '<base class="' + ext_id('link_opening_rule') + '"target="_' + target + '">';

        if (one_iframe) {
            iframe.contentDocument.head.insertAdjacentHTML('beforeend', html);

        } else {
            let iframes = sa('.' + ext_id('iframe'));

            for (iframe of iframes) {
                if (iframe.contentDocument.head) {
                    x.remove(sb(iframe.contentDocument.head, '.' + ext_id('link_opening_rule')));

                    iframe.contentDocument.head.insertAdjacentHTML('beforeend', html);
                }
            }
        }
    }
    //<1 set_link_opening_rule f

    //>1 fix non clickable, non hoverable site flags (title not showing) t
    async function fix_non_clickable_site_flags(iframe_id, delay) {
        await x.delay(delay);

        if (iframe_id !== 'not_iframe') {
            let iframe = s('#' + iframe_id);

            iframe.style.marginBottom = '0.1px';

            await x.delay(100);

            iframe.style.marginBottom = 'unset';
        }
    }
    //<1 fix non clickable, non hoverable site flags (title not showing) t

    //>1 generate_unique_id f
    function generate_unique_id() {
        return Date.now() + Math.random().toString(36).substring(2);
    }
    //<1 generate_unique_id f

    window.addEventListener('scroll', load_page);

    return {
        load_site_icons: load_site_icons,
        set_link_opening_rule: set_link_opening_rule
    }
})();
//< loading o

//> sticking elements t
cs.sticking = (() => {
    //>1 stick or unstick pagination, turn off / on button and header t
    function stick_els() {
        let scroll_top = cs.get_window_scroll_top();
        let header_size_o = get_header_size();

        if (!s('#gs_si0')) { // if not google home page or Images page
            //>2 pagination and turn_off_btn t
            let turn_off_btn = s('.' + ext_id('turn_off_btn'));
            let pagination = s('#navcnt');
            let turn_off_btn_modifier = 46;
            let pagination_modifier = 93;

            if (scroll_top >= header_size_o.size) {
                var stick_size = set_stick_size(header_size_o.size, true);
                var toggle_f = 'add_class';

            } else {
                var stick_size = set_stick_size(header_size_o.size, false);
                var toggle_f = 'remove_class';
            }

            if (turn_off_btn) {
                turn_off_btn.style.top = stick_size + turn_off_btn_modifier + 'px';
                pagination.style.top = stick_size + pagination_modifier + 'px';

                x[toggle_f](turn_off_btn, ext_id('fixed'));
                x[toggle_f](pagination, ext_id('fixed'));
            }
            //<2 pagination and turn_off_btn t

            //>2 related searches t
            let related_searches = s('#brs');
            let sidepanel = s('#rhs_block');
            let appbar = s('#appbar');

            if (sidepanel && related_searches && appbar) {
                let sidepanel_height = sidepanel.offsetHeight;
                let appbar_height = appbar.offsetHeight;
                let related_searches_modifier = 61;
                let stick_size_1 = settings.stick_header ? 0 : header_size_o.size

                if (scroll_top >= sidepanel_height + appbar_height + stick_size_1 - related_searches_modifier) {
                    var stick_size_2 = set_stick_size(header_size_o.size, true);
                    var toggle_f = 'add_class';

                } else {
                    var stick_size_2 = set_stick_size(header_size_o.size, false);
                    var toggle_f = 'remove_class';
                }

                related_searches.style.top = stick_size_2 + related_searches_modifier + 'px';

                x[toggle_f](related_searches, ext_id('fixed'));
            }
            //<2 related searches t
        }

        //<2 header f
        if (settings.compact_header) {
            let search_input_form = s('.sfbg.nojsv');
            let all_images_etc = s('#top_nav');

            if (header_size_o.is_compact) {
                x.append(search_input_form, all_images_etc);

                x.load_css(document, 'compact_header');

            } else {
                let bst = s('#bst');

                x.after(bst, all_images_etc);

                x.remove(s('.' + ext_id('compact_header')))
            }

            //>3 fix bug with image viewer (bug: 4/6/18 4:15 AM) t 
            let irc_bg = s('#irc_bg');

            if (irc_bg) {
                irc_bg.style.top = s('#irc_pbg').getBoundingClientRect().top + cs.get_window_scroll_top() + 'px';
            }
            //<3 fix bug with image viewer (bug: 4/6/18 4:15 AM) t 

            //>3 hide tools menu t
            if (scroll_top !== 0) {
                x.add_class(s('#hdtbMenus'), ext_id('none'));

            } else {
                x.remove_class(s('#hdtbMenus'), ext_id('none'));
            }
            //<3 hide tools menu t
        }
        //<2 header t
    }
    //<1 stick or unstick pagination, turn off / on button and header t

    //>1 get_header_size f
    function get_header_size() {
        let header_size_o = {};
        let compare_value = document.documentElement.clientWidth + 29; // gap between all, images etc and login items should be 40px when language of google.com is english
        let scroll_top = cs.get_window_scroll_top();
        let nav_bar_items = sa('#tsf, .gb_nb.gb_Lg.gb_R.gb_Kg.gb_T, #hdtb-msb .hdtb-mitem, #ab_ctls .ab_ctl, #hdtb-tls'); // #tsf = google logo search input; .gb_nb.gb_Lg.gb_R.gb_Kg.gb_T = login items; #hdtb-msb .hdtb-mitem = all, images etc; #ab_ctls .ab_ctl = view saved, safe search; #hdtb-tls = tools
        let all_images_etc_and_safe_search_and_view_saved_items = sa('#hdtb-msb .hdtb-mitem, #hdtb-tls, #ab_ctls .ab_ctl');
        let el_to_hide_index = all_images_etc_and_safe_search_and_view_saved_items.length - 1;
        let is_image_tab = s('#ab_ctls .ab_ctl');
        let header_els_width = 0;
        let compare_value_modifier = 0;

        for (item of all_images_etc_and_safe_search_and_view_saved_items) {
            x.remove_class(item, ext_id('hidden'));
        }

        for (item of nav_bar_items) {
            let el_width = item.offsetWidth + get_margin_of_view_saved_or_safe_search(item);

            header_els_width += el_width;
        }

        if (is_image_tab) { // if images tab
            compare_value -= 15;
        }

        if (settings.stick_header && settings.compact_header && (scroll_top !== 0 || (scroll_top === 0 && compare_value >= header_els_width))) { // don't resize header when first loaded if ((stick_els_f_runned_once || scroll_top !== 0) && settings.stick_header && settings.compact_header && (scroll_top !== 0 || (scroll_top === 0 && compare_value > header_els_width)))
            header_size_o.size = 65;
            header_size_o.is_compact = true;

        } else {
            header_size_o.size = 123;
            header_size_o.is_compact = false;
        }

        if (scroll_top !== 0 && settings.stick_header && settings.compact_header) {
            while (el_to_hide_index !== - 1 && compare_value + (is_image_tab && !x.has_class(all_images_etc_and_safe_search_and_view_saved_items[el_to_hide_index], 'ab_ctl') ? 16 : 0) < header_els_width) {
                x.add_class(all_images_etc_and_safe_search_and_view_saved_items[el_to_hide_index], ext_id('hidden'));

                header_els_width -= all_images_etc_and_safe_search_and_view_saved_items[el_to_hide_index].offsetWidth + get_margin_of_view_saved_or_safe_search(all_images_etc_and_safe_search_and_view_saved_items[el_to_hide_index]);

                el_to_hide_index--;
            }
        }

        return header_size_o;
    }
    //<1 get_header_size f

    //>1 set_stick_size f
    function set_stick_size(header_size, el_pinned) {
        return settings.stick_header || !el_pinned ? header_size : 0;
    }
    //<1 set_stick_size f

    //>1 get_margin_of_view_saved_or_safe_search f
    function get_margin_of_view_saved_or_safe_search(el) {
        if (x.has_class(el, 'ab_ctl')) { // if view saved or safe search
            return parseInt(window.getComputedStyle(el).marginLeft);

        } else {
            return 0;
        }
    }
    //<1 get_margin_of_view_saved_or_safe_search f

    //>1 hide paginator and turn off btn if appbar visible t
    function hide_paginator_and_turn_off_btn() { // g (search example: movies)
        let appbar = s('#appbar');

        if (appbar) {
            let appbar_height = appbar.offsetHeight;
            let turn_off_btn = s('.' + ext_id('turn_off_btn'));
            let paginator = s('#navcnt');

            if (paginator, turn_off_btn) {
                if (settings.stick_header) {
                    var moddifier = 0;

                } else {
                    var moddifier = 100;
                }

                if (appbar_height > 100 && cs.get_window_scroll_top() < appbar_height + moddifier) {
                    if (settings.show_turn_off_btn) {
                        x.add_class(turn_off_btn, ext_id('none'));
                    }

                    if (settings.show_paginator) {
                        x.remove_class(paginator, ext_id('visible'));
                    }

                } else {
                    if (settings.show_turn_off_btn) {
                        x.remove_class(turn_off_btn, ext_id('none'));
                    }

                    if (settings.show_paginator) {
                        x.add_class(paginator, ext_id('visible'));
                    }
                }
            }
        }
    }
    //<1 hide paginator and turn off btn if appbar visible t

    //>1 move_related_searches_el f
    function move_related_searches_el(related_searches_el) { // g
        if (related_searches_el) {
            let sidepanel = s('#rhs_block');

            if (sidepanel) {
                x.after(sidepanel, related_searches_el)

                related_searches_el.offsetWidth;
            }
        }
    }
    //<1 move_related_searches_el f

    //>1 set_box_shadow_on_searchbar_if_not_on_top t
    function set_box_shadow_on_searchbar_if_not_on_top() {
        let searchbar = s('#hdtb-s');
        let sfbgx = s('.sfbgx');

        if (searchbar) {
            if (cs.get_window_scroll_top() !== 0) {
                if (settings.stick_header) {
                    x.add_class(searchbar, ext_id('header_scroll_box_shadow'));
                }

                x.add_class(sfbgx, ext_id('header_scroll_box_shadow'));

            } else {
                x.remove_class(searchbar, ext_id('header_scroll_box_shadow'));
                x.remove_class(sfbgx, ext_id('header_scroll_box_shadow'));
            }
        }
    };
    //<1 set_box_shadow_on_searchbar_if_not_on_top t

    window.addEventListener('scroll', hide_paginator_and_turn_off_btn);
    window.addEventListener('scroll', set_box_shadow_on_searchbar_if_not_on_top);

    return {
        stick_els: stick_els,
        hide_paginator_and_turn_off_btn: hide_paginator_and_turn_off_btn,
        move_related_searches_el: move_related_searches_el
    }
})();
//< sticking elements t

//> view_or_download_img o
cs.view_or_download_img = (() => {
    //>1 append_view_and_download_img_btns f
    function append_view_and_download_img_btns(basae_element) {
        if (settings.show_view_img_btn || settings.show_download_img_btn) {
            let img_viewer_btn_wrappers = sab(basae_element, '.iAcjwd.irc_but_r tr');

            if (img_viewer_btn_wrappers[0]) {
                let my_img_action_trs = sa('.' + ext_id('my_img_action_trs'));

                //>2 set height of my_img_action_trs to eight of tallest td in image viewer t
                if (my_img_action_trs[0]) {
                    for (my_img_action_tr of my_img_action_trs) {
                        my_img_action_tr.style.height = img_viewer_btn_wrappers[0].offsetHeight + 'px';
                    }
                }
                //<2 set height of my_img_action_trs to eight of tallest td in image viewer t

                if (!my_img_action_trs[0]) {
                    for (img_viewer_btn_wrapper of img_viewer_btn_wrappers) {
                        let view_img_btn_html = '';
                        let download_img_btn_html = '';

                        if (settings.show_view_img_btn) {
                            view_img_btn_html = '<td><a class="' + ext_id('view_img_btns') + ' ' + ext_id('my_img_action_btns') + '" tabindex="0"><span class="RL3J9c Cws1Yc wmCrUb">' + svg.image + '</span><span class="Tl8XHc">' + locale.view_img_btns_text + '</span></a></td>';
                        }

                        if (settings.show_download_img_btn) {
                            download_img_btn_html = '<td><a class="' + ext_id('download_img_btns') + ' ' + ext_id('my_img_action_btns') + '" tabindex="0"><span class="RL3J9c Cws1Yc wmCrUb">' + svg.download + '</span><span class="Tl8XHc">' + locale.download_img_btns_text + '</span></a></td>';
                        }

                        img_viewer_btn_wrapper.insertAdjacentHTML('afterend', '<tr class="' + ext_id('my_img_action_trs') + '"> ' + view_img_btn_html + download_img_btn_html + '</tr>');

                        x.add_event_listener_to_multiple_els(document.body, '.' + ext_id('my_img_action_btns'), 'mousedown', view_or_download_img);
                    }
                }
            }
        }
    }
    //<1 append_view_and_download_img_btns f

    //>1 view_or_download_img f
    function view_or_download_img(e) {
        let mouse_btn = e.button;

        if (mouse_btn !== 2) { // if not right-click
            e.preventDefault();

            let immersive_container = x.get_parent_with_class(this, 'immersive-container', 50);
            let link_el = sb(immersive_container, '.irc_mi');
            let progress_bar = sb(immersive_container, '.jfk-progressBar-blocking');

            if (mouse_btn === 0) { // when left-clicking
                var active = true;

            } else if (mouse_btn === 1) { // when middle-clicking
                var active = false;
            }

            if (link_el.hasAttribute('style') || progress_bar.style.display === '') { // ex: (link_el.hasAttribute('style')) https://www.google.ru/search?q=red+sox&newwindow=1&rlz=1C1CHBF_enRU766RU766&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjU5OLM1u7ZAhVJJJoKHS0-B6gQ_AUICigB&biw=1920&bih=959#imgrc=0GsOwU2643JxYM: || ex: (progress_bar.style.display === '' [when progressbar visible]) https://www.google.ru/search?newwindow=1&rlz=1C1CHBF_enRU766RU766&biw=1920&bih=959&tbm=isch&sa=1&ei=nNWqWoqaJouE6ASH7qjABA&q=4k+wallpaper&oq=4k+w&gs_l=psy-ab.1.0.0i67k1l3j0j0i67k1j0j0i67k1j0j0i67k1l2.80921.81948.0.82920.4.4.0.0.0.0.160.613.0j4.4.0....0...1c.1.64.psy-ab..0.4.612....0.2urKuPfzJIc#imgrc=CAUdLsHsWH2NuM:
                var link = link_el.src;

            } else { // ex: https://www.google.ru/search?q=red+sox&newwindow=1&rlz=1C1CHBF_enRU766RU766&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjU5OLM1u7ZAhVJJJoKHS0-B6gQ_AUICigB&biw=1920&bih=959#imgrc=eVyi85jIlRXXcM:
                var link = '';
            }

            let base64 = sb(x.get_parent_with_class(this, 'immersive-container', 50), '.irc_mut').src;

            if (link !== '') {
                send_message_to_background_to_view_or_download_img(link, this, active);

            } else { // ex: https://www.google.ru/search?newwindow=1&rlz=1C1CHBF_enRU766RU766&biw=1920&bih=558&tbm=isch&sa=1&ei=JZ-qWpPpAY2LmwWJiZ_oBg&q=cat&oq=cat&gs_l=psy-ab.3..0j0i67k1j0l4j0i67k1l2j0l2.26699.27541.0.28165.3.
                send_message_to_background_to_view_or_download_img(base64, this, active);
            }
        }

        append_view_and_download_img_btns(document.body);
    }
    //<1 view_or_download_img f

    //>1 send_message_to_background_to_view_or_download_img f
    async function send_message_to_background_to_view_or_download_img(img, btn, active) {
        if (x.has_class(btn, ext_id('view_img_btns'))) {
            x.send_message_to_background({ message: 'view_img', img: img, active: active });

        } else if (x.has_class(btn, ext_id('download_img_btns'))) {
            browser.runtime.sendMessage({ message: "download_img", img: img, show_save_as_dialog_on_img_download: settings.show_save_as_dialog_on_img_download, download_imgs_path: settings.download_imgs_path }, response => {
                if (response) {
                    alert(locale.img_download_error_alert);
                }
            });
        }
    }
    //<1 send_message_to_background_to_view_or_download_img f

    return {
        append_view_and_download_img_btns: append_view_and_download_img_btns
    }
})();
    //< view_or_download_img o