/**
 * Hello World — the smallest plugin the scmJS map editor can load, written to be read.
 *
 * It adds one item to the Tools menu, and that item opens a pane saying "Hello world"
 * with the name of the open map underneath and a Close button. That is the whole
 * plugin: a manifest (`plugin.json`) that says where the code is, and one `activate`
 * function that registers whatever the plugin contributes.
 *
 * Copy this repository as the starting point for your own. The full API is documented
 * at https://github.com/jeany55/scm-js/blob/main/docs/plugins.md.
 */

// A type-only import: the editor erases this line when it loads the file, so the
// vendored `plugin-api/` folder is there for your editor and `npm run typecheck`, not
// for the browser. A plugin ships no dependencies and needs no build step.
import type { PluginApi } from "./plugin-api/plugins/api";

/**
 * The entry point. The editor calls it once, when the plugin is enabled, and hands over
 * the API — everything a plugin is allowed to see and do.
 *
 * Whatever is registered here (menu items, hotkeys, event listeners) is removed again
 * when the plugin is disabled or reloaded, so there is normally nothing to clean up. If
 * you start something the editor cannot see — a timer, a socket — return a function
 * from `activate` and the editor will call it at that point.
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

    // A plugin's pane is plain DOM. The editor draws the frame, the title bar and the
    // footer, then hands you an empty <div> to fill however you like — no React, no
    // stylesheet of the editor's to fight with.
    mount(body) {
      // `info()` describes the open map: name, size, tileset, whether it is modified…
      // It is null when no map is open, which the `enabled` check above rules out here.
      const mapName = api.document.info()?.name ?? "(no map open)";

      const greeting = document.createElement("p");
      greeting.textContent = "Hello world";

      const name = document.createElement("p");
      name.textContent = mapName;

      body.append(greeting, name);
    },

    // The footer buttons, left to right. Leaving `buttons` out gives exactly this one
    // Close button; it is spelled out to show where your own ("Apply", "Cancel", …)
    // would go. A button can carry a `run(dialog)` that does the work.
    buttons: [{ label: "Close" }],
  });
}
