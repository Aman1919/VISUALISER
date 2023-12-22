import React, { useState } from 'react';
import MathOperations from './topics/MathOperations';
 


function App() {
  const [choose, setChoose] = useState("choose");
  const [choose2, setChoose2] = useState("choose");
  const [chooseList, setChooseList] = useState(['addition', 'subtraction', 'multiplication', 'division']);
  function handleChangeChoose(e: any) {
  
    setChoose(e.target.value)
  }
  
  function Show() {
    if (choose === "basicmathopreations") {
      return <MathOperations choose={choose2} />
    }
  return <></>
  }
    return (
      <div className="App">
        <header>
          <nav>
            <h1>Visualiser</h1>
            <div>
              <select value={choose} onChange={handleChangeChoose}>
                <option value="choose">choose</option>
                <option value="basicmathopreations">Basic Math opreations</option>
              </select>
              <select value={choose2} onChange={(e) => setChoose2(e.target.value)}>
                <option value="choose">choose</option>
                {chooseList.map((item, index) => {
                  return <option key={index} value={item}>{item}</option>
                })}
              </select>
            </div>
          </nav>
        </header>
        <div className="contanier">
          {Show()}
        </div>
      </div>
    );
  }

export default App;
