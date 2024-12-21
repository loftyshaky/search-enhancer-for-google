import { t, s_color } from '@loftyshaky/shared/shared_clean';
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
                prefs: {
                    version: ext.get_app_version(),
                    current_section: 'all',
                    options_page_theme: 'ruby',
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
                },
            };
        }, 'seg_1002');
}

export const Settings = Class.get_instance();
