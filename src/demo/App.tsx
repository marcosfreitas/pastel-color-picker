import './App.css'
import './example.css'
import { Content } from './content'
import { ThemeProvider } from './ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-foreground example-bg">
        <Content />
      </div>
    </ThemeProvider>
  )
}

export default App 