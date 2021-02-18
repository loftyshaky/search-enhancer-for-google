import { t } from '@loftyshaky/shared';

export interface Btn {
    name: string;
    state_cls?: string;
    on_click: t.CallbackVoid;
}
