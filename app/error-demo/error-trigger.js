'use client';

import { useState } from 'react';

export default function ErrorTrigger() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Intentional app-router error demo');
  }

  return (
    <button className="primary-button" type="button" onClick={() => setShouldThrow(true)}>
      Trigger error
    </button>
  );
}