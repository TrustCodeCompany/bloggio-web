import { RoutesConfig } from './router/RoutesConfig'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className='bg-bgColor text-textColor dark:bg-dark-bgColor dark:text-dark-textColor transition-colors duration-300'>
        <RoutesConfig />
      </div>
    </BrowserRouter>
  )
}

export default App
