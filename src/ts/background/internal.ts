import 'background/browser_action/scripts';
import 'background/commands/scripts';
import 'background/msgs/scripts';

misplaced_dependency('background');

export * from 'background/init';

export * as s_data from 'background/data/scripts';
export * as s_icons from 'background/icons/scripts';
export * as s_img_action from 'background/img_action/scripts';
