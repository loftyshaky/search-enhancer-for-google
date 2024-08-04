import { t } from '@loftyshaky/shared/shared';

export interface Btn {
    name: string;
    disabled_cls?: 'disabled' | '';
    position_remembered_cls?: 'position_remembered' | '';
    position_overridden_cls?: 'position_overridden' | '';
    on_click?: t.CallbackVoid;
    on_mouse_down?: t.CallbackVariadicVoid;
    on_mouse_up?: t.CallbackVariadicVoid;
    on_context_menu?: t.CallbackVariadicVoid;
    on_keydown?: t.CallbackVariadicVoid;
}
