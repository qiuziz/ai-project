import React from 'react';

interface CodeIconProps {
  className?: string;
}

const CodeIcon: React.FC<CodeIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
      <line x1="14" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="12" y2="12"></line>
    </svg>
  );
};

export default CodeIcon;