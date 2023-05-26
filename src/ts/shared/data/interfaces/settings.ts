import { i_color } from '@loftyshaky/shared/inputs';

export interface Settings {
    current_section: string;
    options_page_theme: string;
    transition_duration: number;
    color_help_is_visible: boolean;
    developer_mode: boolean;
    enable_cut_features: boolean;
    offers_are_visible: boolean;
    colors: i_color.Color[];
    side_panel_position: string;
    keyword_color: number;
    spinner_color: number;
    enable_infinite_scrolling: boolean;
    enable_btn_is_visible: boolean;
    jump_to_related_searches_btn_is_visible: boolean;
    page_indicator_is_visible: boolean;
    page_separators_is_visible: boolean;
    favicons_is_visible: boolean;
    server_locations_is_visible: boolean;
    scroll_to_top_btn_is_visible: boolean;
    img_viewer_img_action_bar_is_visible: boolean;
    preview_img_viewer_img_action_bar_is_visible: boolean;
    img_viewer_img_action_bar_is_visible_only_on_hover: boolean;
    preview_img_viewer_img_action_bar_is_visible_only_on_hover: boolean;
    img_viewer_view_img_btn_is_visible: boolean;
    preview_img_viewer_view_img_btn_is_visible: boolean;
    img_viewer_search_by_img_btn_is_visible: boolean;
    preview_img_viewer_search_by_img_btn_is_visible: boolean;
    img_viewer_download_img_btn_is_visible: boolean;
    preview_img_viewer_download_img_btn_is_visible: boolean;
    img_viewer_save_img_as_btn_is_visible: boolean;
    preview_img_viewer_save_img_as_btn_is_visible: boolean;
    img_downloads_dir: '';
    img_viewer_copy_img_btn_is_visible: boolean;
    preview_img_viewer_copy_img_btn_is_visible: boolean;
    img_viewer_copy_img_url_btn_is_visible: boolean;
    preview_img_viewer_copy_img_url_btn_is_visible: boolean;
    favicon_providers: {
        google: boolean;
        yandex: boolean;
        duckduckgo: boolean;
    };
    infinite_scrolling_enabled: boolean;
    last_ip_to_country_csv_char_count: number;
}
