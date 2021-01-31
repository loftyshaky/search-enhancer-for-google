import {
    makeObservable,
    observable,
    action,
    runInAction,
} from 'mobx';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                favicons: observable,
                generate_favicons: action,
            },
        );
    }

    public favicons: { [index: string]: string } = {};

    public generate_favicons = async (
        { hostname }: { hostname: string },
    ): Promise<void> => err_async(async () => {
        const google_icon = `https://s2.googleusercontent.com/s2/favicons?domain_url=${hostname}`;
        const yandex_icon_fallback = `https://favicon.yandex.net/favicon/v2/${hostname}`;

        this.favicons[hostname] = google_icon;

        const favicon_is_empty: boolean = await ext.send_msg_resp(
            {
                msg: 'favicon_is_empty',
                icon_url: google_icon,
            },
        );
        if (favicon_is_empty) {
            runInAction(() => {
                this.favicons[hostname] = yandex_icon_fallback;
            });
        }
    },
    1032);
}
