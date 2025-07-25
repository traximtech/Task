import "./App.css";
import Header from "./components/Header";
import Hero from "./pages/Hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/Layout";
import AddTask from "./pages/AddTask";
import RequireAuth from "./components/AuthProtector";
import NotFound from "./pages/NotFound";
import TaskDetails from "./pages/TaskDetails";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Header />
        <Layout>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<RequireAuth />}>
              <Route path="/" element={<Hero />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/task/:id" element={<TaskDetails />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
