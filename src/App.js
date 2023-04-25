
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import "./app.css";
import { truncateString } from "./common/truncateString";
import { Link, Route, Routes } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useState,useEffect } from "react";
import HomePage from "./pages/HomePage";

function App() {
const [items, setItems] = useState([]);
const [category,setCategory]=useState([]);
const [categorydata,setCategoryData]=useState([]);
const [specificat,setSpecificat]=useState([]);
const [params,setParams]=useState(0);


  //  console.log(items);


useEffect(() => { 
  
  async function Fetchnews() {
    console.log("sabera")
    // const pages = 1300;
    // const perPage = 200;

    // for (let i = 1;i <= pages; i++) {
      const data = await fetch(
        // "http://localhost:4000/api/v1/news/?page=1&perPage=200",
           `http://localhost:4000/api/v1/news/${params}?page=500&perPage=20`,
        // `http://localhost:4000/api/v1/news/?page=${i}&perPage=${perPage}`,
        {
          method: "GET",
        }
      );
      const result = await data.json();
      // items.push(...result.result);
    // }
     console.log("hello",result);

setItems(result?.result);

  }

  Fetchnews();

   
  

  
}, [params]);
useEffect (() =>{
  async function Fetchcategory() {
    const data = await fetch("http://localhost:4000/api/v1/news/categories", {
      method: "GET",
    });
    const category = await data.json();
    setCategory(category?.result);
    console.log(category);
  }

  Fetchcategory();

},[])
function chooseCategory(item) {
  // const newItems = items?.filter((i) => i?.topic_label === item);
  setParams(item);
  // setCategoryData(newItems);
  //    console.log(newItems);
}




  return (
    <>
      <Navbar />
      <div className="hire d-flex" style={{ position: "relative" }}>
        <Content category={category} chooseCategory={chooseCategory} />
        <div style={{ width: "100%" }}>
          <Routes>
            {/* <Route
              path="/"
              element={
                <HomePage
                  Headline={categorydata?.length === 0 ? items : categorydata}
                />
              }
            /> */}
            <Route
              path="/"
              element={
                <HomePage
                  Headline={items}
                />
              }
            />
          </Routes>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
