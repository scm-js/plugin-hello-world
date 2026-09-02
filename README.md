# Hello World

The example plugin for [scmJS](https://github.com/jeany55/scm-js), the browser-based
StarCraft 1 / Brood War map editor. It exists to be read: it adds **Tools ▸ Hello World…**,
which opens a small pane saying *Hello world* with the name of the open map underneath,
and a Close button. Nothing else.

That is roughly the least a plugin can do while still touching the three things every
plugin touches — a manifest, an `activate` function, and a contribution to the editor's
UI — so it is a reasonable thing to copy when you start your own.

## Try it

In scmJS: **Plugins ▸ Manage Plugins…**, paste

```
https://github.com/scm-js/plugin-hello-world
```

and press **Add**. This one is *not* installed by default — the editor only ships
[Terrain from Image](https://github.com/scm-js/plugin-image-to-terrain) — so you add it by
hand, which is also exactly how you would install anybody else's plugin.

Then open a map and choose **Tools ▸ Hello World…**.

## What is in here

| | |
| --- | --- |
| `plugin.json` | the manifest: name, version, which file to run (`entry`), the icon, and the API version the plugin needs |
| `plugin.ts` | the whole plugin — `activate(api)`, one menu item, one dialog. Read this one. |
| `plugin-api/` | the editor's type declarations, vendored so this repository type-checks on its own |
| `tsconfig.json`, `package.json` | for `npm run typecheck`; the editor needs neither |

### The manifest

```json
{
  "name": "Hello World",
  "id": "hello-world",
  "version": "1.0.0",
  "description": "The smallest plugin there is: a Tools menu item that opens a pane saying hello to the open map.",
  "author": "Jeany",
  "homepage": "https://github.com/scm-js/plugin-hello-world",
  "entry": "plugin.ts",
  "icon": "👋",
  "api": 1
}
```

Only `name` is actually required. `entry` defaults to `plugin.ts`; `icon` can be an emoji
(as here), an image file beside the manifest, a `data:` URI or an image URL; and `api` is
the plugin API version this plugin *needs* — not the newest one. This plugin only uses
methods that have been there since version 1, so it says `1` and will keep loading in
older hosts. Use `2` if you reach for something added in 2, such as `ui.pickArea`.

### The code

`plugin.ts` is TypeScript, and the editor transpiles it in the browser when it loads the
plugin — there is no build step and no `npm install` anywhere in the loading path. Plain
`.js` works just as well if you would rather not use TypeScript.

The `import type` line at the top of it is erased at load time, so `plugin-api/` never
reaches the browser: it is only there to give your editor completion and to make
`npm run typecheck` mean something. Those declarations are generated in the scmJS
repository by `npm run build:plugin-types`; copy them in again when the plugin API moves.

## Where to go next

- The API tour and the host-side notes: [`docs/plugins.md`](https://github.com/jeany55/scm-js/blob/main/docs/plugins.md).
- The exact typings: [`src/plugins/api.ts`](https://github.com/jeany55/scm-js/blob/main/src/plugins/api.ts) in the editor, or `plugin-api/plugins/api.d.ts` here.
- A plugin that does real work — dialogs, images, map picking, and edits through the undo
  model: [Terrain from Image](https://github.com/scm-js/plugin-image-to-terrain).

Beyond menus and dialogs, a plugin can add context-menu entries and hotkeys, read the open
scenario, listen for editor events, keep its own settings, and change the map through
`api.document.edit(label, tx => …)` — one transaction, one undo step, exactly like a brush
stroke.

## Development

```sh
npm install
npm run typecheck
```

To work on a plugin locally, serve the folder (`npx serve .`), add
`http://localhost:3000/` in **Manage Plugins…**, and press **Reload** after each change.

## Licence

MIT.
