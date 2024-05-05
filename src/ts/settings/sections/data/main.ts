import { makeObservable, computed } from 'mobx';

import { s_utils } from '@loftyshaky/shared';
import { o_inputs, o_color, i_inputs } from '@loftyshaky/shared/inputs';
import { d_settings } from '@loftyshaky/shared/settings';
import { d_sections } from 'settings/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            current_section: computed,
        });
    }

    public get current_section() {
        return n(data.settings.current_section) ? data.settings.current_section : 'all';
    }

    private options: i_inputs.Options = {};
    public sections: o_inputs.Section[] | i_inputs.Sections = [];

    public init_options = (): void =>
        err(() => {
            this.options = {
                side_panel_position: [
                    new o_inputs.Option({ name: 'left' }),
                    new o_inputs.Option({ name: 'right' }),
                ],
            };
        }, 'seg_1127');

    public init_sections = (): void =>
        err(() => {
            this.sections = [
                ...[
                    new o_inputs.Section({
                        name: 'all',
                        inputs: [
                            new o_inputs.Select({
                                name: 'side_panel_position',
                                options: this.options,
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_color.Color({
                                name: 'keyword_color',
                                event_callback: d_sections.Val.i().change,
                                select_palette_color_callback:
                                    d_sections.Val.i().save_selected_palette_color,
                                hide_color_help_callback: d_sections.Visibility.i().hide_color_help,
                                remove_color_callback: d_sections.Val.i().remove_color_callback,
                                restore_default_palette_callback:
                                    d_sections.Val.i().restore_default_palette_callback,
                            }),
                            new o_inputs.Checkbox({
                                name: 'enable_infinite_scrolling',
                                include_help: true,
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_color.Color({
                                name: 'spinner_color',
                                parent: 'enable_infinite_scrolling',
                                event_callback: d_sections.Val.i().change,
                                select_palette_color_callback:
                                    d_sections.Val.i().save_selected_palette_color,
                                hide_color_help_callback: d_sections.Visibility.i().hide_color_help,
                                remove_color_callback: d_sections.Val.i().remove_color_callback,
                                restore_default_palette_callback:
                                    d_sections.Val.i().restore_default_palette_callback,
                            }),
                            new o_inputs.Checkbox({
                                name: 'enable_btn_is_visible',
                                parent: 'enable_infinite_scrolling',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'page_indicator_is_visible',
                                parent: 'enable_infinite_scrolling',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'page_separators_is_visible',
                                parent: 'enable_infinite_scrolling',
                                include_help: true,
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'favicons_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'server_locations_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'scroll_to_top_btn_is_visible',
                                include_help: true,
                                alt_help_msg: ext.msg('scroll_to_top_title'),
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'jump_to_related_searches_btn_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                        ],
                    }),
                    new o_inputs.Section({
                        name: 'imgs',
                        inputs: [
                            new o_inputs.Checkbox({
                                name: 'img_viewer_img_action_bar_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'img_viewer_img_action_bar_is_visible_only_on_hover',
                                parent: 'img_viewer_img_action_bar_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'img_viewer_view_img_btn_is_visible',
                                parent: 'img_viewer_img_action_bar_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'img_viewer_search_by_img_btn_is_visible',
                                parent: 'img_viewer_img_action_bar_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'img_viewer_download_img_btn_is_visible',
                                parent: 'img_viewer_img_action_bar_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'img_viewer_save_img_as_btn_is_visible',
                                parent: 'img_viewer_img_action_bar_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'img_viewer_copy_img_btn_is_visible',
                                include_help: true,
                                parent: 'img_viewer_img_action_bar_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'img_viewer_copy_img_url_btn_is_visible',
                                parent: 'img_viewer_img_action_bar_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                            /*
                            new o_inputs.Checkbox({
                                name: 'preview_img_viewer_img_action_bar_is_visible',
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'preview_img_viewer_img_action_bar_is_visible_only_on_hover',
                                parent: 'preview_img_viewer_img_action_bar_is_visible',
                                alt_msg: ext.msg(
                                    'img_viewer_img_action_bar_is_visible_only_on_hover_label_text',
                                ),
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'preview_img_viewer_view_img_btn_is_visible',
                                parent: 'preview_img_viewer_img_action_bar_is_visible',
                                alt_msg: ext.msg('img_viewer_view_img_btn_is_visible_label_text'),
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'preview_img_viewer_search_by_img_btn_is_visible',
                                parent: 'preview_img_viewer_img_action_bar_is_visible',
                                alt_msg: ext.msg(
                                    'img_viewer_search_by_img_btn_is_visible_label_text',
                                ),
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'preview_img_viewer_download_img_btn_is_visible',
                                parent: 'preview_img_viewer_img_action_bar_is_visible',
                                alt_msg: ext.msg(
                                    'img_viewer_download_img_btn_is_visible_label_text',
                                ),
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'preview_img_viewer_save_img_as_btn_is_visible',
                                parent: 'preview_img_viewer_img_action_bar_is_visible',
                                alt_msg: ext.msg(
                                    'img_viewer_save_img_as_btn_is_visible_label_text',
                                ),
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'preview_img_viewer_copy_img_btn_is_visible',
                                include_help: true,
                                parent: 'preview_img_viewer_img_action_bar_is_visible',
                                alt_msg: ext.msg('img_viewer_copy_img_btn_is_visible_label_text'),
                                alt_help_msg: ext.msg(
                                    'img_viewer_copy_img_btn_is_visible_help_text',
                                ),
                                event_callback: d_sections.Val.i().change,
                            }),
                            new o_inputs.Checkbox({
                                name: 'preview_img_viewer_copy_img_url_btn_is_visible',
                                parent: 'preview_img_viewer_img_action_bar_is_visible',
                                alt_msg: ext.msg(
                                    'img_viewer_copy_img_url_btn_is_visible_label_text',
                                ),
                                event_callback: d_sections.Val.i().change,
                            }), */
                            new o_inputs.Text({
                                name: 'img_downloads_dir',
                                include_help: true,
                                event_callback: d_sections.Val.i().change,
                                warn_state_checker: d_sections.Val.i().validate_input,
                                remove_val_callback: d_sections.Val.i().remove_val,
                            }),
                        ],
                    }),
                ],
                ...d_settings.Sections.i().make_shared_sections({
                    download_back_up_callback: ext.storage_get,
                    upload_back_up_callback: d_sections.Restore.i().restore_back_up,
                    restore_defaults_callback: () => d_sections.Restore.i().restore_confirm(),
                    input_change_val_callback: d_sections.Val.i().change,
                    admin_inputs: [
                        new o_inputs.Checkbox({
                            name: 'allow_favicons_from_google',
                            val_accessor: 'settings.favicon_providers.google',
                            event_callback: d_sections.Val.i().change,
                        }),
                        new o_inputs.Checkbox({
                            name: 'allow_favicons_from_yandex',
                            val_accessor: 'settings.favicon_providers.yandex',
                            event_callback: d_sections.Val.i().change,
                        }),
                        new o_inputs.Checkbox({
                            name: 'allow_favicons_from_duckduckgo',
                            val_accessor: 'settings.favicon_providers.duckduckgo',
                            event_callback: d_sections.Val.i().change,
                        }),
                    ],
                }),
                ...[
                    new o_inputs.Section({
                        name: 'links',
                        inputs: [
                            new o_inputs.Link({
                                name: 'privacy_policy',
                                href: ext.msg('privacy_policy_link_href'),
                            }),
                            new o_inputs.Link({
                                name: 'rate',
                                browser: env.browser,
                                force_resolve: true,
                            }),
                            ...(env.browser === 'edge'
                                ? []
                                : [
                                      new o_inputs.Link({
                                          name: 'search_enhancer_for_googlei1i',
                                          browser: 'chrome',
                                      }),
                                      new o_inputs.Link({
                                          name: 'search_enhancer_for_googlei2i',
                                          browser: 'edge',
                                      }),
                                  ]),
                            new o_inputs.Link({
                                name: 'github',
                            }),
                            new o_inputs.Link({
                                name: 'facebook_page',
                                href: ext.msg('facebook_page_link_href'),
                            }),
                            new o_inputs.Link({
                                name: 'support_page',
                                href: ext.msg('support_page_link_href'),
                            }),
                            ...(env.browser === 'edge'
                                ? []
                                : [
                                      new o_inputs.Link({
                                          name: 'dependencies',
                                          href: ext.msg('dependencies_link_href'),
                                      }),
                                  ]),
                        ],
                    }),
                ],
            ];

            this.sections = s_utils.Main.i().to_object({
                arr: this.sections as o_inputs.Section[],
            });
            this.sections.back_up.inputs = s_utils.Main.i().to_object({
                arr: this.sections.back_up.inputs as o_inputs.Section[],
            });
            this.sections.restore.inputs = s_utils.Main.i().to_object({
                arr: this.sections.restore.inputs as o_inputs.Section[],
            });
            this.sections.admin.inputs = s_utils.Main.i().to_object({
                arr: this.sections.admin.inputs as o_inputs.Section[],
            });
            this.sections.all.inputs = s_utils.Main.i().to_object({
                arr: this.sections.all.inputs as o_inputs.Section[],
                section: 'all',
            });
            this.sections.imgs.inputs = s_utils.Main.i().to_object({
                arr: this.sections.imgs.inputs as o_inputs.Section[],
                section: 'imgs',
            });
            this.sections.links.inputs = s_utils.Main.i().to_object({
                arr: this.sections.links.inputs as o_inputs.Section[],
                section: 'links',
            });
        }, 'seg_1128');

    public change_section_val = (): void =>
        err(() => {
            data.settings.current_section = d_settings.Sections.i().current_section;

            ext.send_msg({
                msg: 'update_settings_background',
                settings: { current_section: d_settings.Sections.i().current_section },
            });
        }, 'seg_1129');
}
