import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isPluginMode = env.BUILD_MODE === 'plugin' || command === 'plugin'

  return {
    // GitHub Pages的base路径配置
    base: '/ai-project/',
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
    ],
    build: {
      outDir: isPluginMode ? 'dist-plugin' : 'dist',
      lib: isPluginMode ? {
        entry: resolve(__dirname, 'src/main.tsx'),
        name: 'ToolCollection',
        formats: ['es', 'umd'],
        fileName: (format) => `tool-collection.${format}.js`,
      } : undefined,
      rollupOptions: {
        // 插件模式下排除外部依赖
        external: isPluginMode ? ['react', 'react-dom', 'react-router-dom'] : [],
        output: isPluginMode ? {
          // 提供全局变量名，以便UMD格式在浏览器中使用
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
          },
        } : {},
      },
    },
  }
})

