import 'content_script/msgs';
import 'content_script/mutations/scripts';

misplaced_dependency('content_script');

export * as s_roots from 'content_script/roots/scripts';
export * as s_actions from 'content_script/actions/scripts';
export * as s_el_parser from 'content_script/el_parser/scripts';
export * as s_keywords from 'content_script/keywords/scripts';
export * as s_infinite_scroll from 'content_script/infinite_scroll/scripts';
export * as c_icons from 'content_script/icons/components';
export * as p_icons from 'content_script/icons/components/prop_types';
export * as u_icons from 'content_script/icons/stores/ui';
export * as i_icons from 'content_script/icons/interfaces';
export * from 'content_script/init';
