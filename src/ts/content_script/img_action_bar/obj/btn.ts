import { makeObservable, observable } from 'mobx';

import { t } from '@loftyshaky/shared/shared';

export class Btn {
    public name: string;
    public svg_name: string;
    public is_cut?: boolean = false;
    public event_callback: t.CallbackVariadicVoid;

    public constructor(obj: Btn) {
        makeObservable(this, {
            is_cut: observable,
        });

        Object.assign(this, obj);
        this.name = obj.name;
        this.svg_name = obj.svg_name;
        this.event_callback = obj.event_callback;
    }
}
