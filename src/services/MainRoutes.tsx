import { Route, Routes } from "react-router-dom";

//Import middlewares
import { Auth } from "../middlewares/Auth";

//Import pages
import {Home} from '../pages/Home';
import { OneCode } from "../pages/OneCode";
import { EditCode } from "../pages/EditCode";
import { NewCode } from "../pages/NewCode";

export const MainRoutes = () => {
    return (
        <Routes>
            <Route 
                path="/"
                element={<Auth> <Home /> </Auth>}
            />
            <Route 
                path="/code-new"
                element={<Auth> <NewCode /> </Auth>}
            />
            <Route 
                path="/code/:id"
                element={<Auth> <OneCode /> </Auth>}
            />
            <Route 
                path="/code-edit/:id"
                element={<Auth> <EditCode /> </Auth>}
            /> 
        </Routes>
    )
}