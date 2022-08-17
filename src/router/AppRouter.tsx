import { Route, Routes } from "react-router-dom";
import { Dashboard, Goals, Transactions } from "../Pages";
import { paths } from "./paths";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={paths.home} element={<Dashboard />} />
            <Route path={paths.transactions} element={<Transactions />} />
            <Route path={paths.goals} element={<Goals />} />
        </Routes>
    );
};

export default AppRouter;
