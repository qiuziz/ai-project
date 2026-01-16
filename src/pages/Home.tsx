import React from 'react';
import ToolCard from '../components/ToolCard';
import CodeIcon from '../icons/CodeIcon';

const tools = [
  {
    id: 'code-runner',
    name: '代码运行器',
    description: '直接运行JS/TS代码，查看输出结果',
    icon: <CodeIcon />
  }
];

const Home: React.FC = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>小工具集合</h1>
        <p>各种实用工具，方便你的开发和日常使用</p>
      </header>
      <main className="tools-grid">
        {tools.map(tool => (
          <ToolCard
            key={tool.id}
            id={tool.id}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;