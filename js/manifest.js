const appRoot = require('app-root-path').path;

const { Manifest: ManifestShared } = require('@loftyshaky/shared/js/ext/manifest');

const manifest_shared = new ManifestShared({ app_root: appRoot });

class Manifest {
    generate = ({
        mode,
        browser,
    }) => {
        const manifest = {
            manifest_version: 2,
            name: 'Google Enhancement Suite',
            description: '__MSG_description__',
            offline_enabled: true,
            key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnT4SrilXDXfaqqoM3ur3ueyIlfUxIf8WnBgs+RKCNSvx4YpqJcHY8/q8dVPGBY8J8kfyGKWQvsTmeFen06AAc/3bhLtFcMQ1r3U8IG6iNjv/2A1fN0n2kFQBnMAYPz3rfiVccs49DzaqbO8h2MeGCHBP5vuFXIqbWkXu9JkLmx5MuEESGBe+6WhSsjXyJEL/tYBKQA1xyQ3BlwhKt32CnW1B2WaqU5Rw4PlKkBPyQykVr4My4z6r6mTKfBhozThN6xfwdJyY6CTQ0UTcG57uNmd8T5lHwnx2VrbZFvEoPbAEHKzErZ+kWd871oA1fVqWzWSExErCWXSTEWsA3873KwIDAQAB',
            web_accessible_resources: [
                'normalize.css',
                'font_face.css',
                'error.css',
                'icons.css',
            ],
            background: {
                scripts: ['background.js'],
                persistent: false,
            },
            options_ui: {
                page: 'settings.html',
                open_in_tab: true,
            },
            permissions: ['storage'],
            content_scripts: [{
                matches: [
                    'https://s2.googleusercontent.com/s2/favicons?domain_url=*',
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
                js: ['content_script.js'],
                css: ['content_script_css.css'],
            }],
        };

        manifest_shared.generate({
            manifest,
            mode,
            browser,
        });
    }
}

module.exports = { Manifest };