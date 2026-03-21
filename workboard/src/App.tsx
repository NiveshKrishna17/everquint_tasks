import { Routes, Route, useMatch } from 'react-router-dom'
import Header from './components/layout/Header'
import { Button } from 'antd'
import { Board } from './components/board/Board'
import { TaskDetails } from './components/board/TaskDetails'
import { BoardProvider } from './context/BoardContext'
function App() {
  const match = useMatch('/task/:taskId')
  const isTaskOpen = !!match

  return (
    <BoardProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 w-full mx-auto p-6 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Active Workboard</h1>
          </div>

          <div className="flex-1 flex overflow-hidden min-h-[500px] gap-6">
            <div className={`transition-all duration-300 ease-in-out h-full flex flex-col ${isTaskOpen ? 'w-2/3' : 'w-full'}`}>
              <Board />
            </div>

            {isTaskOpen && (
              <div className="w-1/3 h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-y-auto animate-in slide-in-from-right duration-300">
                <Routes>
                  <Route path="/task/:taskId" element={<TaskDetails />} />
                </Routes>
              </div>
            )}
          </div>
        </main>
      </div>
    </BoardProvider>
  )
}

export default App
