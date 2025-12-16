'use client';
import React from 'react';

// The original component caused a recurring crash due to a version conflict
// with React 19. It has been temporarily disabled to stabilize the application.
// We can work on a compatible replacement in a future step.

export default function Particles({
  className,
  quantity = 1000,
  color = '#ffffff',
}: {
  className?: string;
  quantity?: number;
  color?: string;
}) {
  return <div className={className} />;
}
