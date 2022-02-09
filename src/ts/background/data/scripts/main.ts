import _ from 'lodash';

import { t } from '@loftyshaky/shared';
import { d_color } from '@loftyshaky/shared/inputs';
import { i_data } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public defaults: i_data.Settings | t.EmptyRecord = {};

    public init_defaults = (): void =>
        err(() => {
            this.defaults = {
                current_section: 'all',
                options_page_theme: 'light',
                transition_duration: 200,
                color_help_is_visible: true,
                enable_cut_features: false,
                colors: d_color.Color.i().default_colors,
                side_panel_position: 'right',
                keyword_color: 2,
                spinner_color: 15,
                enable_infinite_scrolling: true,
                show_enable_btn: true,
                show_jump_to_related_searches_btn: true,
                show_page_indicator: true,
                show_page_separators: true,
                show_favicons: true,
                show_server_locations: true,
                show_scroll_to_top_btn: true,
                show_img_viewer_img_action_bar: true,
                show_preview_img_viewer_img_action_bar: true,
                show_img_viewer_img_action_bar_only_on_hover: false,
                show_preview_img_viewer_img_action_bar_only_on_hover: false,
                show_view_img_btn: true,
                show_search_by_img_btn: true,
                show_download_img_btn: true,
                show_save_img_as_btn: true,
                img_downloads_dir: '',
                show_copy_img_btn: true,
                show_copy_img_url_btn: true,
                favicon_providers: {
                    google: true,
                    yandex: true,
                    duckduckgo: true,
                },
                infinite_scrolling_enabled: true,
                last_ip_to_country_csv_char_count: 0,
            };
        }, 'ges_1002');

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
        }, 'ges_1003');

    public update_settings_debounce = _.debounce(
        (settings: i_data.Settings, rerun_actions: boolean, transform: boolean = false) =>
            err_async(async () => {
                await this.update_settings({ settings, transform });

                if (n(rerun_actions)) {
                    ext.send_msg_to_all_tabs({ msg: 'rerun_actions' });
                }
            }, 'ges_1177'),
        500,
    );

    public set_from_storage = ({
        transform = false,
    }: { transform?: boolean } = {}): Promise<void> =>
        err_async(async () => {
            const settings: i_data.Settings = await ext.storage_get();

            if (_.isEmpty(settings)) {
                await this.update_settings({ transform });
            } else if (transform) {
                await this.update_settings({ settings, transform });
            }
        }, 'ges_1004');

    private transform = ({ settings }: { settings: i_data.Settings }): Promise<i_data.Settings> =>
        err_async(async () => {
            const updated_settings: any = settings;
            const always_show_img_action_bar_reverse: boolean = n(
                updated_settings.always_show_img_action_bar,
            )
                ? !updated_settings.always_show_img_action_bar
                : false;

            updated_settings.show_img_viewer_img_action_bar = n(
                updated_settings.show_img_viewer_img_action_bar,
            )
                ? updated_settings.show_img_viewer_img_action_bar
                : true;
            updated_settings.show_preview_img_viewer_img_action_bar = n(
                updated_settings.show_preview_img_viewer_img_action_bar,
            )
                ? updated_settings.show_preview_img_viewer_img_action_bar
                : true;
            updated_settings.show_img_viewer_img_action_bar_only_on_hover = n(
                updated_settings.show_img_viewer_img_action_bar_only_on_hover,
            )
                ? updated_settings.show_img_viewer_img_action_bar_only_on_hover
                : always_show_img_action_bar_reverse;
            updated_settings.show_preview_img_viewer_img_action_bar_only_on_hover = n(
                updated_settings.show_preview_img_viewer_img_action_bar_only_on_hover,
            )
                ? updated_settings.show_preview_img_viewer_img_action_bar_only_on_hover
                : always_show_img_action_bar_reverse;

            delete updated_settings.always_show_img_action_bar;

            await ext.storage_remove(['always_show_img_action_bar']);

            return updated_settings;
        }, 'ges_1199');
}
