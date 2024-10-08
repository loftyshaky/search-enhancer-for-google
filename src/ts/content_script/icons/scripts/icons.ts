import { s_suffix } from 'shared_clean/internal';
import { s_infinite_scroll, s_location } from 'content_script/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public show_or_hide_native_favicons = (): void =>
        err(() => {
            const filename: string = 'favicon_hidden';
            const cls: string = new s_suffix.Suffix(filename).result;

            const iframe_docs: Document[] = s_infinite_scroll.Iframe.iframes.flatMap(
                (iframe: HTMLIFrameElement): Document[] =>
                    n(iframe) && n(iframe.contentDocument) ? [iframe.contentDocument] : [],
            );

            [document, ...iframe_docs].forEach((doc: Document): void =>
                err(() => {
                    if (data.settings.prefs.favicons_is_visible) {
                        x.remove(sb(doc.head, `.${cls}`));
                    } else {
                        x.css(filename, doc.head, cls);
                    }
                }, 'seg_1235'),
            );
        }, 'seg_1227');

    public prevent_titles_and_icons_from_wrapping = ({
        filtered_links,
    }: {
        filtered_links: HTMLLinkElement[];
    }): void => // put titles and icons on one line (without this title may wrap on second line if it's too long)
        err(() => {
            if (!s_location.Location.is_news_page) {
                filtered_links.forEach((el: HTMLLinkElement): void =>
                    err(() => {
                        x.add_cls(el, new s_suffix.Suffix('white_space').result);
                    }, 'seg_1186'),
                );
            }
        }, 'seg_1187');

    public fix_overlapping_favicon_and_server_location = ({
        el,
    }: {
        el: HTMLElement;
    }): void => // put titles and icons on one line (without this title may wrap on second line if it's too long)
        err(() => {
            if (s_location.Location.is_all_page) {
                const title_display = x.get_css_val(el, 'display');

                if (title_display === '-webkit-box') {
                    el.style.setProperty('display', 'inline-flex', 'important');
                }
            }
        }, 'seg_1234');
}

export const icons = Class.get_instance();
