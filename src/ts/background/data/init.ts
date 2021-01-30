import { data } from 'background/internal';

export const init = (): void => {
    data.Main.i().set_from_storage();
};
