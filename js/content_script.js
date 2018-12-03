cs = {};
svg = {};
settings = {};
locale = {};

cs.open_search_results_in_new_tab = true;

svg.turn_off = '<svg viewBox="0 0 100 100"><g><path d="M50.304,99.651C24.221,99.651,3,78.431,3,52.348c0-13.036,5.459-25.621,14.979-34.534   c2.42-2.256,6.201-2.13,8.463,0.278c2.256,2.414,2.133,6.201-0.281,8.46c-7.218,6.756-11.192,15.917-11.192,25.797   c0,19.485,15.85,35.335,35.335,35.335s35.335-15.85,35.335-35.335c0-9.658-3.828-18.681-10.777-25.402   c-2.373-2.297-2.437-6.087-0.14-8.463c2.297-2.367,6.084-2.443,8.463-0.14c9.298,8.997,14.424,21.075,14.424,34.005   C97.608,78.431,76.387,99.651,50.304,99.651z"></path></g><path d="M50.304,51.19c-3.308,0-5.985-2.68-5.985-5.985V5.985C44.319,2.68,46.996,0,50.304,0s5.985,2.68,5.985,5.985  v39.221C56.288,48.511,53.612,51.19,50.304,51.19z"></path></svg>';
svg.eye = '<svg viewBox="0 0 22 22"><style type="text/css">.st0{fill:none;}</style><path class="st0" d="M-1-1h24v24H-1V-1z"/><path d="M11,3.5C6,3.5,1.7,6.6,0,11c1.7,4.4,6,7.5,11,7.5s9.3-3.1,11-7.5C20.3,6.6,16,3.5,11,3.5z M11,16c-2.8,0-5-2.2-5-5 s2.2-5,5-5s5,2.2,5,5S13.8,16,11,16z M11,8c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S12.7,8,11,8z"/></svg>';
svg.search = '<svg viewBox="0 0 17.5 17.5"><style type="text/css">.st0{fill:none;}</style><path d="M12.5,11h-0.8l-0.3-0.3c1-1.1,1.6-2.6,1.6-4.2C13,2.9,10.1,0,6.5,0S0,2.9,0,6.5S2.9,13,6.5,13c1.6,0,3.1-0.6,4.2-1.6 l0.3,0.3v0.8l5,5l1.5-1.5L12.5,11z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11z"/><path class="st0" d="M-3-3h24v24H-3V-3z"/></svg>';
svg.download = '<svg viewBox="0 0 17 17"><style type="text/css">.st0{fill:none;}</style><path d="M15.5,6h-4V0h-6v6h-4l7,7L15.5,6z M1.5,15v2h14v-2H1.5z"/><path class="st0" d="M-3.5-3h24v24h-24V-3z"/></svg>';
svg.save_as = '<svg viewBox="0 0 18 18"><style type="text/css">.st0{fill:none;}</style><path d="M17.5,2.2l-1.4-1.7C15.9,0.2,15.5,0,15,0H3C2.5,0,2.1,0.2,1.8,0.5L0.5,2.2C0.2,2.6,0,3,0,3.5V16c0,1.1,0.9,2,2,2h14 c1.1,0,2-0.9,2-2V3.5C18,3,17.8,2.6,17.5,2.2z M9,14.5L3.5,9H7V7h4v2h3.5L9,14.5z M2.1,2l0.8-1h12l0.9,1H2.1z"/><path class="st0" d="M-3-3h24v24H-3V-3z"/></svg>';
svg.copy = '<svg viewBox="0 0 22 22"><style type="text/css">.st0{fill:none;}</style><path class="st0" d="M-1-1h24v24H-1V-1z"/><path d="M15,0H3C1.9,0,1,0.9,1,2v14h2V2h12V0z M18,4H7C5.9,4,5,4.9,5,6v14c0,1.1,0.9,2,2,2h11c1.1,0,2-0.9,2-2V6C20,4.9,19.1,4,18,4 z M18,20H7V6h11V20z"/></svg>';
svg.more = '<svg viewBox="0 0 16 16"><style type="text/css">.st0{fill:none;}</style><path class="st0" d="M-4-4h24v24H-4V-4z"/><path d="M8,4c1.1,0,2-0.9,2-2S9.1,0,8,0S6,0.9,6,2S6.9,4,8,4z M8,6C6.9,6,6,6.9,6,8s0.9,2,2,2s2-0.9,2-2S9.1,6,8,6z M8,12 c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S9.1,12,8,12z"/></svg>';

