import { useParams } from "react-router-dom";
function BookEdit(){
    let params = useParams();
    let id = params.id;
    return(
        <h1>We are going to edit this page</h1>
    )
}
export default BookEdit;