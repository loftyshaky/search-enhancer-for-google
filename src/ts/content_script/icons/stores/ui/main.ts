import {
    makeObservable,
    observable,
    action,
} from 'mobx';

import { s_el_parser } from 'content_script/internal';

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

    public generate_favicons = ({ i }: { i: number }): void => err(() => {
        this.favicons[i] = `https://s2.googleusercontent.com/s2/favicons?domain_url=${s_el_parser.Main.i().hostnames[i]}`;
    },
    1032);
}
