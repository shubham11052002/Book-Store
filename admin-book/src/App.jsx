import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Book from "./pages/Book";
import Login from "./pages/Login";
import BookEdit from "./pages/BookEdit";
import "./App.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/add/book" element={<CreateBook />}></Route>
            <Route path="/book" element={<Book />}></Route>
            <Route path="/edit/book/:id" element={<BookEdit />}></Route>
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
