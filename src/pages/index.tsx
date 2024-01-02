import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "./Root";
import Login from "./Login";
import Onboarding from "./Onboarding";
import SignIn from "./SignIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path:"signin",
        element: <SignIn />
    },
    {
        path: "onboarding",
        element: <Onboarding />,
    },
]);

export default router;
