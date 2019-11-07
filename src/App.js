import React, { useState, useEffect } from "react";
 import axios from "axios";

function App() {
  const [term, setTerm] = useState("");
  const [pictures, setPictures] = useState([]);
  const [pageNum, setPagenum] = useState(1);
  const [shouldRef, setShouldRef] = useState(false);

  const changeHandler = e => {
    setTerm(e.target.value);
    console.log(term);
  };

  const pageChange = e => {
    e.preventDefault();
    e.target.name === "inc"
      ? setPagenum(pageNum + 1)
      : e.target.name === "dec" &&
        pageNum > 1 &&
        /* hey omar the next line is a ternary condition */ setPagenum(
          pageNum - 1
        );
    setShouldRef(true);
    console.log("pageNum: ", pageNum);
  };

  useEffect(() => {
    shouldRef &&
      axios
        .get("https://api.unsplash.com/search/photos", {
          params: {
            query: term,
            page: pageNum,
            per_page: 21
          },
          headers: {
            Authorization:
              "Client-ID 17175aae92ead72b7214ff713bf7185f8d1f510a0fe2e5f3ae05a7a2dae41459"
          }
        })
        .then(response => {
          setPictures([...response.data.results]);
          setShouldRef(false);
        })
        .catch(error => {
          console.log(error.message);
        });
  });

  const sendRequest = e => {
    e.preventDefault();
    axios
      .get("https://api.unsplash.com/search/photos", {
        params: {
          query: term,
          per_page: 21
        },
        headers: {
          Authorization:
            "Client-ID 17175aae92ead72b7214ff713bf7185f8d1f510a0fe2e5f3ae05a7a2dae41459"
        }
      })
      .then(response => {
        setPictures([...response.data.results]);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-12">
            <div className="bg-dark p-3 rounded">
              <form onSubmit={sendRequest} className="form-row">
                <div className="col">
                  {" "}
                  <input
                    type="text"
                    onChange={changeHandler}
                    className="form-control"
                  />
                </div>
                <div className="col-3">
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-outline-danger bg-dark form-control"
                  />
                </div>
              </form>
         </div>
    </div>
        </div>

      <div className="row justify-content-center  text-center"> 
        <div className="col-12 col-md-12">
          
          {pictures.length
            ? pictures.map(pic => (
                <img
                  src={pic.urls.thumb}
                  alt={pic.alt_description}
                  key={pic.id}
                  width="320px"
                  height='200px'
                  style={{margin:'3px'}}
                />
              )) 
            : null }  
        </div> 
        </div>
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <button
            type="button"
            onClick={pageChange}
            name="dec"
            className=" form-control col-3 btn btn-outline-danger bg-dark "
          >
            Previos
          </button>

                <button className="btn btn-outline-danger bg-dark" name='inc' onClick={pageChange}>1</button>
                <button className="btn btn-outline-danger bg-dark" name='inc' onClick={pageChange}>2</button>
                <button className="btn btn-outline-danger bg-dark" name='inc' onClick={pageChange}>3</button>
                <button className="btn btn-outline-danger bg-dark" name='inc' onClick={pageChange}>4</button>
                <button className="btn btn-outline-danger bg-dark" name='inc' onClick={pageChange}>5</button>

          <button
            type="button"
            onClick={pageChange}
            name="inc"
            className="form-control col-3 btn btn-outline-danger bg-dark"
          >
            Next
          </button>
          </div>
          
        </div>
      
    </div>
  );
}

export default App;
