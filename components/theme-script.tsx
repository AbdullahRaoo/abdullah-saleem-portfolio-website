/**
 * Runs before first paint, so the correct theme is on <html> by the time
 * anything renders. Without this the page paints dark, then snaps to light on
 * hydration, which is the flash every themed site gets wrong once.
 *
 * Kept as a raw string on purpose: it must be synchronous and inline.
 */
const script = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
