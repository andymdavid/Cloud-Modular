// Balance a set of logos so each carries a similar visual weight: wide wordmarks get less height than square
// badges, then dense, heavy marks are scaled down and light, open ones up. `ink` is the share of the logo's box
// that is filled. Returns the width and height in rem at desktop.
export function sizeLogo(logo: { width: number; height: number; ink: number }, maxHeight = 3.6, maxWidth = 11) {
  const aspect = logo.width / logo.height;
  const ink = Math.min(1.3, Math.max(0.75, Math.sqrt(0.25 / logo.ink)));
  const height = Math.min(maxHeight, maxHeight * Math.pow(aspect, -0.45)) * ink;
  const width = Math.min(maxWidth, height * aspect);
  return { w: width, h: width / aspect };
}
