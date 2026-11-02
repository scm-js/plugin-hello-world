# Hello World

An example plugin for [scmJS](https://github.com/scm-js/scm-js), a browser-based
StarCraft 1 / Brood War map editor. It is a short, commented plugin to copy when you start
writing your own.

It adds one item to the Tools menu. The item opens a small pane that says "Hello world",
with the name of the open map on the next line and a Close button.

## Try it

In scmJS, open Plugins ▸ **Browse Plugins…** and press **Install** on the Hello World row.
You can also open Plugins ▸ **Manage Plugins…**, paste

```
https://github.com/scm-js/plugin-hello-world
```

and press **Add**. Then open a map and choose Tools ▸ **Hello World…**.

## Files

- `plugin.ts` is the plugin: about ninety lines, most of them comments. Start here.
- `ko.ts` holds the Korean for the words the plugin shows. `tests/ko.test.ts` checks it
  against `plugin.ts` (see [Translations](#translations)).
- `plugin.json` is the manifest.
- `dist/plugin.js` is the built bundle the editor loads. `npm run build` writes it and CI
  commits it, so do not edit it by hand.
- `package.json` and `tsconfig.json` are for the npm scripts below. The editor never reads
  them.

## The manifest

`plugin.json` tells the editor what the plugin is and where its code is:

```json
{
  "name": "Hello World",
  "id": "hello-world",
  "version": "1.1.0",
  "description": "An example plugin to copy from. It adds one Tools menu item that opens a small pane showing the name of the map you have open.",
  "author": "Jeany",
  "homepage": "https://github.com/scm-js/plugin-hello-world",
  "entry": "plugin.ts",
  "build": "dist/plugin.js",
  "icon": "👋",
  "api": 1
}
```

- Only `name` is required. Give your copy its own `name`, `id` and `homepage`.
- `entry` is the source file. It defaults to `plugin.ts`.
- `build` is a bundle the editor loads in place of `entry`. Leave it out and the editor
  fetches `plugin.ts` and compiles it in the browser, which is fine for a one-file plugin.
  Keep `entry` either way: it is what people read.
- `icon` can be an emoji, an image file next to the manifest, a `data:` URI or an image URL.
- `api` is the plugin API version. It is 1, and it stays 1: new calls are added to version
  1 without changing the number. An editor refuses a plugin that asks for a higher version
  than it has.

The [manifest reference](https://docs.scmjs.dev/plugins/writing-a-plugin/#the-two-files)
lists every field.

## Building

`npm run build` bundles `plugin.ts` into `dist/plugin.js` with esbuild. `npm run dev` does
the same and rebuilds on every change.

The `import type` line at the top of `plugin.ts` is removed by the build, so
`@scm-js/plugin-api` never reaches the browser. The package holds the editor's type
declarations, for autocomplete and `npm run typecheck`. Everything the plugin uses at run
time comes from the `api` object the editor passes to `activate()`. Run
`npm update @scm-js/plugin-api` to get the newest typings.

## Translations

The editor can be switched to Korean, and a plugin can follow it:

1. Write every word the plugin shows in English, as `api.i18n.t("Hello world")`.
2. Put the Korean in `ko.ts`, with the English as the key.
3. Call `api.i18n.register({ ko: KO })` at the start of `activate()`.

`t` then returns the Korean when the editor is in Korean, and the English otherwise.
Anything missing from `ko.ts` shows in English. Numbers and names go in as placeholders,
as in `t("{n} units", { n })`, so the Korean can put them where it needs them.

Menu labels and command titles are passed to the editor in English, wrapped in `msg("…")`.
`msg` only marks the text. The editor translates it when it draws the menu. A panel that
stays open can redraw itself on `api.events.on("language", …)`. Never translate the map's
own text.

`npm test` fails when a string in `plugin.ts` has no entry in `ko.ts`, when `ko.ts` has an
entry nothing uses, or when a translation drops a placeholder.

## Development

```sh
npm install
npm run typecheck
npm test
npm run dev
```

While you work, load the plugin from disk. Keep `npm run dev` running, serve the folder
with `npx serve --cors .`, and add `http://localhost:3000/` in Plugins ▸
**Manage Plugins…**. Press **Reload** on the plugin's row after each change.

## Doing more

A plugin can also add context-menu entries and hotkeys, read the open map, listen for
editor events and keep its own settings. It changes the map through
`api.document.edit(label, tx => …)`, which becomes a single undo step.

- [The plugin guide](https://docs.scmjs.dev/plugins/) has a step-by-step
  first plugin, and covers publishing and getting listed.
- [The API reference](https://docs.scmjs.dev/api/) lists every call.
  [`@scm-js/plugin-api`](https://github.com/scm-js/plugin-api) is the same contract as
  typings.
- [Terrain from Image](https://github.com/scm-js/plugin-image-to-terrain) is a longer
  example with real work in it.

## Licence

MIT.
