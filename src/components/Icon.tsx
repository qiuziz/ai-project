import React from 'react';

interface IconProps {
  icon: string | React.ReactNode;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ icon, size = 24, className = '' }) => {
  // 如果是React节点，直接渲染
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon as React.ReactElement, {
      className: `${className} custom-icon-svg`,
      style: { fontSize: `${size}px`, width: `${size}px`, height: `${size}px` },
    });
  }

  // 如果是字符串，判断是emoji还是其他
  if (typeof icon === 'string') {
    // 简单判断是否为emoji（包含非ASCII字符）
    const isEmoji = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(icon);
    
    if (isEmoji) {
      return (
        <span
          className={`${className} custom-icon-emoji`}
          style={{ fontSize: `${size}px` }}
        >
          {icon}
        </span>
      );
    }

    // 否则可能是字体图标的类名或其他
    return (
      <span className={`${className} custom-icon-other`} style={{ fontSize: `${size}px` }}>
        {icon}
      </span>
    );
  }

  // 默认情况
  return null;
};

export default Icon;