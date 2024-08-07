import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import { t, o_schema, d_schema, s_color, s_service_worker } from '@loftyshaky/shared/shared_clean';

import { i_data } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public defaults: i_data.Settings | t.EmptyRecord = {};

    public init_defaults = (): void =>
        err(() => {
            this.defaults = {
                current_section: 'all',
                options_page_theme: 'lavender',
                transition_duration: 200,
                color_help_is_visible: true,
                developer_mode: false,
                enable_cut_features: false,
                persistent_service_worker: false,
                offers_are_visible: true,
                colors: s_color.Colors.default_colors,
                side_panel_position: 'right',
                keyword_color: 2,
                spinner_color: 15,
                enable_infinite_scrolling: true,
                enable_btn_is_visible: true,
                jump_to_related_searches_btn_is_visible: true,
                page_indicator_is_visible: true,
                page_separators_is_visible: true,
                favicons_is_visible: true,
                server_locations_is_visible: true,
                scroll_to_top_btn_is_visible: true,
                img_viewer_img_action_bar_is_visible: true,
                preview_img_viewer_img_action_bar_is_visible: true,
                img_viewer_img_action_bar_is_visible_only_on_hover: false,
                preview_img_viewer_img_action_bar_is_visible_only_on_hover: false,
                img_viewer_view_img_btn_is_visible: true,
                preview_img_viewer_view_img_btn_is_visible: true,
                img_viewer_search_by_img_btn_is_visible: true,
                preview_img_viewer_search_by_img_btn_is_visible: true,
                img_viewer_download_img_btn_is_visible: true,
                preview_img_viewer_download_img_btn_is_visible: true,
                img_viewer_save_img_as_btn_is_visible: true,
                preview_img_viewer_save_img_as_btn_is_visible: true,
                img_downloads_dir: '',
                img_viewer_copy_img_btn_is_visible: true,
                preview_img_viewer_copy_img_btn_is_visible: true,
                img_viewer_copy_img_url_btn_is_visible: true,
                preview_img_viewer_copy_img_url_btn_is_visible: true,
                favicon_providers: {
                    google: true,
                    yandex: true,
                    duckduckgo: true,
                },
                infinite_scrolling_enabled: true,
                last_ip_to_country_csv_char_count: 0,
            };
        }, 'seg_1002');

    public update_settings = ({
        settings,
        transform = false,
    }: { settings?: i_data.Settings; transform?: boolean } = {}): Promise<void> =>
        err_async(async () => {
            const settings_2: i_data.Settings = n(settings)
                ? settings
                : (this.defaults as i_data.Settings);

            let settings_final: i_data.Settings = settings_2;

            if (transform) {
                settings_final = await this.transform({ settings: settings_2 });
            }

            await ext.storage_set(settings_final, transform);

            s_service_worker.ServiceWorker.make_persistent();
        }, 'seg_1003');

    public update_settings_debounce = debounce(
        (
            settings: i_data.Settings,
            rerun_actions: boolean = false,
            rerun_actions_content_script: boolean = false,
            transform: boolean = false,
        ) =>
            err_async(async () => {
                await this.update_settings({ settings, transform });

                if (rerun_actions) {
                    ext.send_msg_to_all_tabs({ msg: 'rerun_actions' });
                }

                if (rerun_actions_content_script) {
                    ext.send_msg_to_all_tabs({ msg: 'rerun_actions_content_script' });
                }
            }, 'seg_1177'),
        500,
    );

    public set_from_storage = ({
        transform = false,
    }: { transform?: boolean } = {}): Promise<void> =>
        err_async(async () => {
            const settings: i_data.Settings = await ext.storage_get();

            if (isEmpty(settings)) {
                await this.update_settings({ transform });
            } else if (transform) {
                await this.update_settings({ settings, transform });
            }
        }, 'seg_1004');

    private transform = ({ settings }: { settings: i_data.Settings }): Promise<i_data.Settings> =>
        err_async(async () => {
            const settings_copy: any = settings;
            const always_show_img_action_bar_reverse: boolean = n(
                settings_copy.always_show_img_action_bar,
            )
                ? !settings_copy.always_show_img_action_bar
                : false;

            const transform_items: o_schema.TransformItem[] = [
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
                    new_val: settings_copy.show_view_img_btn,
                }),
                new o_schema.TransformItem({
                    old_key: 'show_search_by_img_btn',
                    new_key: 'img_viewer_search_by_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    new_key: 'preview_img_viewer_search_by_img_btn_is_visible',
                    new_val: settings_copy.show_search_by_img_btn,
                }),
                new o_schema.TransformItem({
                    old_key: 'show_download_img_btn',
                    new_key: 'img_viewer_download_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    new_key: 'preview_img_viewer_download_img_btn_is_visible',
                    new_val: settings_copy.show_download_img_btn,
                }),
                new o_schema.TransformItem({
                    old_key: 'show_save_img_as_btn',
                    new_key: 'img_viewer_save_img_as_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    new_key: 'preview_img_viewer_save_img_as_btn_is_visible',
                    new_val: settings_copy.show_save_img_as_btn,
                }),
                new o_schema.TransformItem({
                    old_key: 'show_copy_img_btn',
                    new_key: 'img_viewer_copy_img_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    new_key: 'preview_img_viewer_copy_img_btn_is_visible',
                    new_val: settings_copy.show_copy_img_btn,
                }),
                new o_schema.TransformItem({
                    old_key: 'show_copy_img_url_btn',
                    new_key: 'img_viewer_copy_img_url_btn_is_visible',
                }),
                new o_schema.TransformItem({
                    new_key: 'preview_img_viewer_copy_img_url_btn_is_visible',
                    new_val: settings_copy.show_copy_img_url_btn,
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

            const settings_final: i_data.Settings = await d_schema.Schema.transform({
                data: settings_copy,
                transform_items,
            });

            return settings_final;
        }, 'seg_1199');

    public set_session_access_level = (): void =>
        err(() => {
            we.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
        }, 'seg_1236');
}

export const Data = Class.get_instance();
