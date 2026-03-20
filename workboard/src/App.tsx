import Header from './components/layout/Header'
import { Button } from 'antd'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <Header />

      {/* Main Content Area placeholder */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Active Workboard</h1>
          <Button type="primary">Complete Sprint</Button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
          <h2 className="text-xl font-medium text-gray-600 mb-4">Board configuration goes here</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            This is the starting point for your issue tracker. Build your columns, drag-and-drop tasks, and start shipping.
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
