/**
 * Hello World: an example plugin for the scmJS map editor.
 *
 * It adds one item to the Tools menu. The item opens a pane that says "Hello world" with
 * the name of the open map on the next line, and a Close button. Copy this file as the
 * starting point for a plugin of your own; the API is documented at
 * https://github.com/jeany55/scm-js/blob/main/docs/plugins.md.
 *
 * A plugin needs two files: plugin.json, which says where the code is, and this one, which
 * exports an activate() function that registers whatever the plugin adds to the editor.
 * ko.ts holds the Korean for the words it shows (see "Translations" below).
 */

// A type-only import. `@scm-js/plugin-api` is a devDependency holding the editor's type
// declarations, so your editor and `npm run typecheck` know the shape of `api`; the line
// itself is erased when the plugin is built, and the browser never sees the package.
import type { PluginApi } from "@scm-js/plugin-api";
import { KO } from "./ko";

/*
 * Translations. English is the key: every word the plugin shows goes through
 * `api.i18n.t('English text')`, and ko.ts maps that English to Korean. Text with no entry
 * shows as its English, so a plugin works before it is translated. Always pass a literal
 * string, so `npm test` can find it and check ko.ts has it; values go in as placeholders,
 * `t('{n} units', { n })`, never pasted into the text.
 *
 * Menu labels and command titles are the exception: hand them to the editor in English,
 * wrapped in msg(), and the editor translates them when it draws the menu. msg() does
 * nothing at run time; it only marks the string for the test.
 */
const msg = (text: string) => text;

/**
 * The editor calls this once, when the plugin is enabled, and passes in the API.
 *
 * Menu items, hotkeys and event listeners registered here are taken away again when the
 * plugin is disabled or reloaded, so there is usually nothing to clean up. If you start
 * something the editor cannot see, such as a timer, return a function from activate() and
 * the editor will call it at that point.
 */
export default function activate(api: PluginApi) {
  // Hand the editor the catalogue before anything is shown.
  api.i18n.register({ ko: KO });

  api.menu.add("Tools", {
    label: msg("Hello World…"),
    // Greyed out until a map is open, since the pane shows the map's name.
    enabled: () => api.document.isOpen(),
    run: () => openHelloPane(api),
  });
}

/** Opens the pane: two lines of text and a Close button. */
function openHelloPane(api: PluginApi) {
  const t = api.i18n.t;
  api.ui.dialog({
    title: t("Hello World"),
    size: "sm",

    // The editor draws the frame, the title bar and the footer, then passes in an empty
    // <div> for the plugin to fill. It is plain DOM. Plugins do not share the editor's
    // React, so build the contents however you like.
    mount(body) {
      // info() describes the open map: its name, size, tileset and so on. It returns null
      // when no map is open, which the enabled check above rules out here.
      // The map's name is the map's own text, so it is shown as it is, never translated.
      const mapName = api.document.info()?.name ?? t("(no map open)");

      const greeting = document.createElement("p");
      greeting.textContent = t("Hello world");

      const name = document.createElement("p");
      name.textContent = mapName;

      body.append(greeting, name);
    },

    // Footer buttons, left to right. Leaving buttons out gives this same single Close
    // button; it is written out here to show where your own would go. A button can carry
    // a run(dialog) callback that does the work before the pane closes.
    buttons: [{ label: t("Close") }],
  });
  // The pane is read when it opens, so it is always in the current language. Something that
  // stays on screen, such as a panel, would redraw itself on
  // api.events.on("language", () => …) when the user switches language.
}
