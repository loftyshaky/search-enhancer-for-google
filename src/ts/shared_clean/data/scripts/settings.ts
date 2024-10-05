import { t, s_data } from '@loftyshaky/shared/shared_clean';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public apply_unchanged_prefs = ({ settings }: { settings: any }): t.AnyRecord =>
        err(
            () =>
                s_data.Settings.apply_unchanged_prefs({
                    settings,
                    additional_unchanged_prefs: {
                        last_ip_to_country_csv_char_count:
                            data.settings.prefs.last_ip_to_country_csv_char_count,
                    },
                }),
            'seg_1135',
        );
}

export const Settings = Class.get_instance();
