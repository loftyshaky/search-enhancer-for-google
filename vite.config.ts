import type { Target } from 'vite-plugin-static-copy';

import path from 'node:path';

import Reloader from 'advanced-extension-reloader-watch-2/umd/reloader';
import appRoot from 'app-root-path';
import { type LibraryOptions, type UserConfig, defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { Dependencies as DependenciesShared } from '@loftyshaky/shared/build/ts/dependencies';
import { Locales } from '@loftyshaky/shared/build/ts/locales';
import { generate_shared_config } from '@loftyshaky/shared/build/ts/vite.config';

import { Dependencies } from './build/ts/dependencies';
import { Manifest } from './build/ts/manifest';

const app_root = appRoot.path.replaceAll(path.sep, path.posix.sep);

const extension_id = 'mfihhepjphokhfnlioficodoomlnhlbd';

const dependencies_shared = new DependenciesShared({ app_root });

const manifest = new Manifest();
const locales = new Locales({ app_root, exclude_shared_locales: ['de'] });
const dependencies = new Dependencies();

const config = defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const reloader = new Reloader({
        port: env.content_script === 'true' ? 7224 : 7223,
    });

    reloader.watch();

    const dest_path: string = path.posix.join(app_root, 'dist');
    const paths = {
        ts: path.join(app_root, 'src', 'ts'),
    };
    const copy_paths: Target[] =
        env.content_script === 'true'
            ? []
            : [
                  {
                      src: path.posix.join(app_root, 'src', 'flags'),
                      dest: path.posix.join(dest_path, 'flags'),
                      rename: { stripBase: true },
                  },
                  {
                      src: path.posix.join(app_root, 'FLAGS ICONS LICENSE.txt'),
                      dest: dest_path,
                      rename: { stripBase: true },
                  },
                  {
                      src: path.posix.join(app_root, 'src', 'ip_to_country_ipv4.csv'),
                      dest: dest_path,
                      rename: { stripBase: true },
                  },
              ];

    const shared_config = generate_shared_config({
        mode,
        env,
        app_root,
        dest_path,
        copy_paths,
        callback_build_start: () => {},
        callback_close_bundle: ({ build_error }: { build_error: boolean }) => {
            manifest.generate({
                env,
            });
            void locales.merge();

            dependencies_shared.add_missing_dependesies({
                extension_specific_missing_dependencies: dependencies.missing_dependencies,
            });

            if (build_error) {
                reloader.play_error_notification({ extension_id });
            } else {
                reloader.reload({
                    extension_id,
                    play_notifications: true,
                });
            }
        },
        viteStaticCopy,
    }) as UserConfig & { build: { lib: LibraryOptions } };

    if (env.content_script === 'true') {
        shared_config.build.lib.entry = {
            content_script: path.join(paths.ts, 'content_script', 'content_script.ts'),
        };
    } else {
        shared_config.build.lib.entry = {
            ...(shared_config.build.lib.entry as Record<string, unknown>),
            background: path.join(paths.ts, 'background', 'background.ts'),
            settings: path.join(paths.ts, 'settings', 'settings.ts'),
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
        };
    }

    return shared_config;
});

export default config;
