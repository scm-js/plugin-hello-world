# Hello World

An example plugin for [scmJS](https://github.com/jeany55/scm-js), a browser-based
StarCraft 1 / Brood War map editor.

It adds one item to the Tools menu. The item opens a small pane that says "Hello world",
shows the name of the open map on the next line, and has a Close button. There is nothing
else to it: it is a short, commented file to copy when you start writing your own plugin.

## Try it

In scmJS, open Plugins ▸ Manage Plugins…, paste

```
https://github.com/scm-js/plugin-hello-world
```

into the box and press Add. Then open a map and choose Tools ▸ Hello World….

This plugin is not installed by default (only
[Terrain from Image](https://github.com/scm-js/plugin-image-to-terrain) is), so you add it
by hand, the same way you would add anyone else's.

## Files

- `plugin.ts` is the plugin. About sixty lines, most of them comments. Start here.
- `plugin.json` is the manifest: name, version, which file to run, the icon, and the API
  version the plugin needs.
- `plugin-api/` holds the editor's type declarations, copied in so this repository
  type-checks on its own.
- `tsconfig.json` and `package.json` are only for `npm run typecheck`. The editor never
  reads them.

## The manifest

```json
{
  "name": "Hello World",
  "id": "hello-world",
  "version": "1.0.0",
  "description": "Adds a Tools menu item that opens a pane saying hello, with the name of the open map.",
  "author": "Jeany",
  "homepage": "https://github.com/scm-js/plugin-hello-world",
  "entry": "plugin.ts",
  "icon": "👋",
  "api": 1
}
```

Only `name` is required. `entry` defaults to `plugin.ts`. `icon` can be an emoji, an image
file sitting next to the manifest, a `data:` URI, or the URL of an image.

`api` is the API version this plugin needs, which is usually older than the current one.
Nothing here was added after version 1, so it says 1 and an older editor will still load
it. A plugin that called something newer, such as `ui.pickArea`, would say 2.

## The code

The editor fetches `plugin.ts` over the network and transpiles it in the browser, so there
is no build step and nothing to install. Plain JavaScript works as well if you would
rather skip TypeScript.

The `import type` line at the top is erased when the file loads, so `plugin-api/` never
reaches the browser. It is there for autocomplete in your editor and for
`npm run typecheck`. Those declarations are generated in the scmJS repository by
`npm run build:plugin-types`; copy them in again when the plugin API changes.

## Doing more than this

A plugin can also add context-menu entries and hotkeys, read the open scenario, listen for
editor events, keep its own settings, and change the map through
`api.document.edit(label, tx => ...)`, which becomes a single undo step like a brush
stroke.

- [docs/plugins.md](https://github.com/jeany55/scm-js/blob/main/docs/plugins.md) walks
  through the API.
- [src/plugins/api.ts](https://github.com/jeany55/scm-js/blob/main/src/plugins/api.ts) is
  the exact surface, also vendored here as `plugin-api/plugins/api.d.ts`.
- [Terrain from Image](https://github.com/scm-js/plugin-image-to-terrain) is a plugin with
  real work in it, if you want a longer example.

## Development

```sh
npm install
npm run typecheck
```

While working on a plugin it is quicker to load it from disk: serve the folder with
`npx serve .`, add `http://localhost:3000/` in Manage Plugins…, and press Reload after
each change.

## Licence

MIT.
