/**
 * Hello World: an example plugin for the scmJS map editor.
 *
 * It adds one item to the Tools menu. The item opens a pane that says "Hello world" with
 * the name of the open map on the next line, and a Close button. Copy this file as the
 * starting point for a plugin of your own; the API is documented at
 * https://github.com/jeany55/scm-js/blob/main/docs/plugins.md.
 *
 * A plugin is two files: plugin.json, which says where the code is, and this one, which
 * exports an activate() function that registers whatever the plugin adds to the editor.
 */

// A type-only import. `@scm-js/plugin-api` is a devDependency holding the editor's type
// declarations, so your editor and `npm run typecheck` know the shape of `api`; the line
// itself is erased when the plugin is built, and the browser never sees the package.
import type { PluginApi } from "@scm-js/plugin-api";

/**
 * The editor calls this once, when the plugin is enabled, and passes in the API.
 *
 * Menu items, hotkeys and event listeners registered here are taken away again when the
 * plugin is disabled or reloaded, so there is usually nothing to clean up. If you start
 * something the editor cannot see, such as a timer, return a function from activate() and
 * the editor will call it at that point.
 */
export default function activate(api: PluginApi) {
  api.menu.add("Tools", {
    label: "Hello World…",
    // Greyed out until a map is open, since the pane shows the map's name.
    enabled: () => api.document.isOpen(),
    run: () => openHelloPane(api),
  });
}

/** Opens the pane: two lines of text and a Close button. */
function openHelloPane(api: PluginApi) {
  api.ui.dialog({
    title: "Hello World",
    size: "sm",

    // The editor draws the frame, the title bar and the footer, then passes in an empty
    // <div> for the plugin to fill. It is plain DOM. Plugins do not share the editor's
    // React, so build the contents however you like.
    mount(body) {
      // info() describes the open map: its name, size, tileset and so on. It returns null
      // when no map is open, which the enabled check above rules out here.
      const mapName = api.document.info()?.name ?? "(no map open)";

      const greeting = document.createElement("p");
      greeting.textContent = "Hello world";

      const name = document.createElement("p");
      name.textContent = mapName;

      body.append(greeting, name);
    },

    // Footer buttons, left to right. Leaving buttons out gives this same single Close
    // button; it is written out here to show where your own would go. A button can carry
    // a run(dialog) callback that does the work before the pane closes.
    buttons: [{ label: "Close" }],
  });
}