(async () => {
    let o = await x.get('settings');

    settings = o.settings;

    //> get_window_scroll_top f
    cs.get_window_scroll_top = () => {
        return document.documentElement.scrollTop;
    }
    //< get_window_scroll_top f

    //> actions on page load t
    document.addEventListener('DOMContentLoaded', async () => {
        //>1 localize t
        locale.view_img_btns_text = 'View image';
        locale.search_by_img_btns_text = 'Search by image';
        locale.download_img_btns_text = 'Download image';
        locale.save_as_btns_text = 'Save as';
        locale.copy_img_url_btns_text = 'Copy image URL';
        locale.more_btns_text = 'More';
        locale.download_all_imgs_btn_text = 'Download all images';
        locale.img_download_error_alert = 'An error occurred while downloading the image.';
        locale.you_already_downloaded_these_images_alert = 'You already downloaded these images. Load more images and then try again.';
        locale.message_to_user_error_text = "An error occured. Google thinks you're a robot. Reload the page and solve captcha.";
        locale.message_to_user_last_page_text = 'Last page.';

        (() => {
            let all = s('#hdtb-msb-vis .hdtb-mitem');

            if (all) {
                if (all.textContent === 'Все') {
                    locale.view_img_btns_text = 'Открыть в полном размере';
                    locale.search_by_img_btns_text = 'Поиск по картинке';
                    locale.download_img_btns_text = 'Скачать картинку';
                    locale.save_as_btns_text = 'Сохранить как';
                    locale.copy_img_url_btns_text = 'Скопировать URL картинки';
                    locale.more_btns_text = 'Больше';
                    locale.download_all_imgs_btn_text = 'Скачать все картинки';
                    locale.img_download_error_alert = 'Произошла ошибка при скачивании картинки.';
                    locale.you_already_downloaded_these_images_alert = 'Вы уже скачали эти картинки. Загрузите больше картинок и затем попробуйте снова.';
                    locale.message_to_user_error_text = 'Произошла ошибка. Google думает что вы робот. Перезагрузите страницу и решите каптчу.';
                    locale.message_to_user_last_page_text = 'Последняя страница.';
                }
            }
        })();
        //<1 localize t

        await x.delay(0);

        //>1 create input for copying to clipboard t
        if (settings.show_copy_img_url_btn) {
            let copy_input = x.create('input', ext_id('copy_input') + ' ' + ext_id('out_of_view'));
            x.append(document.body, copy_input);
        }
        //<1 create input for copying to clipboard t

        //>1 show paginator if settings.show_paginator === true t
        (() => {
            let paginator = s('#navcnt');

            if (settings.enable_infinite_scrolling && settings.show_paginator) {
                if (paginator) {
                    x.add_class(paginator, ext_id('visible'));

                    x.load_css(document, 'paginator');
                }

            } else {
                if (paginator) {
                    x.add_class(paginator, ext_id('static'));
                }
            }
        })();
        //<1 show paginator t

        //>1 prevent sticking of header t
        if (!settings.sticky_header) {
            x.add_class(s('#searchform'), ext_id('not_sticky_header'));
        }
        //<1 prevent sticking of header t

        if (settings.sticky_header && settings.compact_header) {
            x.add_class(document.body, 'minidiv'); //> make header thin as if you scroll to bottom without extension
        }

        //>1 hide people also search block if settings.show_people_also_search_for === false t
        if (!settings.show_people_also_search_for) {
            x.load_css(document, 'hiddden_people_also_search_for');
        }
        //<1 hide people also search block if settings.show_people_also_search_for === false t

        //>1 turn off / on button t
        if (settings.enable_infinite_scrolling) {
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
                    if (settings.compact_header) {
                        x.add_class(s('#navcnt'), ext_id('paginator_when_turn_off_btn_hidden_and_header_sticked'));

                    } else {
                        x.add_class(s('#navcnt'), ext_id('paginator_when_turn_off_btn_hidden_and_header_unsticked'));
                    }
                }
            }

            //>2 disable / enable infinity scroll t
            async function toggle_infinity_scroll() {
                let o = await x.get('settings');

                let turn_off_btn = s(ext_id('.turn_off_btn'));

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
        }
        //<1 turn off / on button t

        //>1 scroll to top t
        (() => {
            if (settings.show_scroll_to_top_btn) { //> create scroll to top button if settings.show_scroll_to_top_btn === true t
                var scroll_to_top_btn = x.create('div', ext_id('scroll_to_top_btn') + ' ' + ext_id('none'));
                x.append(document.body, scroll_to_top_btn);

                scroll_to_top_btn.addEventListener('click', scroll_to_top);
                scroll_to_top_btn.addEventListener('transitionend', x.set_faded_out_to_none.bind(scroll_to_top_btn, true));
                window.addEventListener('scroll', hide_or_show_scroll_to_top_btn);

                hide_or_show_scroll_to_top_btn();

                //>2 hide_or_show_scroll_to_top_btn f
                async function hide_or_show_scroll_to_top_btn() {
                    if (cs.get_window_scroll_top() === 0) {
                        if (!x.has_class(scroll_to_top_btn, ext_id('none'))) {
                            x.fade_out(scroll_to_top_btn, true, false);

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
                    x.fade_out(scroll_to_top_btn, true, true);
                }
            }
            //<2 scroll_to_top f

            //>2 if tools is not opened and header is compact show them t
            s('#hdtb-tls').addEventListener('click', function () {
                let tools_menu = s('#hdtbMenus');

                if (settings.compact_header && tools_menu.getAttribute('aria-expanded') === 'false') {
                    tools_menu.style.display = '';  // not adding 'none' class because it breaks tools disabling
                }
            });
            //<2 if tools is not opened and header is compact show them t
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

            for (let search_result of search_results) {
                cs.loading.load_site_icons(search_result, 'not_iframe');
            }
        })();
        //<1 load site icons on page load t

        //>1 delete more menu when clicking outside of it t
        document.addEventListener('mousedown', e => {
            let target = e.target;

            if (!target.closest(ext_id('.more_menus')) && !target.closest(ext_id('.img_preview_more_btn')) && !target.closest(ext_id('.more_btns'))) {
                x.remove_m(sa(ext_id('.more_menus')));
            }
        });
        //>1  delete more menu when clicking outside of it t

        //>1 catch dom changes t
        (() => {
            let create_img_preview_btns_binded_to_first_loaded_imgs = false;

            let observer_general = new MutationObserver(function (mutations) {
                for (let mutation of mutations) {
                    let target = mutation.target;

                    //>2 hide pagination when on appbar load slides t
                    let paginator = sb(target, '#navcnt');

                    if (paginator) {
                        cs.sticking.hide_paginator_and_turn_off_btn();
                    }
                    //<2 hide pagination when on appbar load slides t

                    //>2 bind create_img_preview_btns to image previews t
                    if ((settings.show_view_img_btn && settings.show_view_img_btn_on_img_previews) || (settings.show_search_by_img_btn && settings.show_search_by_img_btn_on_img_previews) || (settings.show_download_img_btn && settings.show_download_img_btn_on_img_previews)) {
                        if (target.id === 'gsr' && !create_img_preview_btns_binded_to_first_loaded_imgs) {
                            create_img_preview_btns_binded_to_first_loaded_imgs = true;

                            x.add_event_listener_to_multiple_els(target, '.rg_bx', 'mouseenter', cs.do_img_action.create_img_preview_btns);
                            x.add_event_listener_to_multiple_els(target, '.rg_bx', 'mouseleave', cs.do_img_action.remove_img_preview_btns);

                        }

                        for (let added_node of mutation.addedNodes) {
                            if (added_node.nodeType === Node.ELEMENT_NODE && x.has_class(added_node, 'rg_bx')) {
                                added_node.addEventListener('mouseenter', cs.do_img_action.create_img_preview_btns);
                                added_node.addEventListener('mouseleave', cs.do_img_action.remove_img_preview_btns);
                            }
                        }
                    }
                    //<2 bind create_img_preview_btns to image previews t

                    //>2 create download_all_imgs_btn in tools menu t
                    if (s('#gs_si0') && settings.show_download_img_btn && settings.show_download_all_imgs_btn) { // if google home page or Images page
                        cs.do_img_action.create_download_all_imgs_btn();
                    }
                    //<2 create download_all_imgs_btn in tools menu t

                    for (let added_node of mutation.addedNodes) {
                        //>2 append "View image" button t
                        if (added_node.id === 'irc_pbg') {
                            cs.do_img_action.create_btns();
                        }
                        //<2 append "View image" button t

                        //>2 catch search_by_img_drop_zone adding t
                        if (added_node.id === 'qbp') {
                            add_or_remove_compact_header_css(target);

                            observer_drag_search_by_img.observe(added_node, { attributes: true });
                        }
                        //<2 catch search_by_img_drop_zone adding t
                    }

                    for (let removed_node of mutation.removedNodes) {
                        //>2 reset image z-index t
                        if (x.has_class(removed_node, ext_id('img_preview_btns_wrapper'))) {
                            x.remove_class(target, ext_id('img_with_opened_more_menu')); // target = .rg_bx = img_el
                        }
                        //<2 reset image z-index t

                        //>2 remove active class from more button t
                        if (x.has_class(removed_node, ext_id('more_menu'))) {
                            x.remove_class(sb(target, ext_id('.more_btns')), ext_id('active_more_btn')); // target = img_action_trs
                        }

                        if (x.has_class(removed_node, ext_id('img_preview_more_menu'))) {
                            x.remove_class(s(ext_id('.img_preview_more_btn')), ext_id('img_preview_active_more_btn'));
                        }
                        //<2 remove active class from more button t
                    }
                }
            });

            observer_general.observe(document.body, { childList: true, subtree: true });

            //>2 search by image by draggging and droppping image observer t
            let observer_drag_search_by_img = new MutationObserver(function (mutations) {
                cs.sticking.searching_by_image_by_draggging_and_droppping = true;

                for (let mutation of mutations) {
                    add_or_remove_compact_header_css(mutation.target);
                }
            });

            //>3 add_or_remove_compact_header_css f
            function add_or_remove_compact_header_css(search_by_img_drop_zone) {
                if (!search_by_img_drop_zone.style.display || search_by_img_drop_zone.style.display !== 'none' || x.has_class(search_by_img_drop_zone, 'qbup')) {
                    let all_images_etc = s('#top_nav');

                    if (all_images_etc.closest('#searchform')) {
                        cs.sticking.insert_all_images_etc_at_default_position(all_images_etc);
                    }

                    x.remove(s(ext_id('.compact_header')));

                    cs.sticking.get_header_size(); // unhide hidden all_images_etc items

                } else {
                    cs.sticking.searching_by_image_by_draggging_and_droppping = false;

                    if (settings.compact_header) {
                        x.load_css(document, 'compact_header');
                    }

                    cs.sticking.stick_els();
                }
            }
            //<3 add_or_remove_compact_header_css f
            //<2 search by image by draggging and droppping image observer t
        })();
        //<1 catch dom changes t
    });
    //< actions on page load t

    //> loading o
    cs.loading = (() => {
        //>1 set variables t
        let loading_iframe_scroll = false;
        let loading_iframe_placeholder = false;
        let el_to_insert_iframe_after;
        let current_search_results_height = 9999999999;
        let previous_scroll_height_minus_top = 0;
        let loading_bar_html = '<div id="fountainG_1" class="fountainG"></div><div id="fountainG_2" class="fountainG"></div><div id="fountainG_3" class="fountainG"></div><div id="fountainG_4" class="fountainG"></div><div id="fountainG_5" class="fountainG"></div><div id="fountainG_6" class="fountainG"></div><div id="fountainG_7" class="fountainG"></div><div id="fountainG_8" class="fountainG"></div>';

        document.addEventListener('DOMContentLoaded', async () => {
            set_keywords_color(document.head);

            current_search_results_height = await get_search_results_height();

            el_to_insert_iframe_after = s('#rso');

            x.add_class(el_to_insert_iframe_after, ext_id('first_page_results_wrapper'));
        });
        //<1 set variables t

        //>1 load page t
        //>2 load_page f
        function load_page(mode) {
            if ((mode === 'scroll' && Math.max(current_search_results_height - (window.pageYOffset + window.innerHeight), 0) < 400 && !loading_iframe_scroll && !settings.turned_off) || (mode === 'placeholder' && !x.has_class(this, ext_id('.iframe_placeholder_loading') && !x.has_class(this, ext_id('.iframe_placeholder_error'))))) { // check distance between scroll position and bottom of page and load page if specified condition met t
                if ((mode === 'scroll' && el_to_insert_iframe_after) || mode === 'placeholder') {
                    let current_page_el = s('#foot .cur');

                    if ((mode === 'scroll' && current_page_el && current_page_el.nextElementSibling && sb(current_page_el.nextElementSibling, '.fl')) || mode === 'placeholder') { // if not last page // !s('.sr__price-range') - if not shopping page 
                        set_variable_loading_iframe(mode, true);

                        if (!s('.sr__price-range')) { //if not shopping page 
                            if (mode === 'scroll') {
                                //>3 load loading bar t
                                var loading_bar = document.createElement('div');
                                loading_bar.id = 'fountainG';
                                loading_bar.innerHTML = loading_bar_html;
                                x.after(el_to_insert_iframe_after, loading_bar);
                                //<3 load loading bar t

                                var next_page_url = sb(current_page_el.nextElementSibling, '.fl').href;

                            } else if (mode === 'placeholder') {
                                var loading_bar = this;

                                x.add_class(this, ext_id('iframe_placeholder_loading')); // animate iframe_placeholder

                                var next_page_url = this.dataset.iframe_src;

                                var scroll_top = cs.get_window_scroll_top();
                            }

                            //>3 append iframe to body t
                            let iframe_id = 'iframe_' + generate_unique_id();

                            let iframe = x.create('iframe', ext_id('iframe') + ' ' + ext_id('out_of_view'));
                            iframe.id = iframe_id;
                            iframe.src = next_page_url;

                            if (mode === 'scroll') {
                                x.after(el_to_insert_iframe_after, iframe);

                                el_to_insert_iframe_after = iframe;

                            } else if (mode === 'placeholder') {
                                x.after(this, iframe);
                            }
                            //<3 append iframe to body t

                            iframe.onload = () => {
                                //>3 check if google thinks you are robot t;
                                try {
                                    iframe.contentDocument.head.insertAdjacentHTML('beforeend', '<base target=_parent>'); // open links in window rather than iframe

                                } catch (er) { // if google thinks you are robot
                                    if (mode === 'scroll') {
                                        x.remove(loading_bar);

                                    } else if (mode === 'placeholder') {
                                        x.remove_class(this, ext_id('iframe_placeholder_loading'));
                                        x.add_class(this, ext_id('iframe_placeholder_error'));
                                    }

                                    show_message_to_user(iframe, 'error');

                                    return;
                                }
                                //<3 check if google thinks you are robot t;

                                x.add_class(iframe.contentDocument.body, ext_id('opacity_0'));

                                if (mode === 'scroll' && settings.show_page_separators) {
                                    var separator = x.create('div', ext_id('separator') + ' ' + ext_id('none') + ' ' + ext_id('opacity_0'));
                                    separator.textContent = +current_page_el.textContent + 1;
                                    x.before(iframe, separator);
                                }

                                let iframe_css = x.load_css(iframe.contentDocument, 'iframe');

                                iframe_css.onload = () => {
                                    let new_search_results = sab(iframe.contentDocument, '#rso .bkWMgd');

                                    let cs_and_iframe_css = x.load_css(iframe.contentDocument, 'cs_and_iframe');

                                    //>3 hide people also search block if settings.show_people_also_search_for === false t
                                    if (!settings.show_people_also_search_for) {
                                        x.load_css(iframe.contentDocument, 'hiddden_people_also_search_for');
                                    }
                                    //<3 hide people also search block if settings.show_people_also_search_for === false t

                                    cs_and_iframe_css.onload = async () => {
                                        set_keywords_color(iframe.contentDocument.head);

                                        await resize_iframe(iframe);

                                        if (separator) {
                                            x.fade_in(separator, true);
                                        }

                                        //>3 correct scroll position 1 t
                                        if (mode === 'placeholder') {
                                            var scroll_top = cs.get_window_scroll_top();
                                            var iframe_height = iframe.offsetHeight;
                                            var placeholder_height = this.offsetHeight;
                                        }
                                        //<3 correct scroll position 1 t

                                        x.remove_class(iframe, ext_id('out_of_view'));

                                        x.add_class(iframe.contentDocument.body, ext_id('transition_body'));

                                        x.remove_class(iframe.contentDocument.body, ext_id('opacity_0'));

                                        x.remove(loading_bar);

                                        //>3 correct scroll position 2 t
                                        if (mode === 'placeholder') {
                                            let rect = iframe.getBoundingClientRect();

                                            if (rect.bottom < rect.height) {
                                                document.documentElement.scrollTop = scroll_top + iframe_height - placeholder_height;
                                            }
                                        }
                                        //<3 correct scroll position 2 t

                                        current_search_results_height = await get_search_results_height();

                                        //>3 load site icons (execution) t
                                        for (let new_search_result of new_search_results) {
                                            let gs = sab(new_search_result, '.g');

                                            for (let g of gs) {
                                                cs.loading.load_site_icons(g, iframe_id);
                                            }
                                        }
                                        //<3 load site icons (execution) t

                                        //>3 update element with namber of pages t
                                        if (mode === 'scroll') {
                                            let nav = s('#nav');
                                            let el_to_append_iframe_nav = nav.parentNode;
                                            let iframe_nav = sb(iframe.contentDocument, '#nav');

                                            x.remove(nav);

                                            x.append(el_to_append_iframe_nav, iframe_nav);
                                        }
                                        //<3 update element with namber of pages t

                                        //>3 handle image section t
                                        let links = sab(iframe.contentDocument, '#imagebox_bigimages a.iu-card-header, #imagebox_bigimages a.Q2MMlc'); // Images for x;  More images for x

                                        for (let link of links) {
                                            link.setAttribute('target', '_parent');
                                        }

                                        let el_that_makes_imgs_link_opening_in_iframe = sb(iframe.contentDocument, '#imagebox_bigimages div[data-rtid]');

                                        if (el_that_makes_imgs_link_opening_in_iframe) {
                                            el_that_makes_imgs_link_opening_in_iframe.removeAttribute('data-rtid');
                                        }

                                        x.add_event_listener_to_multiple_els(iframe.contentDocument, '#imagebox_bigimages a.bia', 'click', open_img);
                                        //<3 handle image section t

                                        iframe.contentDocument.body.dataset.id = iframe_id;

                                        resize_iframe_on_its_body_resize_no_animation(iframe.contentDocument.body);

                                        iframe.contentDocument.body.addEventListener('transitionend', resize_iframe_on_its_body_resize_animation.bind(null, iframe_id));

                                        set_variable_loading_iframe(mode, false);
                                    };
                                }
                            };
                        }

                    } else {
                        if (!s('#gs_si0')) { // if not google home page or Images page
                            show_message_to_user(el_to_insert_iframe_after, 'last_page');
                        }

                        el_to_insert_iframe_after = null;
                    }
                }
            }
        }
        //<2 load_page f

        //>2 set_variable_loading_iframe f
        function set_variable_loading_iframe(mode, value) {
            if (mode === 'scroll') {
                loading_iframe_scroll = value;

            } else if (mode === 'placeholder') {
                loading_iframe_placeholder = value;
            }
        }
        //<2 set_variable_loading_iframe f

        //>2 get_search_results_height f
        async function get_search_results_height() {
            await x.delay(0);

            return s('#center_col').offsetHeight;
        }
        //<2 get_search_results_height f

        //>2 resize_iframe f
        async function resize_iframe(iframe) {
            if (iframe.contentDocument.body) {
                await x.delay(0);

                iframe.style.height = iframe.contentDocument.body.scrollHeight + 'px';
                iframe.style.width = iframe.contentDocument.body.scrollWidth + 'px';
            }
        }
        //<2 resize_iframe f

        //>2 resize iframe on its body resize (without animation) t
        function resize_iframe_on_its_body_resize_no_animation(iframe_body) {
            let observer = new MutationObserver(function (mutations) {
                for (let mutation of mutations) {
                    let target = mutation.target;

                    if (!x.has_class(target, ext_id('favicons_and_flags')) && !x.has_class(target, ext_id('icons_wrappers_2'))) {
                        let body = target.closest('body');

                        if (body) {
                            let iframe_id = body.dataset.id;

                            resize_iframe(s('#' + iframe_id));
                        }
                    }
                }
            });

            observer.observe(iframe_body, { childList: true, subtree: true, attributes: true, characterData: true });

        }
        //<2 resize iframe on its body resize (without animation) t

        //>2 resize iframe on its body resize (with animation) t
        function resize_iframe_on_its_body_resize_animation(iframe_id, e) {
            if (!x.has_class(e.target, ext_id('favicons_and_flags'))) {
                resize_iframe(s('#' + iframe_id));
            }
        }
        //<2 resize iframe on its body resize (with animation) t

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

            if (link_el && search_result.className === 'g' && (!search_result.id || search_result.id !== 'imagebox_bigimages')) { // if ordinary search result (not images)
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
                    let iframe = s('#' + response_o.iframe_id);

                    if (!iframe) {
                        return;
                    }

                    var doc = iframe.contentDocument;
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

        //>1 fix non clickable, non hoverable site flags (title not showing) t
        async function fix_non_clickable_site_flags(iframe_id, delay) {
            await x.delay(delay);

            if (iframe_id !== 'not_iframe') {
                let iframe = s('#' + iframe_id);

                if (iframe) {
                    iframe.style.marginBottom = '0.1px';

                    await x.delay(100);

                    iframe.style.marginBottom = 'unset';
                }
            }
        }
        //<1 fix non clickable, non hoverable site flags (title not showing) t

        //>1 set_keywords_color f
        function set_keywords_color(head) {
            if (settings.custom_keywords_color) {
                let style = x.create('style', '');
                style.innerHTML = '.st em {color: ' + settings.keywords_color + '!important}';
                x.append(head, style);
            }
        }
        //<1 set_keywords_color f

        //>1 generate_unique_id f
        function generate_unique_id() {
            return Date.now() + Math.random().toString(36).substring(2);
        }
        //<1 generate_unique_id f

        if (settings.enable_infinite_scrolling) {
            //>1 unload_iframe f
            if (settings.unload_pages) {
                async function unload_iframe() {
                    if (!loading_iframe_placeholder) {
                        let iframes = sa(ext_id('.iframe') + ', .' + ext_id('first_page_results_wrapper'));

                        for (let iframe of iframes) {
                            if (!x.has_class(iframe, ext_id('none'))) {
                                var rect = iframe.getBoundingClientRect();

                                if (rect.bottom <= - 400) {
                                    let iframe_placeholder = x.create('div', ext_id('iframe_placeholders'));

                                    iframe_placeholder.style.height = iframe.offsetHeight + 'px';

                                    if (x.has_class(iframe, 'iframe_pipbbdfondfipmjmdkmggihiknhmcfhd')) {
                                        iframe_placeholder.dataset.iframe_src = iframe.src;

                                    } else if (x.has_class(iframe, 'first_page_results_wrapper_pipbbdfondfipmjmdkmggihiknhmcfhd')) {
                                        iframe_placeholder.dataset.iframe_src = s('#foot .fl').href;
                                    }

                                    x.replace(iframe, iframe_placeholder)

                                    iframe_placeholder.addEventListener('click', load_page.bind(iframe_placeholder, 'placeholder'));
                                }
                            }
                        }
                    }
                }

                window.addEventListener('scroll', unload_iframe);
            }
            //<1 unload_iframe f

            window.addEventListener('scroll', load_page.bind(null, 'scroll'));
        }

        return {
            load_site_icons: load_site_icons
        }
    })();
    //< loading o

    //> sticking elements t
    cs.sticking = (() => {
        let header_right_hand_els_width;
        let searching_by_image_by_draggging_and_droppping = false; // g

        //>1 stick or unstick pagination, turn off / on button and header t
        async function stick_els() {
            await x.delay(0);
            const header_size_o = cs.sticking.get_header_size();

            if (!cs.sticking.searching_by_image_by_draggging_and_droppping) {
                if (typeof header_right_hand_els_width === 'undefined') {
                    let safe_search_etc = s('#ab_ctls');

                    header_right_hand_els_width = s('#hdtb-msb').offsetWidth + safe_search_etc.offsetWidth + parseInt(window.getComputedStyle(safe_search_etc).right) + 16;
                }

                let scroll_top = cs.get_window_scroll_top();

                if (!s('#gs_si0')) { // if not google home page or Images page
                    //<2 header f
                    if (settings.sticky_header && settings.compact_header) {
                        let search_input_form = s('.sfbg.nojsv');
                        let all_images_etc = s('#top_nav');

                        if (header_size_o.is_compact) {
                            x.append(search_input_form, all_images_etc);

                            x.load_css(document, 'compact_header');

                        } else {
                            let bst = s('#bst');

                            x.after(bst, all_images_etc);

                            x.remove(s(ext_id('.compact_header')))
                        }
                    }
                    //<2 header t

                    //>2 pagination and turn_off_btn t
                    let turn_off_btn = s(ext_id('.turn_off_btn'));
                    let pagination = s('#navcnt');
                    const gap_between_header_and_turn_off_btn = 52;
                    let turn_off_btn_and_related_searches_modifier = gap_between_header_and_turn_off_btn;
                    let pagination_modifier = gap_between_header_and_turn_off_btn + 47;

                    if (scroll_top >= header_size_o.size) {
                        var toggle_f = 'add_class';

                    } else {
                        var toggle_f = 'remove_class';
                    }

                    if (turn_off_btn) {
                        turn_off_btn.style.top = header_size_o.size + turn_off_btn_and_related_searches_modifier + 'px';
                        pagination.style.top = header_size_o.size + pagination_modifier + 'px';

                        x[toggle_f](turn_off_btn, ext_id('fixed'));
                        x[toggle_f](pagination, ext_id('fixed'));
                    }
                    //<2 pagination and turn_off_btn t

                    //>2 related searches t
                    let related_searches = s('#brs');
                    let sidepanel = s('#rhs_block');
                    let appbar = s('#appbar');

                    if (sidepanel && related_searches && appbar) {
                        const sidepanel_width_without_padding = parseFloat(window.getComputedStyle(sidepanel).height);
                        let sidepanel_height = sidepanel_width_without_padding === 0 ? 0 : sidepanel.offsetHeight;
                        const related_searches_offset = sidepanel_width_without_padding === 0 && settings.sticky_header && settings.compact_header ? 0 : sidepanel.getBoundingClientRect().top + scroll_top + sidepanel_height - (header_size_o.size + turn_off_btn_and_related_searches_modifier);

                        if (scroll_top >= related_searches_offset && related_searches_offset >= 0) {
                            var toggle_f = 'add_class';

                        } else {
                            var toggle_f = 'remove_class';
                        }

                        related_searches.style.top = header_size_o.size + turn_off_btn_and_related_searches_modifier + 'px';

                        x[toggle_f](related_searches, ext_id('fixed'));
                    }
                    //<2 related searches t
                }

                //>2 safe search etc t
                if (settings.compact_header && scroll_top === 0) {
                    let ab_ctls = s('#ab_ctls');

                    if (header_right_hand_els_width > window.innerWidth) {
                        x.load_css(document, 'collapsed_safe_search_menu');

                        if (scroll_top === 0) {
                            x.remove_class(ab_ctls, ext_id('none'));

                        } else {
                            x.add_class(ab_ctls, ext_id('none'));
                        }

                    } else {
                        x.remove(s(ext_id('.collapsed_safe_search_menu')));
                        x.remove_class(ab_ctls, ext_id('none'));
                    }
                }
                //<2 safe search etc t
            }
            //>2 remove header shadow and_apply border if not on top t
            if (settings.sticky_header && settings.compact_header) {
                let searchbar = s('#hdtb-s');

                if (searchbar) {
                    const sfbg = s('.sfbg');

                    if (cs.get_window_scroll_top() === 0) {
                        x.add_class(sfbg, ext_id('no_header_shadow'));
                    }

                    if (cs.get_window_scroll_top() !== 0) {
                        x.remove_class(sfbg, ext_id('header_border'));
                        x.remove_class(sfbg, ext_id('no_header_shadow'));
                    }

                    if (cs.get_window_scroll_top() === 0 && header_size_o.is_compact) {
                        x.add_class(sfbg, ext_id('header_border'));
                    }

                    if (!header_size_o.is_compact) {
                        x.remove_class(sfbg, ext_id('header_border'));
                    }
                }
            }
            //<2 remove header shadow and_apply border if not on top t
        }
        //<1 stick or unstick pagination, turn off / on button and header t

        //>1 get_header_size f
        function get_header_size() { // g
            let header_size_o = {};
            const tall_header_height = 123;
            let compare_value = document.documentElement.clientWidth + 14; // gap between all, images etc and login items should be 40px when language of google.com is english
            let scroll_top = cs.get_window_scroll_top();
            let nav_bar_items = sa('#tsf, #gbw > div > div, #hdtb-msb .hdtb-mitem, #ab_ctls .ab_ctl, #hdtb-tls'); // #tsf = google logo search input; #gbw > div > div = login items; #hdtb-msb .hdtb-mitem = all, images etc; #ab_ctls .ab_ctl = view saved, safe search; #hdtb-tls = tools
            let all_images_etc_and_safe_search_and_view_saved_items = sa('#hdtb-msb .hdtb-mitem, #hdtb-tls, #ab_ctls .ab_ctl');
            let el_to_hide_index = all_images_etc_and_safe_search_and_view_saved_items.length - 1;
            let is_image_tab = s('#ab_ctls .ab_ctl');
            let header_els_width = 0;

            for (let item of all_images_etc_and_safe_search_and_view_saved_items) {
                x.remove_class(item, ext_id('hidden'));
            }

            for (let item of nav_bar_items) {
                let el_width = item.offsetWidth + get_margin_of_view_saved_or_safe_search(item);

                header_els_width += el_width;
            }

            if (is_image_tab) { // if images tab
                compare_value -= 15;
            }

            if (scroll_top >= tall_header_height || (settings.sticky_header && settings.compact_header && (scroll_top !== 0 || (scroll_top === 0 && compare_value >= header_els_width)))) {
                if (settings.sticky_header) {
                    header_size_o.size = 53;

                } else {
                    header_size_o.size = 0;
                }

                header_size_o.is_compact = true;

            } else {
                header_size_o.size = 123;
                header_size_o.is_compact = false;
            }

            if (scroll_top !== 0 && settings.sticky_header && settings.compact_header) {
                while (el_to_hide_index !== - 1 && compare_value + (is_image_tab && !x.has_class(all_images_etc_and_safe_search_and_view_saved_items[el_to_hide_index], 'ab_ctl') ? 16 : 0) < header_els_width) {
                    x.add_class(all_images_etc_and_safe_search_and_view_saved_items[el_to_hide_index], ext_id('hidden'));

                    header_els_width -= all_images_etc_and_safe_search_and_view_saved_items[el_to_hide_index].offsetWidth + get_margin_of_view_saved_or_safe_search(all_images_etc_and_safe_search_and_view_saved_items[el_to_hide_index]);

                    el_to_hide_index--;
                }
            }

            return header_size_o;
        }
        //<1 get_header_size f

        //>1 get_margin_of_view_saved_or_safe_search f
        function get_margin_of_view_saved_or_safe_search(el) {
            if (x.has_class(el, 'ab_ctl')) { // if view saved or safe search
                let margin_left = parseInt(window.getComputedStyle(el).marginLeft);

                return margin_left !== 0 ? margin_left : parseInt(window.getComputedStyle(el).marginRight);

            } else {
                return 0;
            }
        }
        //<1 get_margin_of_view_saved_or_safe_search f

        //>1 hide paginator and turn off btn if appbar visible t
        function hide_paginator_and_turn_off_btn() { // g (search example: movies)
            if (settings.enable_infinite_scrolling) {
                let appbar = s('#appbar');

                if (appbar) {
                    let appbar_height = appbar.offsetHeight;
                    let turn_off_btn = s(ext_id('.turn_off_btn'));
                    let paginator = s('#navcnt');

                    if (paginator, turn_off_btn) {
                        if (settings.sticky_header && settings.compact_header) {
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

        //>1 insert_all_images_etc_at_default_position f
        function insert_all_images_etc_at_default_position(all_images_etc) { // g
            let bst = s('#bst');

            x.after(bst, all_images_etc);
        }

        //<1 insert_all_images_etc_at_default_position f

        window.addEventListener('scroll', hide_paginator_and_turn_off_btn);

        return {
            searching_by_image_by_draggging_and_droppping: searching_by_image_by_draggging_and_droppping,

            stick_els: stick_els,
            get_header_size: get_header_size,
            hide_paginator_and_turn_off_btn: hide_paginator_and_turn_off_btn,
            move_related_searches_el: move_related_searches_el,
            insert_all_images_etc_at_default_position: insert_all_images_etc_at_default_position
        }
    })();
    //< sticking elements t

    //> do_img_action o
    cs.do_img_action = (() => {
        let search_by_img_btns_appended = false;
        let download_all_imgs_current_node_index = 0;
        let origin = window.location.origin;
        let img_preview_btns_list = {
            mode: ['view_img', 'search_by_img', 'download_img', 'save_as', 'copy_img_url'],
            svg: ['eye', 'search', 'download', 'save_as', 'copy']
        };
        let btns_list = Object.assign({}, img_preview_btns_list);

        btns_list.mode = btns_list.mode.filter(item => item !== 'search_by_img');
        btns_list.svg = btns_list.svg.filter(item => item !== 'search');

        //>1 do_img_action f
        function do_img_action(mode, send_message_mode, meta_el, e) {
            let mouse_btn = e.button;

            if (mouse_btn !== 2) { // if not right-click
                e.preventDefault();

                if (mode === 'img_viewer') {
                    let img_el_id = this.closest('.immersive-container').dataset.itemId;
                    let img_el = s('.irc_rimask[data-item-id="' + img_el_id + '"]');
                    let src = sb(img_el, 'img').src;
                    img_el = s('.rg_ic[src="' + src + '"]') || img_el; // img_el = if Related images
                    var img_el_wrapper = img_el.closest('.rg_bx') || img_el; // img_el = if Related images

                } else if (mode === 'preview') {
                    var img_el_wrapper = this.closest('.rg_bx');
                }

                if (mode === 'img_viewer' || mode === 'preview') {
                    var image_data = sb(img_el_wrapper, '.rg_meta').innerHTML;

                } else if (mode === 'download_all') {
                    var image_data = meta_el.innerHTML;
                }

                let json = JSON.parse(image_data);
                let img = json.ou;

                if (mouse_btn === 0) { // when left-clicking
                    var active = true;

                } else if (mouse_btn === 1) { // when middle-clicking
                    var active = false;
                }

                if (send_message_mode !== 'copy_img_url') {
                    send_message_to_background_to_do_img_action(send_message_mode, img, active, origin);

                } else {
                    let copy_input = s(ext_id('.copy_input'));
                    copy_input.value = img;

                    copy_input.focus();
                    copy_input.select();

                    document.execCommand('copy');
                }

                let more_menu = s(ext_id('.more_menus'));

                if (more_menu) {
                    x.remove(more_menu);
                }
            }
        }
        //<1 do_img_action f

        //>1 send_message_to_background_to_do_img_action f
        async function send_message_to_background_to_do_img_action(mode, img, active, origin) {
            if (mode === 'view_img') {
                x.send_message_to_background({ message: mode, img: img, active: active });

            } else if (mode === 'search_by_img') {
                x.send_message_to_background({ message: mode, img: img, active: active, origin: origin });

            } else if (mode === 'download_img' || mode === 'save_as' || mode === 'download_all_imgs') {
                if (mode === 'download_img') {
                    var show_save_as_dialog_on_img_download = settings.show_save_as_dialog_on_img_download;

                } else if (mode === 'save_as') {
                    var show_save_as_dialog_on_img_download = true;

                } else if (mode === 'download_all_imgs') {
                    var show_save_as_dialog_on_img_download = false;
                }

                browser.runtime.sendMessage({ message: mode, img: img, show_save_as_dialog_on_img_download: show_save_as_dialog_on_img_download, download_imgs_path: settings.download_imgs_path }, response => {
                    if (response) {
                        alert(locale.img_download_error_alert);
                    }
                });
            }
        }
        //<1 send_message_to_background_to_do_img_action f

        //>1 create_btns f
        let create_btns = x.debounce(() => {
            if (!s(ext_id('.more_menu'))) {
                if (settings.show_view_img_btn || settings.show_download_img_btn) {
                    x.remove_m(sa(ext_id('.img_action_trs')));

                    let img_viewer_btn_wrappers = sa('.iAcjwd.irc_but_r tr');

                    if (img_viewer_btn_wrappers[0]) {
                        for (let img_viewer_btn_wrapper of img_viewer_btn_wrappers) {
                            let created_btns_indexes = [];
                            let img_viewer_btn_wrapper_width = img_viewer_btn_wrapper.offsetWidth - 32 - 10; // 32 = more_btn width; 10 = more_btn_margin
                            let btns_cumulative_width = 0;
                            let created_btn;
                            let img_action_tr = x.create('tr', ext_id('img_action_trs'));
                            let number_of_enabled_items = 0;
                            let width_exceeded = false;
                            let len = btns_list.mode.length;

                            x.after(img_viewer_btn_wrapper, img_action_tr);

                            img_action_tr.style.height = img_viewer_btn_wrapper.offsetHeight + 'px'; // set height of img_action_trs to eight of tallest td in image viewer t

                            for (let i = 0; i < len; i++) {
                                if (btns_list.mode[i] !== 'save_as') {
                                    var show_img_btn = settings['show_' + btns_list.mode[i] + '_btn'];

                                } else {
                                    var show_img_btn = settings.show_download_img_btn && !settings.show_save_as_dialog_on_img_download && settings.show_save_as_btn;
                                }

                                if (show_img_btn) {
                                    if (!width_exceeded) {
                                        created_btn = create_btn(null, btns_list.mode[i], img_action_tr, btns_list.mode[i] + '_btns', btns_list.svg[i], btns_list.mode[i] + '_btns_text');
                                    }

                                    btns_cumulative_width += created_btn.offsetWidth + 10; // 10 = margin-right

                                    if (btns_cumulative_width > img_viewer_btn_wrapper_width) {
                                        width_exceeded = true;

                                    } else {
                                        created_btns_indexes.push(i);
                                    }

                                    number_of_enabled_items++;
                                }
                            }

                            if (number_of_enabled_items !== created_btns_indexes.length) {
                                x.remove(created_btn);

                                created_btn = create_btn(created_btns_indexes, 'more', img_action_tr, 'more_btns', 'more', 'more_btns_text');
                            }
                        }

                    }
                }

                let search_by_img_wrappers = sa('.irc_hd > .irc_dsh');

                if (search_by_img_wrappers[0] && !search_by_img_btns_appended && settings.show_search_by_img_btn) {
                    search_by_img_btns_appended = true;

                    for (let search_by_img_wrapper of search_by_img_wrappers) {
                        search_by_img_wrapper.insertAdjacentHTML('beforeend', '<a class="' + ext_id('search_by_img_btns') + ' o5rIVb irc_hol i3724" tabindex="0" href="javascript:void(0)"><span class="irc_ho">' + locale.search_by_img_btns_text + '</span></a>'); // javascript:void(0) = prevent search by image link from opening

                        let search_by_img_btns = sb(search_by_img_wrapper, ext_id('.search_by_img_btns'));

                        search_by_img_btns.addEventListener('mousedown', do_img_action.bind(search_by_img_btns, 'img_viewer', 'search_by_img', null));
                    }
                }
            }
        }, 25, false);
        //<1 create_btns f

        //>1 create_img_preview_btns f
        function create_img_preview_btns() { // g
            let img_preview_btns_wrapper = s(ext_id('.img_preview_btns_wrapper'));

            if (!img_preview_btns_wrapper) {
                let created_btns_indexes = [];
                let img_width = this.offsetWidth;
                let created_btn;
                let previously_created_btn;
                let number_of_enabled_items = 0;
                let width_exceeded = false;
                let len = img_preview_btns_list.mode.length;

                let img_preview_btns_wrapper = x.create('div', ext_id('img_preview_btns_wrapper'));
                x.as_first(this, img_preview_btns_wrapper);

                for (let i = 0; i < len; i++) {
                    if (!width_exceeded) {
                        previously_created_btn = created_btn;
                    }

                    if (img_preview_btns_list.mode[i] !== 'save_as') {
                        var show_img_btn = settings['show_' + img_preview_btns_list.mode[i] + '_btn'] && settings['show_' + img_preview_btns_list.mode[i] + '_btn_on_img_previews'];

                    } else {
                        var show_img_btn = settings.show_download_img_btn && settings.show_download_img_btn_on_img_previews && !settings.show_save_as_dialog_on_img_download && settings.show_save_as_btn_on_img_previews;
                    }

                    if (show_img_btn) {
                        if (!width_exceeded) {
                            created_btn = create_img_preview_btn(null, img_preview_btns_list.mode[i], img_preview_btns_wrapper, 'img_preview_' + img_preview_btns_list.mode[i] + '_btn', img_preview_btns_list.svg[i], img_preview_btns_list.mode[i] + '_btns_text');
                        }

                        if (img_preview_btns_wrapper.offsetWidth > img_width) {
                            width_exceeded = true;

                        } else {
                            created_btns_indexes.push(i);
                        }

                        number_of_enabled_items++;
                    }
                }

                if (number_of_enabled_items !== created_btns_indexes.length) {
                    created_btns_indexes.pop();

                    x.remove(created_btn);
                    x.remove(previously_created_btn);

                    created_btn = create_img_preview_btn(created_btns_indexes, 'more', img_preview_btns_wrapper, 'img_preview_more_btn', 'more', 'more_btns_text');
                }
            }
        }
        //<1 create_img_preview_btns f

        //>1 create_btn f
        function create_btn(created_btns_indexes, send_message_mode, img_action_tr, btns_class, svg_name, locale_name) {
            let btn_html = '<td><a class="' + ext_id(btns_class) + ' ' + ext_id('my_img_action_btns') + '" tabindex="0"><span class="RL3J9c Cws1Yc wmCrUb">' + svg[svg_name] + '</span><span class="Tl8XHc">' + locale[locale_name] + '</span></a></td>';

            img_action_tr.insertAdjacentHTML('beforeend', btn_html);

            let img_viewer_btns_wrapper = img_action_tr.closest('.iAcjwd.irc_but_r');
            let btn = sb(img_viewer_btns_wrapper, ext_id('.' + btns_class));

            if (send_message_mode !== 'more') {
                btn.addEventListener('mousedown', do_img_action.bind(btn, 'img_viewer', send_message_mode, null));

            } else {
                x.remove(sb(btn, '.Tl8XHc')); // remove span inside

                btn.addEventListener('mousedown', create_more_menu.bind(btn, created_btns_indexes, '', 'img_viewer'));
            }

            return btn
        }
        //<1 create_btn f

        //>1 create_img_preview_btn f
        function create_img_preview_btn(created_btns_indexes, send_message_mode, img_preview_btns_wrapper, btn_class, svg_name, locale_name) {
            let btn = x.create('button', ext_id(btn_class) + ' ' + ext_id('img_preview_btns'));
            btn.innerHTML = svg[svg_name];
            btn.title = locale[locale_name];
            x.append(img_preview_btns_wrapper, btn);


            if (send_message_mode !== 'more') {
                btn.addEventListener('mousedown', do_img_action.bind(btn, 'preview', send_message_mode, null));

            } else {
                btn.addEventListener('mousedown', create_more_menu.bind(btn, created_btns_indexes, 'img_preview_', 'preview'));
            }

            return btn
        }
        //<1 create_img_preview_btn f

        //>1 remove_img_preview_btns f
        function remove_img_preview_btns() { // g
            x.remove(sb(this, ext_id('.img_preview_btns_wrapper')));
        }
        //<1 remove_img_preview_btns f

        //>1 create_more_menu f
        function create_more_menu(created_btns_indexes, type_prefix, do_img_action_mode, e) {
            if (e.button !== 2) { // if not right-click
                let btns_wrapper = this.closest(ext_id('.' + type_prefix + 'btns_wrapper') + ', ' + ext_id('.img_action_trs'));
                let more_menu = sb(btns_wrapper, ext_id('.' + type_prefix + 'more_menu'));

                if (!more_menu) {
                    let modes = type_prefix === '' ? btns_list.mode : img_preview_btns_list.mode;
                    let len = modes.length;

                    let more_menu = x.create('div', ext_id(type_prefix + 'more_menu') + ' ' + ext_id('more_menus'));
                    x.append(btns_wrapper, more_menu);

                    if (type_prefix === '') {
                        x.add_class(this, ext_id('active_more_btn'));

                    } else if (type_prefix === 'img_preview_') {
                        x.add_class(this, ext_id('img_preview_active_more_btn'));
                    }

                    for (let i = 0; i < len; i++) {
                        if (modes[i] !== 'save_as') {
                            var show_img_btn = settings['show_' + modes[i] + '_btn'];

                        } else {
                            var show_img_btn = settings.show_download_img_btn && !settings.show_save_as_dialog_on_img_download;
                        }

                        if (created_btns_indexes.indexOf(i) === - 1 && show_img_btn) {
                            let more_btn = x.create('div', ext_id('more_menu_' + modes[i] + '_btn') + ' ' + ext_id(type_prefix + 'more_menu_btns'));
                            more_btn.textContent = locale[modes[i] + '_btns_text'];
                            x.append(more_menu, more_btn);

                            more_btn.addEventListener('mousedown', do_img_action.bind(more_btn, do_img_action_mode, modes[i], null));
                        }
                    }

                    if (type_prefix === 'img_preview_') {
                        let img_el = btns_wrapper.closest('.rg_bx');

                        x.add_class(img_el, ext_id('img_with_opened_more_menu')); // this will make more menu showing above images to the right

                        let right = 0;

                        while (!is_el_in_viewport_left(more_menu)) {
                            right--;

                            more_menu.style.right = right + 'px';
                        }
                    }

                } else {
                    x.remove(more_menu);

                    if (type_prefix === '') {
                        x.remove_class(this, ext_id('active_more_btn'));

                    } else if (type_prefix === 'img_preview_') {
                        x.remove_class(this, ext_id('img_preview_active_more_btn'));
                    }
                }
            }
        }
        //<1 create_more_menu f

        //>1 create download_all_imgs_btn in tools menu t
        function create_download_all_imgs_btn() { // g
            let download_all_imgs_btn = s(ext_id('.download_all_imgs_btn'));

            if (!download_all_imgs_btn) {
                let tools = s('.hdtb-mn-cont');

                tools.insertAdjacentHTML('beforeend', '<div class="' + ext_id('download_all_imgs_btn') + ' hdtb-mn-hd" aria-haspopup="true" role="button" tabindex="0"><div class="mn-hd-txt">' + locale.download_all_imgs_btn_text + '</div></div>');

                download_all_imgs_btn = sb(tools, ext_id('.download_all_imgs_btn'));

                download_all_imgs_btn.addEventListener('mousedown', download_all_imgs);
            }
        }
        //<1 create download_all_imgs_btn in tools menu t

        //>1 download_all_imgs f
        function download_all_imgs(e) {
            if (e.button !== 2) { // if not right-click
                e.preventDefault();

                let meta_els = sa('.rg_meta:not(.tHqoQ)'); // :not(.tHqoQ) = skip related images in image viewer
                let last_node_index = meta_els.length;

                if (download_all_imgs_current_node_index !== last_node_index) {
                    let event = new Event('');
                    event.button = 0;

                    for (; download_all_imgs_current_node_index < last_node_index;) {
                        do_img_action.call(null, 'download_all', 'download_all_imgs', meta_els.item(download_all_imgs_current_node_index), event);

                        download_all_imgs_current_node_index++;
                    }

                } else {
                    alert(locale.you_already_downloaded_these_images_alert);
                }
            }
        }
        //<1 download_all_imgs f

        //>1 is_el_in_viewport_left f
        function is_el_in_viewport_left(el) {
            let rect = el.getBoundingClientRect();

            return Math.ceil(rect.left) >= 0;
        }
        //<1 is_el_in_viewport_left f

        window.addEventListener('scroll', create_btns);

        return {
            create_btns: create_btns,
            create_img_preview_btns: create_img_preview_btns,
            remove_img_preview_btns: remove_img_preview_btns,
            create_download_all_imgs_btn: create_download_all_imgs_btn
        }
    })();
    //< do_img_action o
})();
