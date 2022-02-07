const path = require('path');

const appRoot = require('app-root-path').path;
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Reloader = require('advanced-extension-reloader-watch-2/umd/reloader');
const { Env } = require('@loftyshaky/shared/js/ext/env');
const { Locales } = require('@loftyshaky/shared/js/ext/locales');
const { shared_config } = require('@loftyshaky/shared/js/ext/webpack.config');
const { TaskScheduler } = require('@loftyshaky/shared/js/task_scheduler');
const { Manifest } = require('./js/manifest');

const reloader = new Reloader({
    port: 7220,
});

reloader.watch();

const task_scheduler = new TaskScheduler();

const app_root = appRoot;

const manifest = new Manifest({ app_root });
const env_instance = new Env({ app_root });
const locales = new Locales({ app_root });

const ext_id = 'mfihhepjphokhfnlioficodoomlnhlbd';
let first_reload_completed = false;

module.exports = (env, argv) => {
    const paths = {
        ts: path.join(app_root, 'src', 'ts'),
    };

    const config = shared_config({
        app_root,
        webpack,
        argv,
        env,
        MiniCssExtractPlugin,
        OptimizeCssAssetsPlugin,
        FixStyleOnlyEntriesPlugin,
        CopyWebpackPlugin,
        copy_patters: [
            'FLAGS ICONS LICENSE.txt',
            {
                from: path.join('src', 'flags'),
                to: 'flags',
            },
            path.join('src', 'ip_to_country_ipv4.csv'),
        ],
        callback_begin: () => {
            task_scheduler.unlock_dist({
                package_name: 'Search Enhancer for Google',
                remove_dist: argv.mode === 'production',
            });
        },
        callback_done: () => {
            manifest.generate({
                mode: argv.mode,
                test: env.test,
                browser: env.browser,
            });
            env_instance.generate({ browser: env.browser });
            locales.merge();

            if (first_reload_completed) {
                reloader.reload({
                    ext_id,
                    hard: false,
                    play_sound: true,
                    after_enable_delay: 300,
                    full_reload_timeout: 1000,
                    hard_paths: ['_locales', 'shared', 'content_script', 'background'],
                });
            } else {
                reloader.reload({
                    ext_id,
                    hard: true,
                    play_sound: true,
                    after_enable_delay: 300,
                    full_reload_timeout: 1000,
                });

                first_reload_completed = true;
            }
        },
    });

    config.entry = {
        ...config.entry,
        ...{
            background: path.join(paths.ts, 'background', 'background.ts'),
            settings: path.join(paths.ts, 'settings', 'settings.ts'),
            content_script: path.join(paths.ts, 'content_script', 'content_script.ts'),
            settings_css: path.join(app_root, 'src', 'scss', 'settings', 'index.scss'),
            content_script_css: path.join(app_root, 'src', 'scss', 'content_script', 'index.scss'),
            icons: path.join(app_root, 'src', 'scss', 'content_script', 'icons.scss'),
            separator: path.join(app_root, 'src', 'scss', 'content_script', 'separator.scss'),
            iframe_inner: path.join(app_root, 'src', 'scss', 'content_script', 'iframe_inner.scss'),
            spinner: path.join(app_root, 'src', 'scss', 'content_script', 'spinner.scss'),
            load_end_msg: path.join(app_root, 'src', 'scss', 'content_script', 'load_end_msg.scss'),
            side_panel: path.join(app_root, 'src', 'scss', 'content_script', 'side_panel.scss'),
            dark_ui: path.join(app_root, 'src', 'scss', 'content_script', 'dark_ui.scss'),
            img_action_bar: path.join(
                app_root,
                'src',
                'scss',
                'content_script',
                'img_action_bar.scss',
            ),
        },
    };

    return config;
};
