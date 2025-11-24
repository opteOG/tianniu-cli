import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from './Components/Button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  /**
   * 模拟异步操作
   */
  const handleAsyncAction = async () => {
    setLoading(true)
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    alert('操作完成！')
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
      {/* 基础按钮示例 */}
      <div className="card">
        <h3>基础按钮</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button onClick={() => setCount((count) => count + 1)}>
            点击计数: {count}
          </Button>
          
          <Button variant={Button.VARIANTS.SECONDARY}>
            次要按钮
          </Button>
          
          <Button variant={Button.VARIANTS.SUCCESS}>
            成功按钮
          </Button>
          
          <Button variant={Button.VARIANTS.DANGER}>
            危险按钮
          </Button>
        </div>
      </div>

      {/* 不同尺寸按钮 */}
      <div className="card">
        <h3>不同尺寸</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
          <Button size={Button.SIZES.SMALL} variant={Button.VARIANTS.PRIMARY}>
            小按钮
          </Button>
          
          <Button size={Button.SIZES.MEDIUM} variant={Button.VARIANTS.SECONDARY}>
            中等按钮
          </Button>
          
          <Button size={Button.SIZES.LARGE} variant={Button.VARIANTS.SUCCESS}>
            大按钮
          </Button>
        </div>
      </div>

      {/* 状态按钮 */}
      <div className="card">
        <h3>按钮状态</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button disabled>
            禁用按钮
          </Button>
          
          <Button 
            loading={loading} 
            onClick={handleAsyncAction}
            variant={Button.VARIANTS.WARNING}
          >
            {loading ? '加载中...' : '异步操作'}
          </Button>
          
          <Button variant={Button.VARIANTS.INFO}>
            信息按钮
          </Button>
        </div>
      </div>

      {/* 更多变体 */}
      <div className="card">
        <h3>其他变体</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant={Button.VARIANTS.LIGHT}>
            浅色按钮
          </Button>
          
          <Button variant={Button.VARIANTS.DARK}>
            深色按钮
          </Button>
        </div>
      </div>

      <p className="read-the-docs">
        点击上方按钮测试不同的功能和样式
      </p>
    </>
  )
}

export default App
