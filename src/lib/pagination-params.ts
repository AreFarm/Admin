/**
 * Cursor pagination via URL search params. `history` holds the cursor that
 * fetched each ancestor page (in order, "" meaning "no cursor" i.e. page 1),
 * so Previous is a pop and Next is a push — no server-side page tracking needed.
 */
export function parseCursorParams(sp: { cursor?: string; history?: string }) {
  const cursor = sp.cursor;
  const history = sp.history ? sp.history.split(",") : [];
  return { cursor, history };
}
