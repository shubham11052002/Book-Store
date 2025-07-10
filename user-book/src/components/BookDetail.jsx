import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function BookDetail() {
  const navigate = useNavigate();
  let param = useParams();
  let [book, setBook] = useState({});
  let [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    let url = import.meta.env.VITE_BASE_API + '/user/book/' + param.id;
    axios({
      // url: "http://localhost:3001/user/book/" + param.id,
      url:url,
      method: "get"
    })
      .then((res) => {
        // console.log(res);
        setBook(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param]);
  function goToPurchase() {
    // alert('ok')
    let token = localStorage.getItem("token");
    if (token) {
      localStorage.setItem("bookName", book.bookName);
      localStorage.setItem("price", book.price);
      localStorage.setItem("isDiscountApplicable", book.isDiscountApplicable);
      localStorage.setItem("discountType", book.discountType);
      localStorage.setItem("discountedUnit", book.discountedUnit);
      localStorage.setItem("finalPrice", book.finalPrice);
      localStorage.setItem("book", JSON.stringify(book));
      setShowAlert(true); // Show Bootstrap Alert
      // alert("You are most welcome to our Book Store");
      // we are navigating to checkout to fill up the address and required details
      setTimeout(() => {
        setShowAlert(false);
        navigate("/checkout");
      }, 1000);
    } else {
      // alert("please login first!!");
      toast.error('please login first...')
    }
  }
  return (
    <Container fluid className="p-4">
  {showAlert && (
    <Alert variant="success" className="text-center fw-bold">
      You are most welcome to our Book Store
    </Alert>
  )}

  <div className="d-flex flex-wrap gap-4 mt-4">
    {/* Book Image */}
    <div className="border rounded p-2 shadow-sm" style={{ maxWidth: "350px" }}>
      <img
        src={book.bookImage}
        className="img-fluid rounded"
        style={{ height: "400px", objectFit: "cover" }}
        alt={book.bookName}
      />
    </div>

    {/* Book Details */}
    <div className="flex-grow-1">
      <h3 className="fw-semibold text-dark">{book.bookName}</h3>

      <div className="d-inline-block bg-success text-white px-3 py-1 rounded fs-6">
        ⭐ 4.4
      </div>

      <div className="d-flex align-items-center mt-2">
        <span className="fw-bold fs-4 text-success">&#x20b9; {book.finalPrice}</span>
        <span className="text-muted ms-3 fs-5">
          <s>&#x20b9;{book.price}</s>
        </span>
      </div>

      {/* Book Information */}
      <p className="text-muted mt-3">Author: <strong>{book.authorName}</strong></p>
      
      <h5 className="mt-3 text-dark">📌 Highlights:</h5>
      <ul className="list-unstyled text-muted">
        <li><strong>Description:</strong> {book.bookDescription}</li>
        <li><strong>Language:</strong> {book.language}</li>
        <li><strong>Edition:</strong> {book.edition}</li>
        <li><strong>Binding:</strong> {book.binding}</li>
        <li><strong>Publisher:</strong> {book.publisher}</li>
        <li><strong>Seller:</strong> {book.seller}</li>
      </ul>

      {/* Buy Now Button */}
      <Button variant="success" className="px-4 py-2 fw-bold mt-3" onClick={goToPurchase}>
        Buy Now
      </Button>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  </div>
</Container>

  );
}
export default BookDetail;
