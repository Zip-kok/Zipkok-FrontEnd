import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Onboarding from "./Onboarding";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/onboarding",
            element: <Onboarding />,
        },
    ]);
};
