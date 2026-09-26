# Hello World

An example plugin for [scmJS](https://github.com/scm-js/scm-js), a browser-based
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

This plugin is not one of the editor's defaults, so you add it by hand, the same way you
would add anyone else's.

## Files

- `plugin.ts` is the plugin. About ninety lines, most of them comments. Start here.
- `ko.ts` is the Korean for the words the plugin shows, and `tests/ko.test.ts` checks it
  against `plugin.ts` (see [Translations](#translations)).
- `plugin.json` is the manifest: name, version, which file to run, the icon, and the API
  version the plugin needs.
- `dist/plugin.js` is the built bundle the editor loads; `npm run build` writes it and CI
  commits it, so there is nothing to edit there.
- `@scm-js/plugin-api` is a devDependency holding the editor's type declarations, so this
  repository type-checks on its own.
- `tsconfig.json` and `package.json` are for `npm run typecheck`, `npm test` and
  `npm run build`. The editor never reads them.

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
  "build": "dist/plugin.js",
  "icon": "👋",
  "api": 1
}
```

Only `name` is required. `entry` defaults to `plugin.ts`. `icon` can be an emoji, an image
file sitting next to the manifest, a `data:` URI, or the URL of an image.

`build` names a built JavaScript bundle to load in place of `entry` — one fetch, and no
TypeScript compiler in the browser. Leave it out and the editor fetches `plugin.ts` and
transpiles it itself, which is a fine way to start; `entry` stays either way, because it is
what a person reads.

`api` is the API version this plugin needs, which is usually older than the current one.
Nothing here was added after version 1, so it says 1 and an older editor will still load
it. A plugin that called something newer, such as `ui.pickArea`, would say 2.

## The code

`npm run build` bundles `plugin.ts` into `dist/plugin.js` with esbuild, and that one file is
what the editor loads (`build` in the manifest). Run `npm run dev` while you work and it
follows your edits. A plugin can skip the build and let the editor fetch and transpile
`plugin.ts` itself — drop `build` from the manifest — and plain JavaScript works too, if you
would rather skip TypeScript.

The `import type` line at the top is erased by the build, so `@scm-js/plugin-api` never reaches
the browser. It is there for autocomplete in your editor and for `npm run typecheck`, and it is
generated from the editor's own `src/plugins/api.ts`; `npm update @scm-js/plugin-api` takes the
newest contract.

## Translations

The editor can be switched to Korean, and a plugin can follow it. Write every word the
plugin shows in English, as `api.i18n.t("Hello world")`, and put the Korean in `ko.ts`
with the English as the key. `api.i18n.register({ ko: KO })` at the start of `activate()`
hands that list to the editor, and `t` then returns the Korean when the editor is in
Korean and the English otherwise; anything missing from the list shows in English.
Numbers and names go in as placeholders — `t("{n} units", { n })` — so the translation can
put them where Korean wants them.

Menu labels and command titles are passed to the editor in English, wrapped in `msg("…")`,
which does nothing but mark the text; the editor translates them itself when it draws the
menu, so they change with the language and still work as the names other items are placed
`after`. A panel that stays open can redraw itself on
`api.events.on("language", …)`. Never translate the map's own text.

`npm test` fails when a string in `plugin.ts` has no entry in `ko.ts`, when `ko.ts` has an
entry nothing uses, or when a translation drops a placeholder, so the two cannot drift.

## Doing more than this

A plugin can also add context-menu entries and hotkeys, read the open scenario, listen for
editor events, keep its own settings, and change the map through
`api.document.edit(label, tx => ...)`, which becomes a single undo step like a brush
stroke.

- [docs/plugins.md](https://github.com/scm-js/scm-js/blob/main/docs/plugins.md) walks
  through the API.
- [src/plugins/api.ts](https://github.com/scm-js/scm-js/blob/main/src/plugins/api.ts) is
  the exact surface; [`@scm-js/plugin-api`](https://github.com/scm-js/plugin-api) is its
  generated typings, which this repository depends on.
- [Terrain from Image](https://github.com/scm-js/plugin-image-to-terrain) is a plugin with
  real work in it, if you want a longer example.

## Development

```sh
npm install
npm run typecheck
npm test
```

While working on a plugin it is quicker to load it from disk: serve the folder with
`npx serve .`, add `http://localhost:3000/` in Manage Plugins…, and press Reload after
each change.

## Licence

MIT.
