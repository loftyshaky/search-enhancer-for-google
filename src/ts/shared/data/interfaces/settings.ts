import { i_color } from '@loftyshaky/shared/inputs';

export interface Settings {
    current_section: string;
    options_page_theme: string;
    transition_duration: number;
    color_help_is_visible: boolean;
    enable_cut_features: boolean;
    colors: i_color.Color[];
    side_panel_position: string;
    keyword_color: number;
    spinner_color: number;
    enable_infinite_scrolling: boolean;
    show_enable_btn: boolean;
    show_jump_to_related_searches_btn: boolean;
    show_page_indicator: boolean;
    show_page_separators: boolean;
    show_favicons: boolean;
    show_server_locations: boolean;
    show_scroll_to_top_btn: boolean;
    show_img_viewer_img_action_bar: boolean;
    show_preview_img_viewer_img_action_bar: boolean;
    show_img_viewer_img_action_bar_only_on_hover: boolean;
    show_preview_img_viewer_img_action_bar_only_on_hover: boolean;
    show_view_img_btn: boolean;
    show_search_by_img_btn: boolean;
    show_download_img_btn: boolean;
    show_save_img_as_btn: boolean;
    img_downloads_dir: string;
    show_copy_img_btn: boolean;
    show_copy_img_url_btn: boolean;
    favicon_providers: {
        google: boolean;
        yandex: boolean;
        duckduckgo: boolean;
    };
    infinite_scrolling_enabled: boolean;
    last_ip_to_country_csv_char_count: number;
}
