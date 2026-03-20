import Header from './components/layout/Header'
import { Button } from 'antd'
import { Board } from './components/board/Board'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto p-6 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Active Workboard</h1>
          <Button type="primary">Complete Sprint</Button>
        </div>

        <div className="flex-1 overflow-hidden min-h-[500px]">
          <Board />
        </div>
      </main>
    </div>
  )
}

export default App
