'use client';

export default function ErrorDemoError({ reset }) {
  return (
    <main className="page-shell error-page">
      <h1>App Error</h1>
      <p>The navbar stays hidden on this route, and the boundary can reset the segment.</p>
      <button className="primary-button" type="button" onClick={() => reset()}>
        Retry
      </button>
    </main>
  );
}