import { createBrowserRouter } from "react-router-dom"
import Login from "./login"
import Onboarding from "./onboarding"

const Router = () => {
    
    const router = createBrowserRouter([
        
            {
                path: '/login',
                element:<Login />
            },
            {
                path: '/onboarding',
                element:<Onboarding />
            }
        
        
    ])
}