import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdOutlineAddCircle } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
function Book() {
  const navigate = useNavigate();
  let [books, setBooks] = useState([]);
  useEffect(() => {
    axios({
      url: "http://localhost:3000/books",
      method: "get",
    })
      .then((res) => {
        console.log(res);
        setBooks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function addbook() {
    navigate("/add/book");
  }
  function goToBookEditPage(id) {
    navigate("/edit/book/" + id);
  }
  return (
    <>
      <Button variant="danger" onClick={addbook}>
        <MdOutlineAddCircle /> Add Books
      </Button>{" "}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Price</th>
            <th>Language</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.bookName}</td>
              <td>{book.authorName}</td>
              <td>{book.price}</td>
              <td>{book.language}</td>
              <td>
                {" "}
                <Button
                  variant="primary"
                  onClick={() => goToBookEditPage(book._id)}
                >
                  <TbEdit />
                </Button>{" "}
                <Button variant="warning" onClick={addbook}>
                  <MdDeleteForever />
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
export default Book;
