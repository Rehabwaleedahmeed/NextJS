import ErrorTrigger from './error-trigger';

export default function ErrorDemoPage() {
  return (
    <main className="page-shell simple-page">
      <p className="eyebrow">Error demo</p>
      <h1>Trigger the app router error boundary</h1>
      <p>The navbar is hidden on this route, and the button below throws only after interaction.</p>
      <ErrorTrigger />
    </main>
  );
}