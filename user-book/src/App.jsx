import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import BookDetail from "./components/BookDetail";
import Checkout from "./components/Checkout";
import PaymentSucces from "./components/PaymentSucces";
import PaymentFailure from "./components/PaymentFailure";
import MyOrder from "./components/MyOrder";
import Footer from "./components/Footer";
function App() {
  return (
    <Routes >
      <Route path="/" element={<><Home/><Footer></Footer></>}></Route>
      <Route path="/home" element={<><Home/><Footer/></>}></Route>
      <Route path="/contact" element={<><Contact/><Footer/></>}></Route>
      <Route path="/about" element={<><About/><Footer/></>}></Route>
      <Route path="/user/book/:id" element={<><BookDetail/><Footer/></>}></Route>
      <Route path="/checkout" element={<><Checkout/><Footer/></>}></Route>
      <Route path="/payment/success" element={<><PaymentSucces/><Footer/></>}></Route>
      <Route path="/payment/fail" element={<><PaymentFailure/><Footer/></>}></Route>
      <Route path="order" element={<><MyOrder/><Footer/></>}></Route>
    </Routes>
  );
}

export default App;
