import { o_inputs, i_inputs } from '@loftyshaky/shared/inputs';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public options: i_inputs.Options = {};

    public init = (): void =>
        err(() => {
            this.options = {
                side_panel_position: [
                    new o_inputs.Option({ name: 'left' }),
                    new o_inputs.Option({ name: 'right' }),
                ],
            };
        }, 'seg_1127');
}

export const Options = Class.get_instance();
