//> get_window_scroll_top f

//> actions on page load t

//>1 localize t

//>1 show paginator if settings.show_paginator === true t

//>1 stick header if settings.stick_header === true t

//>1 hide people also search block if settings.show_people_also_search_for === false t

//>1 load image preview buttons css t

//>1 turn off / on button t

//>2 disable / enable infinity scroll t

//>1 scroll to top t

//>2 hide_or_show_scroll_to_top_btn f

//>2 scroll_to_top f

//>1 move related searches element on page load t

//>1 move extra titles (games, movies) and copyright notice ex search: need for speed 2015 t 

//>1 stick els on page load (execution; binding) t

//>1 load site icons on page load t

//>1 catch dom changes t + //>2 hide pagination when on appbar load slides t; //>2 append "View image" button t; //>2 bind create_img_preview_btns to image previews t; //>2 create download_all_imgs_btn in tools menu t

//> loading o

//>1 load page t

//>2 load_page f + //>3 load loading bar t; //>3 append iframe to body t; //>3 check if google thinks you are robot t; //>3 hide people also search block if settings.show_people_also_search_for === false t; //>3 correct scroll position 1 t; //>3 correct scroll position 2 t; //>3 load site icons (execution) t; //>3 update element with namber of pages t; //>3 handle image section t

//>2 set_variable_loading_iframe f

//>2 get_search_results_height f

//>2 resize_iframe f

//>2 resize iframe on its body resize (without animation) t

//>2 resize iframe on its body resize (with animation) t

//>2 open_img f

//>2 show_message_to_user f

//>1 load site icons and run load flags function t

//>1 load_site_flags f

//>1 fix non clickable, non hoverable site flags (title not showing) t

//>1 set_keywords_color f

//>1 generate_unique_id f

//>1 unload_iframe f

//> sticking elements t

//>1 stick or unstick pagination, turn off / on button and header t + //>2 pagination and turn_off_btn t;  //>2 related searches t; //<2 header f; //>3 fix bug with image viewer (bug: 4/6/18 4:15 AM) t; //>3 hide tools menu t

//>1 get_header_size f

//>1 set_stick_size f

//>1 get_margin_of_view_saved_or_safe_search f

//>1 hide paginator and turn off btn if appbar visible t

//>1 move_related_searches_el f

//>1 set_box_shadow_on_searchbar_if_not_on_top t

//> view_download_img_or_search_by_img o

//>1 append_view_download_img_btns_and_search_by_imng_btns f + //>2 set height of my_img_action_trs to eight of tallest td in image viewer t;

//>1 view_download_img_or_search_by_img f

//>1 send_message_to_background_to_view_download_img_or_search_by_img f

//>1 create_img_preview_btns f

//>1 create_img_preview_btn f

//>1 remove_img_preview_btns f

//>1 create download_all_imgs_btn in tools menu t

//>1 download_all_imgs f

cs = {};
svg = {};
settings = {};
locale = {};

cs.open_search_results_in_new_tab = true;

