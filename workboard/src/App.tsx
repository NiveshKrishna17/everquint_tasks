import { Button } from 'antd'

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-8 space-y-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Vite + React + Tailwind + Ant Design
      </h1>
      
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md text-center">
        <p className="text-gray-600 mb-6">
          This project is successfully configured with Tailwind CSS v4 and Ant Design.
        </p>
        
        <div className="flex flex-col gap-4 items-center">
          <Button type="primary" size="large" className="w-full">
            Ant Design Primary Button
          </Button>
          <Button size="large" className="w-full text-blue-500 border-blue-500 hover:text-blue-600 hover:border-blue-600">
            Tailwind Styled Button
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-8">
        Edit <code className="bg-gray-200 px-2 py-1 rounded text-pink-600 font-mono">src/App.tsx</code> to test HMR.
      </p>
    </div>
  )
}

export default App
