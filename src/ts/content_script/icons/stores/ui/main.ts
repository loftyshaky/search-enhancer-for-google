import {
    makeObservable,
    observable,
    action,
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

    public generate_favicons = ({ hostname }: { hostname: string }): void => err(() => {
        this.favicons[hostname] = `https://s2.googleusercontent.com/s2/favicons?domain_url=${hostname}`;
    },
    1032);
}
