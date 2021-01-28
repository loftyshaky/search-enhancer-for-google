import { db } from 'background/internal';

export const init = (): void => {
    db.Main.i.init_db();
    db.Main.i.set_from_storage();
};
