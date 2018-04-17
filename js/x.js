//> console.log t

//> selecting elements t

//> dom manipulation t

//> get_parent_with_class f

//> has_class f

//> remove_class f

//> add_class f

//> add_event_listener_to_multiple_els f

//> add_event_listener_with_params_to_multiple_els f

//> load_css f

//> debounce f

//> animation t

//> delay f

//> chrome o 

//>1 storage t

//>1 localization t

//>1 message passing t

x = {};

function ext_id(prefix) {
    return prefix + '_pipbbdfondfipmjmdkmggihiknhmcfhd';
}

window.browser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();

//> console.log t
let l = console.log.bind(console);
//< console.log t

op = {
    '+': function (a, b) { return a + b },
    '-': function (a, b) { return a - b },
    '+=': function (a, b) { return a += b },
    '-=': function (a, b) { return a -= b }
};

//> selecting elements t
function s(selector) { // $
    return document.querySelector(selector);
}

function sa(selector) { // $ All
    return document.querySelectorAll(selector);
}

function sb(base_element, selector) { // $ with base element
    return base_element.querySelector(selector);
}

function sab(base_element, selector) { // $ All with base element
    return base_element.querySelectorAll(selector);
}
//< selecting elements t

//> dom manipulation t
x.create = (el_type, class_name) => { // create element
    let el = document.createElement(el_type);
    el.className = class_name;

    return el;
};

x.append = (el, child) => { // append child
    el.appendChild(child);
};

x.remove = el => { // remove child
    if (el) {
        el.parentNode.removeChild(el);
    }
};

x.before = (el_to_insert_before, el_to_insert) => { // insert before
    el_to_insert_before.parentNode.insertBefore(el_to_insert, el_to_insert_before);
};

x.after = (el_to_insert_after, el_to_insert) => { // insert after
    el_to_insert_after.parentNode.insertBefore(el_to_insert, el_to_insert_after.nextElementSibling);
};

x.as_first = (el_to_insert_after, el_to_insert) => { // insert as the first child
    el_to_insert_after.insertBefore(el_to_insert, el_to_insert_after.firstElementChild);
};

x.replace = (el_to_replace, new_el) => {
    el_to_replace.parentNode.replaceChild(new_el, el_to_replace);
}
//< dom manipulation t

//> get_parent_with_class f
x.get_parent_with_class = (el, class_name, breakpoint) => {
    let count = 0;

    while (el && el.parentNode && !x.has_class(el, class_name) && count !== breakpoint) {
        el = el.parentNode;

        count++;
    }

    return el;
};
//< get_parent_with_class f

//> has_class f
x.has_class = (el, class_name) => {
    if (el.nodeType === 1) { // if not document
        return Array.from(el.classList).indexOf(class_name) !== - 1; // contains not working on svg element hence Array.from

    } else {
        return false;
    }
};
//< has_class f

//> remove_class f
x.remove_class = (el, class_name) => {
    el.classList.remove(class_name);
};
//< remove_class f

//> add_class f
x.add_class = (el, class_name) => {
    el.classList.add(class_name);
};
//< add_class f

//> add_event_listener_to_multiple_els f
x.add_event_listener_to_multiple_els = (base_element, selector, event, fun) => {
    let els = sab(base_element, selector);

    for (el of els) {
        el.addEventListener(event, fun);
    }
};
//< add_event_listener_to_multiple_els f

//> add_event_listener_with_params_to_multiple_els f
x.add_event_listener_with_params_to_multiple_els = (base_element, selector, event, fun, fun_args) => {
    let els = sab(base_element, selector);

    for (el of els) {
        el.addEventListener(event, fun.bind.apply(fun, [el].concat(fun_args)));
    }
};
//< add_event_listener_with_params_to_multiple_els f

//> load_css f
x.load_css = (doc, filename) => {
    let classname = ext_id(filename);
    let link = sb(doc, '.' + classname);

    if (!link) {
        link = document.createElement("link");
        link.className = classname;
        link.href = browser.extension.getURL('css/' + filename + '.css');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        x.append(doc.head, link);
    }

    return link;
};
//< load_css f

//> animation t
(() => {
    x.fade_out = (el, add_ext_id) => { // g
        let cls = get_opacity_class(add_ext_id);

        if (!x.has_class(el, cls.opacity_0)) {
            x.add_class(el, cls.opacity_0);

            el.addEventListener('transitionend', function (e) { // arguments not working with arrow functions
                e.target.removeEventListener(e.type, arguments.callee);

                x.add_class(el, cls.none);
            });
        }
    };

    x.fade_in = async (el, add_ext_id) => { // g
        let cls = get_opacity_class(add_ext_id);

        if (x.has_class(el, cls.opacity_0)) {
            x.remove_class(el, cls.none);

           await x.delay(50);

            x.remove_class(el, cls.opacity_0);
        }
    };

    x.set_faded_out_to_none = function (old_class, e) { // g
        if (e.target === this && x.has_class(this, old_class)) {
            x.add_class(this, 'none');
        }
    };

    function get_opacity_class(add_ext_id) {
        let cls = {};

        if (!add_ext_id) {
            cls.opacity_0 = 'opacity_0';
            cls.none = 'none';

        } else {
            cls.opacity_0 = ext_id('opacity_0');
            cls.none = ext_id('none');
        }

        return cls;
    }
})();
//< animation t

//> delay f
x.delay = delay => {
    return new Promise(resolve => window.setTimeout(() => resolve(), delay));
};
//< delay f

//> chrome o
//>1 storage t
x.get = item_to_get => {
    return new Promise(resolve => {
        browser.storage.sync.get(o => {
            resolve(o);
        });
    });
};

x.set = item_to_store => {
    return new Promise(resolve => {
        browser.storage.sync.set(item_to_store, () => {
            resolve();
        });
    });
};
//<1 storage t

//>1 localization t
x.message = (message) => {
    return browser.i18n.getMessage(message)
};
//<1 localization t

//>1 message passing t
x.send_message_to_background = (message_o) => { // to background.js ex: '{"message": "create_search_engine_form"}'
    browser.runtime.sendMessage(message_o);
};
//<1 message passing t
//< chrome o