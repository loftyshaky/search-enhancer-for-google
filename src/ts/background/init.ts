import {
    data,
    db,
} from 'background/internal';

export const init = (): void => {
    data.Main.i().set_from_storage();
    db.Main.i().init_db();
};
