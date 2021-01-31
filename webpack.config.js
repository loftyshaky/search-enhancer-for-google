const path = require('path');

const appRoot = require('app-root-path').path;
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { Reload } = require('advanced-extension-reloader-watch-2');
const { Env } = require('@loftyshaky/shared/js/ext/env');
const { Locales } = require('@loftyshaky/shared/js/ext/locales');
const { shared_config } = require('@loftyshaky/shared/js/ext/webpack.config');
const { TaskScheduler } = require('@loftyshaky/shared/js/task_scheduler');
const { Manifest } = require('./js/manifest');

const reload = new Reload(
    {
        port: 7220,
    },
);

reload.watch();

const task_scheduler = new TaskScheduler();

const app_root = appRoot;

const manifest = new Manifest({ app_root });
const env_instance = new Env({ app_root });
const locales = new Locales({ app_root });

module.exports = (env, argv) => {
    const paths = {
        ts: path.join(
            app_root,
            'src',
            'ts',
        ),
    };

    const config = shared_config({
        app_root,
        webpack,
        argv,
        env,
        MiniCssExtractPlugin,
        // FixStyleOnlyEntriesPlugin,
        CopyWebpackPlugin,
        callback_begin: () => {
            task_scheduler.unlock_dist({
                package_name: 'Extension Reloader',
                remove_dist: argv.mode === 'production',
            });
        },
        callback_done: () => {
            manifest.generate({
                mode: argv.mode,
                browser: env.browser,
            });
            env_instance.generate({ browser: env.browser });
            locales.merge();
            /* reload.reload(
                {
                    hard: false,
                    hard_paths: [
                        '_locales',
                        'shared',
                        'content_script',
                        'background',
                    ],
                },
            ); */
        },
    });

    config.entry = {
        ...config.entry,
        ...{
            background: path.join(
                paths.ts,
                'background',
                'background.ts',
            ),
            settings: path.join(
                paths.ts,
                'settings',
                'settings.ts',
            ),
            content_script: path.join(
                paths.ts,
                'content_script',
                'content_script.ts',
            ),
            settings_css: path.join(
                app_root,
                'src',
                'scss',
                'settings',
                'index.scss',
            ),
            content_script_css: path.join(
                app_root,
                'src',
                'scss',
                'content_script',
                'index.scss',
            ),
            icons: path.join(
                app_root,
                'src',
                'scss',
                'content_script',
                'icons.scss',
            ),
        },
    };

    return config;
};