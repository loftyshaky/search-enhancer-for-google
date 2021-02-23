import 'background/msgs';

misplaced_dependency('background');

export * as s_data from 'background/data/scripts';
export * as s_icons from 'background/icons/scripts';
export * as s_db from 'background/db/scripts';
export * as s_ip_to_country from 'background/ip_to_country/scripts';

export * as i_ip_to_country from 'background/ip_to_country/interfaces';

export * from 'background/init';
