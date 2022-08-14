import { Route, Routes } from "react-router-dom";
import { Transactions, Dashboard } from "./Pages";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
        </Routes>
    );
};

export default App;
