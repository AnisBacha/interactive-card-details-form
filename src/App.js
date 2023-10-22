import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Card from "./Card";
import Success from "./Success";
function App() {
  const [cardInfo, setCardInfo] = useState(
    {
      fullName: '',
      cardNumber: '',
      expMM: '',
      expYY: '',
      cvc: ''
    }
  );
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout cardInfo={cardInfo} />}>
            <Route index element={<Card cardInfo={cardInfo} setCardInfo={setCardInfo}/>} />
            <Route path="success" element={<Success />} />
        </Route>  
      </Routes>
    </div>
  );
}

export default App;
