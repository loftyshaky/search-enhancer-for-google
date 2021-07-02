import 'background/browser_action/scripts';
import 'background/msgs/scripts';

misplaced_dependency('background');

export * from 'background/init';

export * as s_data from 'background/data/scripts';
export * as s_icons from 'background/icons/scripts';
export * as s_img_action from 'background/img_action/scripts';
export * as s_ip_to_country from 'background/ip_to_country/scripts';
