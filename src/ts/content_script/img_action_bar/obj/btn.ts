import { t } from '@loftyshaky/shared';

export class Btn {
    public name: string;
    public svg_name: string;
    public event_callback: t.CallbackVariadicVoid;

    public constructor(obj: Btn) {
        Object.assign(this, obj);
        this.name = obj.name;
        this.svg_name = obj.svg_name;
        this.event_callback = obj.event_callback;
    }
}
