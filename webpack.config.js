const path = require('path');

const appRoot = require('app-root-path').path;
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LicensePlugin = require('webpack-license-plugin');

const Reloader = require('advanced-extension-reloader-watch-2/umd/reloader');
const { Env } = require('@loftyshaky/shared/js/env');
const { Locales } = require('@loftyshaky/shared/js/locales');
const { shared_config } = require('@loftyshaky/shared/js/webpack.config');
const { TaskScheduler } = require('@loftyshaky/shared/js/task_scheduler');
const { Dependencies: DependenciesShared } = require('@loftyshaky/shared/js/dependencies');
const { Manifest } = require('./js/manifest');
const { Dependencies } = require('./js/dependencies');

const reloader = new Reloader({
    port: 7222,
});

reloader.watch();

const app_root = appRoot;

const task_scheduler = new TaskScheduler();
const dependencies_shared = new DependenciesShared({ app_root });

const manifest = new Manifest({ app_root });
const env_instance = new Env({ app_root });
const locales = new Locales({ app_root });
const dependencies = new Dependencies();

const ext_id = 'mfihhepjphokhfnlioficodoomlnhlbd';

module.exports = (env, argv) => {
    const paths = {
        ts: path.join(app_root, 'src', 'ts'),
    };

    const config = shared_config({
        app_type: 'ext',
        app_root,
        webpack,
        argv,
        env,
        TerserPlugin,
        MiniCssExtractPlugin,
        CssMinimizerPlugin,
        CopyWebpackPlugin,
        LicensePlugin,
        copy_patters: [
            'FLAGS ICONS LICENSE.txt',
            {
                from: path.join('src', 'flags'),
                to: 'flags',
            },
            path.join('src', 'ip_to_country_ipv4.csv'),
        ],
        enable_anouncement: false,
        callback_begin: () => {
            task_scheduler.unlock_dist({
                package_name: 'Search Enhancer for Google',
                remove_dist: argv.mode === 'production',
            });
        },
        callback_done: (stats) => {
            const env_2 = 'ext';

            manifest.generate({
                mode: argv.mode,
                test: env.test,
                browser: env.browser,
            });
            env_instance.generate({ browser: env.browser, mode: argv.mode, env: env_2 });
            locales.merge({ env: env_2 });
            dependencies_shared.add_missing_dependesies({
                extension_specific_missing_dependencies: dependencies.missing_dependencies,
            });

            const an_error_occured = stats.compilation.errors.length !== 0;

            if (an_error_occured) {
                reloader.play_error_notification();
            } else {
                reloader.reload({
                    ext_id,
                    play_sound: true,
                });
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
            icons: path.join(app_root, 'src', 'scss', 'content_script', 'embed', 'icons.scss'),
            separator: path.join(
                app_root,
                'src',
                'scss',
                'content_script',
                'embed',
                'separator.scss',
            ),
            google_iframe_inner: path.join(
                app_root,
                'src',
                'scss',
                'content_script',
                'embed',
                'google_iframe_inner.scss',
            ),
            spinner: path.join(app_root, 'src', 'scss', 'content_script', 'embed', 'spinner.scss'),
            load_end_msg: path.join(
                app_root,
                'src',
                'scss',
                'content_script',
                'embed',
                'load_end_msg.scss',
            ),
            side_panel: path.join(
                app_root,
                'src',
                'scss',
                'content_script',
                'embed',
                'side_panel.scss',
            ),
            dark_ui: path.join(app_root, 'src', 'scss', 'content_script', 'embed', 'dark_ui.scss'),
            img_action_bar: path.join(
                app_root,
                'src',
                'scss',
                'content_script',
                'embed',
                'img_action_bar.scss',
            ),
            favicon_hidden: path.join(
                app_root,
                'src',
                'scss',
                'content_script',
                'embed',
                'favicon_hidden.scss',
            ),
        },
    };

    return config;
};
