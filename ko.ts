// Korean for every string the plugin shows; English is the key. The map's own text is never translated.
// `tests/ko.test.ts` fails on a `t("…")` or `msg("…")` in the source with no entry here, and on an entry nothing uses.
export const KO: Record<string, string> = {
  "(no map open)": "(열린 맵 없음)",
  "Close": "닫기",
  "Hello World": "헬로 월드",
  "Hello World…": "헬로 월드…",
  "Hello world": "안녕하세요",
};
