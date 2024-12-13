import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';

import {
    o_schema,
    d_schema,
    s_data as s_data_loftyshaky_shared_clean,
    s_service_worker,
} from '@loftyshaky/shared/shared_clean';
import { s_data as s_data_shared_clean, i_data } from 'shared_clean/internal';
import { s_data } from 'background/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set_from_storage_run_prevented: boolean = false;

    public update_settings = ({
        settings,
        replace = false,
        transform = false,
        transform_force = false,
        load_settings = false,
        load_settings_content_script = false,
        restore_back_up = false,
    }: {
        settings?: i_data.Settings;
        replace?: boolean;
        transform?: boolean;
        transform_force?: boolean;
        load_settings?: boolean;
        load_settings_content_script?: boolean;
        restore_back_up?: boolean;
    } = {}): Promise<void> =>
        err_async(async () => {
            const settings_2: i_data.Settings = n(settings)
                ? settings
                : (s_data.Settings.defaults as i_data.Settings);

            let settings_final: i_data.Settings = settings_2;

            if (transform) {
                settings_final = await this.transform({
                    settings: settings_2,
                    force: transform_force,
                });

                if (restore_back_up) {
                    settings_final = s_data_shared_clean.Settings.apply_unchanged_prefs({
                        settings: settings_final,
                    });
                }
            }

            await s_data_loftyshaky_shared_clean.Cache.set_settings({
                settings: settings_final,
            });
            await ext.storage_set(settings_final, replace);

            if (load_settings) {
                await ext.send_msg_resp({ msg: 'load_settings', restore_back_up });
            }

            if (load_settings_content_script) {
                ext.send_msg_to_all_tabs({ msg: 'load_settings_content_script' });
            }

            s_service_worker.ServiceWorker.make_persistent();
        }, 'seg_1003');

    public react_to_settings_change = (): Promise<void> =>
        err_async(async () => {
            await s_data_loftyshaky_shared_clean.Cache.set({
                key: 'updating_settings',
                val: false,
            });

            await ext.send_msg_resp({ msg: 'load_settings', transform: true });
            s_service_worker.ServiceWorker.make_persistent();
        }, 'seg_1239');

    public update_settings_debounce = debounce(
        (
            settings: i_data.Settings,
            replace,
            transform: boolean = false,
            transform_force: boolean = false,
            load_settings: boolean = false,
            load_settings_content_script: boolean = false,
            restore_back_up: boolean = false,
        ) =>
            err_async(async () => {
                await this.update_settings({
                    settings,
                    replace,
                    transform,
                    transform_force,
                    load_settings,
                    restore_back_up,
                });

                if (load_settings) {
                    ext.send_msg_to_all_tabs({ msg: 'load_settings' });
                }

                if (load_settings_content_script) {
                    ext.send_msg_to_all_tabs({ msg: 'load_settings_content_script' });
                }
            }, 'seg_1177'),
        250,
    );

    public set_from_storage = ({
        transform = false,
    }: { transform?: boolean } = {}): Promise<void> =>
        err_async(async () => {
            if (!x.prefs_are_filled() && !x.found_old_settings()) {
                await this.update_settings({ transform });
            } else if (transform) {
                await this.update_settings({ settings: data.settings, transform });
            }
        }, 'seg_1004');

    public on_init_set_from_storage = (): Promise<void> =>
        err_async(async () => {
            if (!n(data.updating_settings) || !data.updating_settings) {
                await this.set_from_storage({ transform: true });
            }
        }, 'seg_1243');

    private transform = ({
        settings,
        force = false,
    }: {
        settings: i_data.Settings;
        force?: boolean;
    }): Promise<i_data.Settings> =>
        err_async(async () => {
            const version = d_schema.Schema.get_version_legacy({ settings });

            const transform_items_settings: o_schema.TransformItem[] = [
                new o_schema.TransformItem({
                    new_key: 'prefs',
                    new_val: cloneDeep(settings),
                }),
                new o_schema.TransformItem({
                    old_key: 'current_section',
                }),
                new o_schema.TransformItem({
                    old_key: 'options_page_theme',
                }),
                new o_schema.TransformItem({
                    old_key: 'transition_duration',
                }),
                new o_schema.TransformItem({
                    old_key: 'color_help_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'developer_mode',
                }),
                new o_schema.TransformItem({
                    old_key: 'enable_cut_features',
                }),
                new o_schema.TransformItem({
                    old_key: 'persistent_service_worker',
                }),
                new o_schema.TransformItem({
                    old_key: 'offers_are_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'colors',
                }),
                new o_schema.TransformItem({
                    old_key: 'side_panel_position',
                }),
                new o_schema.TransformItem({
                    old_key: 'keyword_color',
                }),
                new o_schema.TransformItem({
                    old_key: 'spinner_color',
                }),
                new o_schema.TransformItem({
                    old_key: 'enable_infinite_scrolling',
                }),
                new o_schema.TransformItem({
                    old_key: 'enable_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'jump_to_related_searches_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'page_indicator_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'page_separators_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'favicons_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'server_locations_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'scroll_to_top_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'img_viewer_img_action_bar_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'preview_img_viewer_img_action_bar_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'img_viewer_img_action_bar_is_visible_only_on_hover',
                }),
                new o_schema.TransformItem({
                    old_key: 'preview_img_viewer_img_action_bar_is_visible_only_on_hover',
                }),
                new o_schema.TransformItem({
                    old_key: 'img_viewer_view_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'preview_img_viewer_view_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'img_viewer_search_by_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'preview_img_viewer_search_by_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'img_viewer_download_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'preview_img_viewer_download_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'img_viewer_save_img_as_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'preview_img_viewer_save_img_as_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'img_downloads_dir',
                }),
                new o_schema.TransformItem({
                    old_key: 'img_viewer_copy_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'preview_img_viewer_copy_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'img_viewer_copy_img_url_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'preview_img_viewer_copy_img_url_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'favicon_providers',
                }),
                new o_schema.TransformItem({
                    old_key: 'infinite_scrolling_enabled',
                }),
                new o_schema.TransformItem({
                    old_key: 'last_ip_to_country_csv_char_count',
                }),
            ];

            const updated_settings = await d_schema.Schema.transform({
                data_obj: settings,
                version,
                transform_items: transform_items_settings,
                force,
            });

            const always_show_img_action_bar_reverse: boolean = n(
                updated_settings.prefs.always_show_img_action_bar,
            )
                ? !updated_settings.prefs.always_show_img_action_bar
                : false;

            const transform_items_prefs: o_schema.TransformItem[] = [
                new o_schema.TransformItem({
                    new_key: 'show_img_viewer_img_action_bar',
                    new_val: true,
                }),
                new o_schema.TransformItem({
                    new_key: 'show_preview_img_viewer_img_action_bar',
                    new_val: true,
                }),
                new o_schema.TransformItem({
                    old_key: 'always_show_img_action_bar',
                    new_key: 'show_img_viewer_img_action_bar_only_on_hover',
                    new_val: always_show_img_action_bar_reverse,
                }),
                new o_schema.TransformItem({
                    old_key: 'always_show_img_action_bar',
                    new_key: 'show_preview_img_viewer_img_action_bar_only_on_hover',
                    new_val: always_show_img_action_bar_reverse,
                }),
                new o_schema.TransformItem({
                    old_key: 'show_img_viewer_img_action_bar',
                    new_key: 'img_viewer_img_action_bar_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'show_preview_img_viewer_img_action_bar',
                    new_key: 'preview_img_viewer_img_action_bar_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'show_img_viewer_img_action_bar_only_on_hover',
                    new_key: 'img_viewer_img_action_bar_is_visible_only_on_hover',
                }),
                new o_schema.TransformItem({
                    old_key: 'show_preview_img_viewer_img_action_bar_only_on_hover',
                    new_key: 'preview_img_viewer_img_action_bar_is_visible_only_on_hover',
                }),
                new o_schema.TransformItem({
                    old_key: 'show_enable_btn',
                    new_key: 'enable_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'show_jump_to_related_searches_btn',
                    new_key: 'jump_to_related_searches_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'show_page_indicator',
                    new_key: 'page_indicator_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'show_page_separators',
                    new_key: 'page_separators_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'show_favicons',
                    new_key: 'favicons_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'show_server_locations',
                    new_key: 'server_locations_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'show_scroll_to_top_btn',
                    new_key: 'scroll_to_top_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    old_key: 'show_view_img_btn',
                    new_key: 'img_viewer_view_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    new_key: 'preview_img_viewer_view_img_btn_is_visible',
                    new_val: updated_settings.prefs.show_view_img_btn,
                }),
                new o_schema.TransformItem({
                    old_key: 'show_search_by_img_btn',
                    new_key: 'img_viewer_search_by_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    new_key: 'preview_img_viewer_search_by_img_btn_is_visible',
                    new_val: updated_settings.prefs.show_search_by_img_btn,
                }),
                new o_schema.TransformItem({
                    old_key: 'show_download_img_btn',
                    new_key: 'img_viewer_download_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    new_key: 'preview_img_viewer_download_img_btn_is_visible',
                    new_val: updated_settings.prefs.show_download_img_btn,
                }),
                new o_schema.TransformItem({
                    old_key: 'show_save_img_as_btn',
                    new_key: 'img_viewer_save_img_as_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    new_key: 'preview_img_viewer_save_img_as_btn_is_visible',
                    new_val: updated_settings.prefs.show_save_img_as_btn,
                }),
                new o_schema.TransformItem({
                    old_key: 'show_copy_img_btn',
                    new_key: 'img_viewer_copy_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    new_key: 'preview_img_viewer_copy_img_btn_is_visible',
                    new_val: updated_settings.prefs.show_copy_img_btn,
                }),
                new o_schema.TransformItem({
                    old_key: 'show_copy_img_url_btn',
                    new_key: 'img_viewer_copy_img_url_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    new_key: 'preview_img_viewer_copy_img_url_btn_is_visible',
                    new_val: updated_settings.prefs.show_copy_img_url_btn,
                }),
                new o_schema.TransformItem({
                    new_key: 'developer_mode',
                    new_val: false,
                }),
                new o_schema.TransformItem({
                    new_key: 'offers_are_visible',
                    new_val: true,
                }),
                new o_schema.TransformItem({
                    new_key: 'persistent_service_worker',
                    new_val: false,
                }),
            ];
            const updated_prefs: i_data.Prefs = await d_schema.Schema.transform({
                data_obj: updated_settings.prefs,
                version,
                transform_items: transform_items_prefs,
                force,
            });

            updated_prefs.version = ext.get_app_version();

            settings.prefs = updated_prefs;

            await d_schema.Schema.replace({ settings });

            return settings;
        }, 'seg_1199');

    public set_session_access_level = (): void =>
        err(() => {
            we.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
        }, 'seg_1236');
}

export const Manipulation = Class.get_instance();
