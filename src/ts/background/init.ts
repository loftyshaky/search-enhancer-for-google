import { db } from 'background/internal';

export const init = (): void => {
    db.init();
};
