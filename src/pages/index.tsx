import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "./Root";
import Login from "./Login";
import Onboarding from "./Onboarding";

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
        path: "onboarding",
        element: <Onboarding />,
    },
]);

export default router;
