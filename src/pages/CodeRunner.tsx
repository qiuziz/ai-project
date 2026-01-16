import React, { useState, useRef, useEffect } from 'react';
import * as esbuild from 'esbuild-wasm';

// 自动检测代码是JavaScript还是TypeScript
const detectLanguage = (code: string): 'js' | 'ts' => {
  // 检查是否包含TypeScript特定语法
  const tsIndicators = [
    // 类型注解
    /:\s*(string|number|boolean|any|void|never|object|Array|Function|\w+)(\[\])?/g,
    // 接口定义
    /interface\s+\w+/g,
    // 类型别名
    /type\s+\w+\s*=/g,
    // 泛型
    /<[A-Za-z0-9_]+>/g,
    // 枚举
    /enum\s+\w+/g,
    // 命名空间
    /namespace\s+\w+/g,
    // readonly修饰符
    /readonly\s+/g,
    // 访问修饰符
    /(public|private|protected|static)\s+/g,
    // as类型断言
    /as\s+\w+/g,
    // !非空断言
    /!\s*\./g,
    // ??空值合并
    /\?\?/g,
    // ?:可选链
    /\?\./g
  ];

  // 检查是否包含TypeScript特定语法
  for (const indicator of tsIndicators) {
    if (indicator.test(code)) {
      return 'ts';
    }
  }

  // 默认是JavaScript
  return 'js';
};

const CodeRunner: React.FC = () => {
  const [code, setCode] = useState<string>(`// 在此输入JavaScript或TypeScript代码
console.log('Hello, World!');
console.log('这是一条普通日志');
console.warn('这是一条警告信息');
console.error('这是一条错误信息');

// TypeScript示例（如果需要）
// const message: string = 'Hello, TypeScript!';
// console.log(message);
`);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [esbuildInitialized, setEsbuildInitialized] = useState(false);

  // 扩展console支持不同类型的日志输出和颜色
  const consoleRef = useRef<{ 
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
  }>({
    log: (...args: any[]) => {
      const message = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' ');
      setOutput(prev => prev + `<span class="console-log">${message}</span>\n`);
    },
    warn: (...args: any[]) => {
      const message = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' ');
      setOutput(prev => prev + `<span class="console-warn">${message}</span>\n`);
    },
    error: (...args: any[]) => {
      const message = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' ');
      setOutput(prev => prev + `<span class="console-error">${message}</span>\n`);
    }
  });

  // 初始化esbuild
  useEffect(() => {
    const initializeEsbuild = async () => {
      try {
        await esbuild.initialize({
          wasmURL: '/esbuild.wasm',
          worker: false,
        });
        setEsbuildInitialized(true);
      } catch (error) {
        console.error('Failed to initialize esbuild:', error);
        // 不在这里设置output，只在用户尝试运行TypeScript代码时处理
      }
    };

    initializeEsbuild();
  }, []);

  const runCode = async () => {
    setOutput('');
    setIsRunning(true);

    try {
      let codeToRun = code;
      
      // 自动检测语言
      const detectedLanguage = detectLanguage(code);
      setOutput(prev => prev + `<span class="console-log">Detected language: ${detectedLanguage.toUpperCase()}</span>\n`);

      // 如果是TypeScript代码，使用esbuild编译
      if (detectedLanguage === 'ts') {
        if (!esbuildInitialized) {
          setOutput(prev => prev + `<span class="console-log">TypeScript compiler is initializing...</span>\n`);
          try {
            await esbuild.initialize({
              wasmURL: '/esbuild.wasm',
              worker: false,
            });
            setEsbuildInitialized(true);
          } catch (initError) {
            setOutput(prev => prev + `<span class="console-error">Error initializing TypeScript compiler: ${(initError as Error).message}</span>\n`);
            setIsRunning(false);
            return;
          }
        }
        
        try {
          const result = await esbuild.transform(code, {
            loader: 'ts',
            target: 'es2020',
          });
          codeToRun = result.code;
        } catch (compileError) {
          setOutput(prev => prev + `<span class="console-error">TypeScript Compilation Error: ${(compileError as Error).message}</span>\n`);
          setIsRunning(false);
          return;
        }
      }

      // 创建一个安全的执行环境
      const script = `
        const console = {
          log: (...args) => { window.__console.log(...args); },
          warn: (...args) => { window.__console.warn(...args); },
          error: (...args) => { window.__console.error(...args); }
        };
        ${codeToRun};
      `;

      // 在全局对象上临时存储console引用
      (window as any).__console = consoleRef.current;

      // 执行代码
      new Function(script)();
    } catch (error) {
      setOutput(prev => prev + `<span class="console-error">Runtime Error: ${(error as Error).message}</span>\n`);
    } finally {
      setIsRunning(false);
      // 清理全局引用
      delete (window as any).__console;
    }
  };

  const clearOutput = () => {
    setOutput('');
  };

  return (
    <div className="code-runner">
      <header className="code-runner-header">
        <h1>代码运行器</h1>
        <p>直接运行JavaScript或TypeScript代码，查看输出结果</p>
      </header>
      
      <main className="code-runner-main">
        <div className="code-editor-section">
          <div className="section-header">
            <h2>代码编辑区</h2>
            <div className="editor-actions">
              <button 
                onClick={runCode} 
                disabled={isRunning}
                className="run-button"
              >
                {isRunning ? '运行中...' : '运行代码'}
              </button>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              // 处理Tab键缩进
              if (e.key === 'Tab') {
                e.preventDefault();
                const textarea = e.target as HTMLTextAreaElement;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const newValue = code.substring(0, start) + '  ' + code.substring(end);
                setCode(newValue);
                // 设置光标位置
                setTimeout(() => {
                  textarea.selectionStart = textarea.selectionEnd = start + 2;
                }, 0);
              }
              // 处理Enter键运行代码
              else if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                runCode();
              }
            }}
            className="code-editor"
            placeholder="在此输入JavaScript或TypeScript代码..."
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>

        <div className="output-section">
          <div className="section-header">
            <h2>输出结果</h2>
            <div className="output-actions">
              <button onClick={clearOutput} className="clear-button">
                清空
              </button>
            </div>
          </div>
          <div className="output-content" dangerouslySetInnerHTML={{ __html: output || '运行代码后将在此显示输出结果...' }} />

        </div>
      </main>
    </div>
  );
};

export default CodeRunner;