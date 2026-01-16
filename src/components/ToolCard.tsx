import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  icon?: string | React.ReactNode;
  iconSize?: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ id, name, description, icon, iconSize = 48 }) => {
  return (
    <Link to={`/tools/${id}`} className="tool-card">
      <div className="tool-card-icon">
        <Icon 
          icon={icon || '🔧'} 
          size={iconSize} 
          className="tool-card-icon-inner"
        />
      </div>
      <div className="tool-card-content">
        <h3 className="tool-card-title">{name}</h3>
        <p className="tool-card-description">{description}</p>
      </div>
    </Link>
  );
};

export default ToolCard;