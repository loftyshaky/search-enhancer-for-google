const appRoot = require('app-root-path').path;

const { Manifest: ManifestShared } = require('@loftyshaky/shared/js/ext/manifest');

const manifest_shared = new ManifestShared({ app_root: appRoot });

class Manifest {
    generate = ({ mode, test, browser }) => {
        const manifest = {
            manifest_version: 3,
            name: 'Search Enhancer for Google™',
            description: '__MSG_description__',
            web_accessible_resources: [
                {
                    resources: [
                        'NotoSans-Regular.ttf',
                        'no_tr.css',
                        'font_face.css',
                        'error.css',
                        'content_script_css.css',
                        'dependencies_css.css',
                        'icons.css',
                        'separator.css',
                        'google_iframe_inner.css',
                        'spinner.css',
                        'load_end_msg.css',
                        'side_panel.css',
                        'img_action_bar.css',
                        'favicon_hidden.css',
                        'dark_ui.css',
                        'flags/*',
                    ],
                    matches: ['<all_urls>'],
                },
            ],
            background: {
                service_worker: 'background.js',
            },
            options_ui: {
                page: 'settings.html',
                open_in_tab: true,
            },
            permissions: ['scripting', 'storage', 'downloads'],
            host_permissions: [
                'https://s2.googleusercontent.com/*',
                'https://favicon.yandex.net/*',
                'https://icons.duckduckgo.com/*',
                'https://t0.gstatic.com/*',
                'https://t1.gstatic.com/*',
                'https://t2.gstatic.com/*',
                'https://t3.gstatic.com/*',
                '*://www.google.com/*',
                '*://www.google.ad/*',
                '*://www.google.ae/*',
                '*://www.google.com.af/*',
                '*://www.google.com.ag/*',
                '*://www.google.com.ai/*',
                '*://www.google.am/*',
                '*://www.google.co.ao/*',
                '*://www.google.com.ar/*',
                '*://www.google.as/*',
                '*://www.google.at/*',
                '*://www.google.com.au/*',
                '*://www.google.az/*',
                '*://www.google.ba/*',
                '*://www.google.com.bd/*',
                '*://www.google.be/*',
                '*://www.google.bf/*',
                '*://www.google.bg/*',
                '*://www.google.com.bh/*',
                '*://www.google.bi/*',
                '*://www.google.bj/*',
                '*://www.google.com.bn/*',
                '*://www.google.com.bo/*',
                '*://www.google.com.br/*',
                '*://www.google.bs/*',
                '*://www.google.co.bw/*',
                '*://www.google.by/*',
                '*://www.google.com.bz/*',
                '*://www.google.ca/*',
                '*://www.google.cd/*',
                '*://www.google.cf/*',
                '*://www.google.cg/*',
                '*://www.google.ch/*',
                '*://www.google.ci/*',
                '*://www.google.co.ck/*',
                '*://www.google.cl/*',
                '*://www.google.cm/*',
                '*://www.google.cn/*',
                '*://www.google.com.co/*',
                '*://www.google.co.cr/*',
                '*://www.google.com.cu/*',
                '*://www.google.cv/*',
                '*://www.google.com.cy/*',
                '*://www.google.cz/*',
                '*://www.google.de/*',
                '*://www.google.dj/*',
                '*://www.google.dk/*',
                '*://www.google.dm/*',
                '*://www.google.com.do/*',
                '*://www.google.dz/*',
                '*://www.google.com.ec/*',
                '*://www.google.ee/*',
                '*://www.google.com.eg/*',
                '*://www.google.es/*',
                '*://www.google.com.et/*',
                '*://www.google.fi/*',
                '*://www.google.com.fj/*',
                '*://www.google.fm/*',
                '*://www.google.fr/*',
                '*://www.google.ga/*',
                '*://www.google.ge/*',
                '*://www.google.gg/*',
                '*://www.google.com.gh/*',
                '*://www.google.com.gi/*',
                '*://www.google.gl/*',
                '*://www.google.gm/*',
                '*://www.google.gp/*',
                '*://www.google.gr/*',
                '*://www.google.com.gt/*',
                '*://www.google.gy/*',
                '*://www.google.com.hk/*',
                '*://www.google.hn/*',
                '*://www.google.hr/*',
                '*://www.google.ht/*',
                '*://www.google.hu/*',
                '*://www.google.co.id/*',
                '*://www.google.ie/*',
                '*://www.google.co.il/*',
                '*://www.google.im/*',
                '*://www.google.co.in/*',
                '*://www.google.iq/*',
                '*://www.google.is/*',
                '*://www.google.it/*',
                '*://www.google.je/*',
                '*://www.google.com.jm/*',
                '*://www.google.jo/*',
                '*://www.google.co.jp/*',
                '*://www.google.co.ke/*',
                '*://www.google.com.kh/*',
                '*://www.google.ki/*',
                '*://www.google.kg/*',
                '*://www.google.co.kr/*',
                '*://www.google.com.kw/*',
                '*://www.google.kz/*',
                '*://www.google.la/*',
                '*://www.google.com.lb/*',
                '*://www.google.li/*',
                '*://www.google.lk/*',
                '*://www.google.co.ls/*',
                '*://www.google.lt/*',
                '*://www.google.lu/*',
                '*://www.google.lv/*',
                '*://www.google.com.ly/*',
                '*://www.google.co.ma/*',
                '*://www.google.md/*',
                '*://www.google.me/*',
                '*://www.google.mg/*',
                '*://www.google.mk/*',
                '*://www.google.ml/*',
                '*://www.google.mn/*',
                '*://www.google.ms/*',
                '*://www.google.com.mt/*',
                '*://www.google.mu/*',
                '*://www.google.mv/*',
                '*://www.google.mw/*',
                '*://www.google.com.mx/*',
                '*://www.google.com.my/*',
                '*://www.google.co.mz/*',
                '*://www.google.com.na/*',
                '*://www.google.com.nf/*',
                '*://www.google.com.ng/*',
                '*://www.google.com.ni/*',
                '*://www.google.ne/*',
                '*://www.google.nl/*',
                '*://www.google.no/*',
                '*://www.google.com.np/*',
                '*://www.google.nr/*',
                '*://www.google.nu/*',
                '*://www.google.co.nz/*',
                '*://www.google.com.om/*',
                '*://www.google.com.pa/*',
                '*://www.google.com.pe/*',
                '*://www.google.com.ph/*',
                '*://www.google.com.pk/*',
                '*://www.google.pl/*',
                '*://www.google.pn/*',
                '*://www.google.com.pr/*',
                '*://www.google.ps/*',
                '*://www.google.pt/*',
                '*://www.google.com.py/*',
                '*://www.google.com.qa/*',
                '*://www.google.ro/*',
                '*://www.google.ru/*',
                '*://www.google.rw/*',
                '*://www.google.com.sa/*',
                '*://www.google.com.sb/*',
                '*://www.google.sc/*',
                '*://www.google.se/*',
                '*://www.google.com.sg/*',
                '*://www.google.sh/*',
                '*://www.google.si/*',
                '*://www.google.sk/*',
                '*://www.google.com.sl/*',
                '*://www.google.sn/*',
                '*://www.google.so/*',
                '*://www.google.sm/*',
                '*://www.google.st/*',
                '*://www.google.com.sv/*',
                '*://www.google.td/*',
                '*://www.google.tg/*',
                '*://www.google.co.th/*',
                '*://www.google.com.tj/*',
                '*://www.google.tk/*',
                '*://www.google.tl/*',
                '*://www.google.tm/*',
                '*://www.google.tn/*',
                '*://www.google.to/*',
                '*://www.google.com.tr/*',
                '*://www.google.tt/*',
                '*://www.google.com.tw/*',
                '*://www.google.co.tz/*',
                '*://www.google.com.ua/*',
                '*://www.google.co.ug/*',
                '*://www.google.co.uk/*',
                '*://www.google.com.uy/*',
                '*://www.google.co.uz/*',
                '*://www.google.com.vc/*',
                '*://www.google.co.ve/*',
                '*://www.google.vg/*',
                '*://www.google.co.vi/*',
                '*://www.google.com.vn/*',
                '*://www.google.vu/*',
                '*://www.google.ws/*',
                '*://www.google.rs/*',
                '*://www.google.co.za/*',
                '*://www.google.co.zm/*',
                '*://www.google.co.zw/*',
                '*://www.google.cat/*',
            ],
            content_scripts: [
                {
                    run_at: 'document_end',
                    js: ['env.js', 'content_script.js'],
                    css: ['content_script_css.css'],
                    matches: [
                        '*://www.google.com/*',
                        '*://www.google.ad/*',
                        '*://www.google.ae/*',
                        '*://www.google.com.af/*',
                        '*://www.google.com.ag/*',
                        '*://www.google.com.ai/*',
                        '*://www.google.am/*',
                        '*://www.google.co.ao/*',
                        '*://www.google.com.ar/*',
                        '*://www.google.as/*',
                        '*://www.google.at/*',
                        '*://www.google.com.au/*',
                        '*://www.google.az/*',
                        '*://www.google.ba/*',
                        '*://www.google.com.bd/*',
                        '*://www.google.be/*',
                        '*://www.google.bf/*',
                        '*://www.google.bg/*',
                        '*://www.google.com.bh/*',
                        '*://www.google.bi/*',
                        '*://www.google.bj/*',
                        '*://www.google.com.bn/*',
                        '*://www.google.com.bo/*',
                        '*://www.google.com.br/*',
                        '*://www.google.bs/*',
                        '*://www.google.co.bw/*',
                        '*://www.google.by/*',
                        '*://www.google.com.bz/*',
                        '*://www.google.ca/*',
                        '*://www.google.cd/*',
                        '*://www.google.cf/*',
                        '*://www.google.cg/*',
                        '*://www.google.ch/*',
                        '*://www.google.ci/*',
                        '*://www.google.co.ck/*',
                        '*://www.google.cl/*',
                        '*://www.google.cm/*',
                        '*://www.google.cn/*',
                        '*://www.google.com.co/*',
                        '*://www.google.co.cr/*',
                        '*://www.google.com.cu/*',
                        '*://www.google.cv/*',
                        '*://www.google.com.cy/*',
                        '*://www.google.cz/*',
                        '*://www.google.de/*',
                        '*://www.google.dj/*',
                        '*://www.google.dk/*',
                        '*://www.google.dm/*',
                        '*://www.google.com.do/*',
                        '*://www.google.dz/*',
                        '*://www.google.com.ec/*',
                        '*://www.google.ee/*',
                        '*://www.google.com.eg/*',
                        '*://www.google.es/*',
                        '*://www.google.com.et/*',
                        '*://www.google.fi/*',
                        '*://www.google.com.fj/*',
                        '*://www.google.fm/*',
                        '*://www.google.fr/*',
                        '*://www.google.ga/*',
                        '*://www.google.ge/*',
                        '*://www.google.gg/*',
                        '*://www.google.com.gh/*',
                        '*://www.google.com.gi/*',
                        '*://www.google.gl/*',
                        '*://www.google.gm/*',
                        '*://www.google.gp/*',
                        '*://www.google.gr/*',
                        '*://www.google.com.gt/*',
                        '*://www.google.gy/*',
                        '*://www.google.com.hk/*',
                        '*://www.google.hn/*',
                        '*://www.google.hr/*',
                        '*://www.google.ht/*',
                        '*://www.google.hu/*',
                        '*://www.google.co.id/*',
                        '*://www.google.ie/*',
                        '*://www.google.co.il/*',
                        '*://www.google.im/*',
                        '*://www.google.co.in/*',
                        '*://www.google.iq/*',
                        '*://www.google.is/*',
                        '*://www.google.it/*',
                        '*://www.google.je/*',
                        '*://www.google.com.jm/*',
                        '*://www.google.jo/*',
                        '*://www.google.co.jp/*',
                        '*://www.google.co.ke/*',
                        '*://www.google.com.kh/*',
                        '*://www.google.ki/*',
                        '*://www.google.kg/*',
                        '*://www.google.co.kr/*',
                        '*://www.google.com.kw/*',
                        '*://www.google.kz/*',
                        '*://www.google.la/*',
                        '*://www.google.com.lb/*',
                        '*://www.google.li/*',
                        '*://www.google.lk/*',
                        '*://www.google.co.ls/*',
                        '*://www.google.lt/*',
                        '*://www.google.lu/*',
                        '*://www.google.lv/*',
                        '*://www.google.com.ly/*',
                        '*://www.google.co.ma/*',
                        '*://www.google.md/*',
                        '*://www.google.me/*',
                        '*://www.google.mg/*',
                        '*://www.google.mk/*',
                        '*://www.google.ml/*',
                        '*://www.google.mn/*',
                        '*://www.google.ms/*',
                        '*://www.google.com.mt/*',
                        '*://www.google.mu/*',
                        '*://www.google.mv/*',
                        '*://www.google.mw/*',
                        '*://www.google.com.mx/*',
                        '*://www.google.com.my/*',
                        '*://www.google.co.mz/*',
                        '*://www.google.com.na/*',
                        '*://www.google.com.nf/*',
                        '*://www.google.com.ng/*',
                        '*://www.google.com.ni/*',
                        '*://www.google.ne/*',
                        '*://www.google.nl/*',
                        '*://www.google.no/*',
                        '*://www.google.com.np/*',
                        '*://www.google.nr/*',
                        '*://www.google.nu/*',
                        '*://www.google.co.nz/*',
                        '*://www.google.com.om/*',
                        '*://www.google.com.pa/*',
                        '*://www.google.com.pe/*',
                        '*://www.google.com.ph/*',
                        '*://www.google.com.pk/*',
                        '*://www.google.pl/*',
                        '*://www.google.pn/*',
                        '*://www.google.com.pr/*',
                        '*://www.google.ps/*',
                        '*://www.google.pt/*',
                        '*://www.google.com.py/*',
                        '*://www.google.com.qa/*',
                        '*://www.google.ro/*',
                        '*://www.google.ru/*',
                        '*://www.google.rw/*',
                        '*://www.google.com.sa/*',
                        '*://www.google.com.sb/*',
                        '*://www.google.sc/*',
                        '*://www.google.se/*',
                        '*://www.google.com.sg/*',
                        '*://www.google.sh/*',
                        '*://www.google.si/*',
                        '*://www.google.sk/*',
                        '*://www.google.com.sl/*',
                        '*://www.google.sn/*',
                        '*://www.google.so/*',
                        '*://www.google.sm/*',
                        '*://www.google.st/*',
                        '*://www.google.com.sv/*',
                        '*://www.google.td/*',
                        '*://www.google.tg/*',
                        '*://www.google.co.th/*',
                        '*://www.google.com.tj/*',
                        '*://www.google.tk/*',
                        '*://www.google.tl/*',
                        '*://www.google.tm/*',
                        '*://www.google.tn/*',
                        '*://www.google.to/*',
                        '*://www.google.com.tr/*',
                        '*://www.google.tt/*',
                        '*://www.google.com.tw/*',
                        '*://www.google.co.tz/*',
                        '*://www.google.com.ua/*',
                        '*://www.google.co.ug/*',
                        '*://www.google.co.uk/*',
                        '*://www.google.com.uy/*',
                        '*://www.google.co.uz/*',
                        '*://www.google.com.vc/*',
                        '*://www.google.co.ve/*',
                        '*://www.google.vg/*',
                        '*://www.google.co.vi/*',
                        '*://www.google.com.vn/*',
                        '*://www.google.vu/*',
                        '*://www.google.ws/*',
                        '*://www.google.rs/*',
                        '*://www.google.co.za/*',
                        '*://www.google.co.zm/*',
                        '*://www.google.co.zw/*',
                        '*://www.google.cat/*',
                    ],
                },
            ],
            commands: {
                enable_infinite_scrolling: {
                    description: '__MSG_enable_btn_title__',
                },
                scroll_to_top: {
                    description: '__MSG_scroll_to_top_hotkey__',
                },
                scroll_to_bottom: {
                    description: '__MSG_scroll_to_bottom_hotkey__',
                },
                remember_scroll_position: {
                    description: '__MSG_remember_scroll_position_hotkey__',
                },
                remember_scroll_position_forced: {
                    description: '__MSG_remember_scroll_position_forced_hotkey__',
                },
                jump_to_related_searches: {
                    description: '__MSG_jump_to_related_searches_hotkey__',
                },
                view_img: {
                    description: '__MSG_view_img_title__',
                },
                search_by_img: {
                    description: '__MSG_search_by_img_title__',
                },
                download_img: {
                    description: '__MSG_download_img_title__',
                },
                save_img_as: {
                    description: '__MSG_save_img_as_title__',
                },
                copy_img: {
                    description: '__MSG_copy_img_title__',
                },
                copy_img_url: {
                    description: '__MSG_copy_img_url_title__',
                },
            },
        };

        if (test) {
            manifest.key =
                'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC27ja1uH21PA7IcyxrOcz3I/419Bkc0GDxpDqr17EEJGP8tBSTMLextmK/z5GJ4aWOQ8zoDGKU4lDovc4QiqV90yRIhCBTG8WKcvenMR+fa+wJjlFOHlF4bmTwMf2mXUVC75KmSOxjHELYy8aWLB3itrPZdaP32oXqrNcmmAEKg7x6fIBmjsiValV/fWpJ7dJhwZ4jodH3CGHyDTsqBKtLd8ufXUfd2yt/LYErh0STLp9fTClk7Pcn5ajIvtwdSNH2f1KzDAxjKKQRjqlHnrud5gLplJ0+OYxRobCGITbSl2gEsv44bnwImyhvaM4Qe9u8k8in8u3P+RDZ2N7cM+G1AgMBAAECggEADlxY4ivOGC5TUMXHgASlHeYiKYH0slZ8TdJuCRohNOlW1u21ZP3tmQXWIcDw5+MIseIjuDg34wB5u2CIyIBB6d6FM8YsZxBAK636QCwmLRTcjlfkWetQy2rYAYoP8IGg+gmM7AEmJ/x94owfMAaqZlps3kHGGHAvLcZzPrEVkwm1E+jSl/8eSU6VBW09588mWmJLnKzXNj2nJNCggEyhQY2ahzhNFwDk/kktAvWqkyRho7j/4ezEd046gLfLngZIWmP++F4VuDL49958GFzc41z0eKkoU9X06lygtwjCiDvPeIPnLfwh7c10qgYB5jNy4DGuDwg97/c4Z/dO287V/wKBgQDj22w8ufXS23ixceSwSHa3CsxB3qihI/4NEJASeyK8u8sAzGhRZafb9bWk9DT5vAH8YRQcYeib0dKbxaFAyC/OSzDDwozpFZX4fc8uLBjhpAeaHttXUzVOBWKi0slRd40IPcTv87569Mu3JV2s4OA7I51Ier5foAqKuv7UFa3KhwKBgQDNhkOdTWej/NNB1x5OKuky5f7R0v69SD9CiqcVj1CELKnbhEXom1IGxt28IqXp+KD8nKvglOZpsViHC95Ay/WsHcXSAAiHxnNRvzbEfkUMkFCh0uCsDn/y/Pg9M5IslurNbXJHKEFTp27jhlOkDx+d2Ub/H6QnefLp+b8YznNU4wKBgQCZh90LogXImUde0S5Vtc4AEg+FhsE7KuRg6zsYqM3EPAlSNWlJB2UuqgZF6qLTb2IrK0KAyVwRujTd7zFzVDAaIcHu9eU6nOfbcvIp2168k2jn6UjEM3XkZ26J5dvuv85QskZDpIpBkTa+5jeTaEbOsnWlQ8eI6W6RAeT5BM6AewKBgAZs+TY00lW1NOGtGRx2iP33ZOUohKBkXt30uc6ZwXmwb8sWMp1YJdNialJUfv12sYnUWCdYYG/ThKIMQ/GgrtinwaSULbAZC0f2A39XN09yP6MflbirZ2KweA5py1sriMHNdzI0Vv6HkJb6fyj09BcaUPbvBVHapTadgVUEN2TjAoGANuw/bOMidrD/GVXILPG2Mgl2k+m4U9R4siI4q1dQmpCOXG2uXDc7Pt8Q0sQE9K8YZ4gTTrj/DYKlB30iO6Ip15E4hAkC8VMgnzONWa5P/pyRWC+7CH4Vryx8GFK4zok4qCDcUvUr1McYuI3/RpTavaT/XoDK7QWOpoaqMOSDpbw=';
        }

        if (mode === 'development') {
            manifest.content_scripts[0].js.push(
                'env.js',
                'chunks/vendors-node_modules_lodash__baseKeys_js-node_modules_lodash__getTag_js-node_modules_lodash_i-8f8f3d.js',
                'chunks/vendors-node_modules_lodash_clone_js-node_modules_lodash_debounce_js-node_modules_lodash_last-0fa715.js',
                'chunks/src_ts_shared_internal_ts.js',
                'chunks/src_ts_content_script_internal_ts.js',
            );
        }

        manifest_shared.generate({
            manifest,
            browser,
        });
    };
}

module.exports = { Manifest };