svg.turn_off = '<svg viewBox="0 0 100 100"><g><path d="M50.304,99.651C24.221,99.651,3,78.431,3,52.348c0-13.036,5.459-25.621,14.979-34.534   c2.42-2.256,6.201-2.13,8.463,0.278c2.256,2.414,2.133,6.201-0.281,8.46c-7.218,6.756-11.192,15.917-11.192,25.797   c0,19.485,15.85,35.335,35.335,35.335s35.335-15.85,35.335-35.335c0-9.658-3.828-18.681-10.777-25.402   c-2.373-2.297-2.437-6.087-0.14-8.463c2.297-2.367,6.084-2.443,8.463-0.14c9.298,8.997,14.424,21.075,14.424,34.005   C97.608,78.431,76.387,99.651,50.304,99.651z"></path></g><path d="M50.304,51.19c-3.308,0-5.985-2.68-5.985-5.985V5.985C44.319,2.68,46.996,0,50.304,0s5.985,2.68,5.985,5.985  v39.221C56.288,48.511,53.612,51.19,50.304,51.19z"></path></svg>';
svg.eye = '<svg viewBox="0 0 22 22"><style type="text/css">.st0{fill:none;}</style><path class="st0" d="M-1-1h24v24H-1V-1z"/><path d="M11,3.5C6,3.5,1.7,6.6,0,11c1.7,4.4,6,7.5,11,7.5s9.3-3.1,11-7.5C20.3,6.6,16,3.5,11,3.5z M11,16c-2.8,0-5-2.2-5-5 s2.2-5,5-5s5,2.2,5,5S13.8,16,11,16z M11,8c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S12.7,8,11,8z"/></svg>';
svg.search = '<svg viewBox="0 0 17.5 17.5"><style type="text/css">.st0{fill:none;}</style><path d="M12.5,11h-0.8l-0.3-0.3c1-1.1,1.6-2.6,1.6-4.2C13,2.9,10.1,0,6.5,0S0,2.9,0,6.5S2.9,13,6.5,13c1.6,0,3.1-0.6,4.2-1.6 l0.3,0.3v0.8l5,5l1.5-1.5L12.5,11z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11z"/><path class="st0" d="M-3-3h24v24H-3V-3z"/></svg>';
svg.download = '<svg viewBox="0 0 17 17"><style type="text/css">.st0{fill:none;}</style><path d="M15.5,6h-4V0h-6v6h-4l7,7L15.5,6z M1.5,15v2h14v-2H1.5z"/><path class="st0" d="M-3.5-3h24v24h-24V-3z"/></svg>';


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
                    locale.search_by_img_btns_text = 'Поиск по картике';
                    locale.download_img_btns_text = 'Скачать картинку';
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

        //>1 load image preview buttons css t
        if ((settings.show_view_img_btn && settings.show_view_img_btn_on_img_previews) || (settings.show_search_by_image_btn && settings.show_search_by_image_btn_on_img_previews) || (settings.show_download_img_btn && settings.show_download_img_btn_on_img_previews)) {
            x.load_css(document, 'img_preview_btns');
        }
        //<1 load image preview buttons css t

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
                            x.fade_out(scroll_to_top_btn, true, true);

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
            let create_img_preview_btns_binded_to_first_loaded_imgs = false;

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
                    cs.view_download_img_or_search_by_img.append_view_download_img_btns_and_search_by_imng_btns(target);
                    //<2 append "View image" button t

                    //>2 bind create_img_preview_btns to image previews t
                    if ((settings.show_view_img_btn && settings.show_view_img_btn_on_img_previews) || (settings.show_search_by_image_btn && settings.show_search_by_image_btn_on_img_previews) || (settings.show_download_img_btn && settings.show_download_img_btn_on_img_previews)) {
                        if (target.id === 'gsr' && !create_img_preview_btns_binded_to_first_loaded_imgs) {

                            create_img_preview_btns_binded_to_first_loaded_imgs = true;

                            x.add_event_listener_to_multiple_els(target, '.rg_bx', 'mouseenter', cs.view_download_img_or_search_by_img.create_img_preview_btns);
                            x.add_event_listener_to_multiple_els(target, '.rg_bx', 'mouseleave', cs.view_download_img_or_search_by_img.remove_img_preview_btns);

                        }

                        for (added_node of mutation.addedNodes) {
                            if (added_node.nodeType === Node.ELEMENT_NODE && x.has_class(added_node, 'rg_bx')) {
                                added_node.addEventListener('mouseenter', cs.view_download_img_or_search_by_img.create_img_preview_btns);
                                added_node.addEventListener('mouseleave', cs.view_download_img_or_search_by_img.remove_img_preview_btns);
                            }
                        }
                    }
                    //<2 bind create_img_preview_btns to image previews t

                    //>2 create download_all_imgs_btn in tools menu t
                    if (s('#gs_si0') && settings.show_download_img_btn && settings.show_download_all_imgs_btn) { // if google home page or Images page
                        cs.view_download_img_or_search_by_img.create_download_all_imgs_btn();
                    }
                    //<2 create download_all_imgs_btn in tools menu t
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
                                        for (new_search_result of new_search_results) {
                                            let gs = sab(new_search_result, '.g');

                                            for (g of gs) {
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
                for (mutation of mutations) {
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

        //>1 unload_iframe f
        if (settings.unload_pages) {
            async function unload_iframe() {
                if (!loading_iframe_placeholder) {
                    let iframes = sa(ext_id('.iframe') + ', .' + ext_id('first_page_results_wrapper'));

                    for (iframe of iframes) {
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

        return {
            load_site_icons: load_site_icons
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
                let turn_off_btn = s(ext_id('.turn_off_btn'));
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

                    x.remove(s(ext_id('.compact_header')))
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
            let nav_bar_items = sa('#tsf, .gb_nb, #hdtb-msb .hdtb-mitem, #ab_ctls .ab_ctl, #hdtb-tls'); // #tsf = google logo search input; .gb_nb = login items; #hdtb-msb .hdtb-mitem = all, images etc; #ab_ctls .ab_ctl = view saved, safe search; #hdtb-tls = tools
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
                let margin_left = parseInt(window.getComputedStyle(el).marginLeft);

                return margin_left !== 0 ? margin_left : parseInt(window.getComputedStyle(el).marginRight);

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
                let turn_off_btn = s(ext_id('.turn_off_btn'));
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

    //> view_download_img_or_search_by_img o
    cs.view_download_img_or_search_by_img = (() => {
        let search_by_img_btns_appended = false;
        let download_all_imgs_current_node_index = 0;

        //>1 append_view_download_img_btns_and_search_by_imng_btns f
        function append_view_download_img_btns_and_search_by_imng_btns(basae_element) {
            if (settings.show_view_img_btn || settings.show_download_img_btn) {
                let img_viewer_btn_wrappers = sab(basae_element, '.iAcjwd.irc_but_r tr');

                if (img_viewer_btn_wrappers[0]) {
                    let my_img_action_trs = sa(ext_id('.my_img_action_trs'));

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
                                view_img_btn_html = '<td><a class="' + ext_id('view_img_btns') + ' ' + ext_id('my_img_action_btns') + '" tabindex="0"><span class="RL3J9c Cws1Yc wmCrUb">' + svg.eye + '</span><span class="Tl8XHc">' + locale.view_img_btns_text + '</span></a></td>';
                            }

                            if (settings.show_download_img_btn) {
                                download_img_btn_html = '<td><a class="' + ext_id('download_img_btns') + ' ' + ext_id('my_img_action_btns') + '" tabindex="0"><span class="RL3J9c Cws1Yc wmCrUb">' + svg.download + '</span><span class="Tl8XHc">' + locale.download_img_btns_text + '</span></a></td>';
                            }

                            img_viewer_btn_wrapper.insertAdjacentHTML('afterend', '<tr class="' + ext_id('my_img_action_trs') + '"> ' + view_img_btn_html + download_img_btn_html + '</tr>');

                            let img_viewer_btns_wrapper = img_viewer_btn_wrapper.closest('.iAcjwd.irc_but_r');
                            let view_img_btn = sb(img_viewer_btns_wrapper, ext_id('.view_img_btns'));
                            let download_img_btn = sb(img_viewer_btns_wrapper, ext_id('.download_img_btns'));

                            if (view_img_btn) {
                                view_img_btn.addEventListener('mousedown', view_download_img_or_search_by_img.bind(view_img_btn, 'image_viewer', 'view_img', null));
                            }

                            if (download_img_btn) {
                                download_img_btn.addEventListener('mousedown', view_download_img_or_search_by_img.bind(download_img_btn, 'image_viewer', 'download_img', null));
                            }
                        }
                    }
                }
            }

            let search_by_img_wrappers = sa('.irc_hd  [class="rn92ee"]');

            if (search_by_img_wrappers[0] && !search_by_img_btns_appended && settings.show_search_by_image_btn) {
                search_by_img_btns_appended = true;

                for (search_by_img_wrapper of search_by_img_wrappers) {
                    search_by_img_wrapper.insertAdjacentHTML('beforeend', '<a class="' + ext_id('search_by_img_btns') + ' o5rIVb irc_hol i3724" tabindex="0" href="javascript:void(0)"><span class="irc_ho">' + locale.search_by_img_btns_text + '</span></a>'); // javascript:void(0) = prevent search by image link from opening

                    let search_by_img_btns = sb(search_by_img_wrapper, ext_id('.search_by_img_btns'));

                    search_by_img_btns.addEventListener('mousedown', view_download_img_or_search_by_img.bind(search_by_img_btns, 'image_viewer', 'search_by_img', null));
                }
            }
        }
        //<1 append_view_download_img_btns_and_search_by_imng_btns f

        //>1 view_download_img_or_search_by_img f
        function view_download_img_or_search_by_img(mode, send_message_mode, meta_el, e) {
            let mouse_btn = e.button;

            if (mouse_btn !== 2) { // if not right-click
                e.preventDefault();

                if (mode === 'image_viewer') {
                    let image_el_id = this.closest('.immersive-container').dataset.itemId;
                    let image_el = s('[name="' + image_el_id + '"]');
                    var image_el_wrapper = image_el.closest('.rg_bx');

                } else if (mode === 'preview') {
                    var image_el_wrapper = this.closest('.rg_bx');
                }

                if (mode === 'image_viewer' || mode === 'preview') {
                    var image_data = sb(image_el_wrapper, '.rg_meta').innerHTML;

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

                send_message_to_background_to_view_download_img_or_search_by_img(send_message_mode, img, active);
            }
        }
        //<1 view_download_img_or_search_by_img f

        //>1 send_message_to_background_to_view_download_img_or_search_by_img f
        async function send_message_to_background_to_view_download_img_or_search_by_img(mode, img, active) {
            if (mode === 'view_img') {
                x.send_message_to_background({ message: mode, img: img, active: active });

            } else if (mode === 'search_by_img') {
                x.send_message_to_background({ message: mode, img: img, active: active });

            } else if (mode === 'download_img') {
                browser.runtime.sendMessage({ message: mode, img: img, show_save_as_dialog_on_img_download: settings.show_save_as_dialog_on_img_download, download_imgs_path: settings.download_imgs_path }, response => {
                    if (response) {
                        alert(locale.img_download_error_alert);
                    }
                });
            }
        }
        //<1 send_message_to_background_to_view_download_img_or_search_by_img f

        //>1 create_img_preview_btns f
        function create_img_preview_btns() { // g
            let img_preview_btns_wrapper = x.create('div', ext_id('img_preview_btns_wrapper'));
            x.as_first(this, img_preview_btns_wrapper);

            if (settings.show_view_img_btn && settings.show_view_img_btn_on_img_previews) {
                create_img_preview_btn('view_img', img_preview_btns_wrapper, 'img_preview_view_img_btn', 'eye', 'view_img_btns_text');
            }

            if (settings.show_search_by_image_btn && settings.show_search_by_image_btn_on_img_previews) {
                create_img_preview_btn('search_by_img', img_preview_btns_wrapper, 'img_preview_search_by_image_btn', 'search', 'search_by_img_btns_text');
            }

            if (settings.show_download_img_btn && settings.show_download_img_btn_on_img_previews) {
                create_img_preview_btn('download_img', img_preview_btns_wrapper, 'img_preview_download_img_btn', 'download', 'download_img_btns_text');
            }
        }
        //<1 create_img_preview_btns f

        //>1 create_img_preview_btn f
        function create_img_preview_btn(send_message_mode, img_preview_btns_wrapper, btn_class, svg_name, locale_name) {
            let btn = x.create('button', ext_id(btn_class) + ' ' + ext_id('img_preview_btns'));
            btn.innerHTML = svg[svg_name];
            btn.title = locale[locale_name];
            x.append(img_preview_btns_wrapper, btn);

            btn.addEventListener('mousedown', view_download_img_or_search_by_img.bind(btn, 'preview', send_message_mode, null));
        }
        //<1 create_img_preview_btn f

        //>1 remove_img_preview_btns f
        function remove_img_preview_btns() { // g
            x.remove(sb(this, ext_id('.img_preview_btns_wrapper')));
        }
        //<1 remove_img_preview_btns f

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
                        view_download_img_or_search_by_img.call(null, 'download_all', 'download_img', meta_els.item(download_all_imgs_current_node_index), event);

                        download_all_imgs_current_node_index++;
                    }

                } else {
                    alert(locale.you_already_downloaded_these_images_alert);
                }
            }
        }
        //<1 download_all_imgs f


        return {
            append_view_download_img_btns_and_search_by_imng_btns: append_view_download_img_btns_and_search_by_imng_btns,
            create_img_preview_btns: create_img_preview_btns,
            remove_img_preview_btns: remove_img_preview_btns,
            create_download_all_imgs_btn: create_download_all_imgs_btn
        }
    })();
    //< view_download_img_or_search_by_img o
})();
