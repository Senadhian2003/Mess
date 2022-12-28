import React from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Dispatch2() {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(2);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/dispatch/retrive")
      .then(function (response) {
        // handle success

        setItems(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const getQuantity = async (e) => {
    let itemName = e.target.value;
    let id = e.target.id;
    console.log(id);

    document.getElementById(id + " RMK").value = 0;
    document.getElementById(id + " RMD").value = 0;
    document.getElementById(id + " RMKCET").value = 0;

    console.log(itemName);
    let quantity = document.getElementById(id + " totquantity");
    let currentQuantity = document.getElementById(id + " currquantity");
    axios
      .post("http://localhost:5000/dispatch/getQuantity", {
        itemName: itemName,
      })
      .then(function (response) {
        console.log(response.data[0].quantity);
        quantity.value = response.data[0].quantity;
        currentQuantity.value = response.data[0].quantity;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addValue = (e) => {
    const element = e.target.id;
    const split = element.split(" ");
    const id = split[0];
    const place = split[1];
    // console.log(id,place)
    let quantity = document.getElementById(id + " totquantity");

    let totQuantity = parseFloat(quantity.value);
    let currQuantity = document.getElementById(id + " currquantity");
    let rmk = parseFloat(document.getElementById(id + " RMK").value);
    let rmd = parseFloat(document.getElementById(id + " RMD").value);
    let rmkcet = parseFloat(document.getElementById(id + " RMKCET").value);

    let currentQuantity = totQuantity - (rmk + rmd + rmkcet);
    if(currentQuantity<0){
      window.alert("Item Quantity exceeded max limit")
    }

    currQuantity.value = currentQuantity;
  };

  const submit = () => {
    let arr = [];
    let date = document.getElementById("date").value;

    class Obj {
      constructor(item, currentQuantity,rmk,rmd,rmkcet) {
        this.ItemName = item;
        this.CurrentQuantity = currentQuantity;
        this.RMK = rmk;
        this.RMD = rmd;
        this.RMKCET = rmkcet;
        this.DATE = date;
      }
    }

    let i = 0;
    for (let i = 1; i < counter; i++) {
      let item = document.getElementById(i).value;
      let currentQuantity = document.getElementById(i + " currquantity").value;
      let rmk = document.getElementById(i + " RMK").value;
      let rmd = document.getElementById(i + " RMD").value;
      let rmkcet = document.getElementById(i + " RMKCET").value;

      

      let obj = new Obj(item, currentQuantity,rmk,rmd,rmkcet);

      arr.push(obj);
      
    }

    
    console.log(arr);


    axios.post('http://localhost:5000/dispatch/updateDispatch', {
      ItemArray : arr

    })
    .then(async function (response) {
      await console.log(response.data);
      alert("Items updated successfully")
      window.location.reload();

    })
    .catch(async function (error) {
      await console.log(error);
    });
  };

  const addRow = () => {
    let x = document.getElementById("table");
    let row = x.insertRow();

    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    let cell4 = row.insertCell();
    let cell5 = row.insertCell();
    let cell6 = row.insertCell();
    let cell7 = row.insertCell();

    //select

    const select = document.createElement("select");
    select.setAttribute("class", "form-select");
    const option = document.createElement("option");
    const optionText = document.createTextNode("select");
    option.appendChild(optionText);
    option.setAttribute("value", "select");
    select.setAttribute("id", counter);
    select.addEventListener("change", getQuantity, false);

    select.appendChild(option);

    for (let i = 1; i < items.length; i++) {
      const option = document.createElement("option");
      const optionText = document.createTextNode(items[i].item);
      option.appendChild(optionText);
      option.setAttribute("value", items[i].item);
      select.appendChild(option);
    }

    cell2.appendChild(select);

    // totquantity

    let input1 = document.createElement("input");
    input1.setAttribute("type", "number");
    input1.setAttribute("placeholder", "Total Quantity");
    input1.setAttribute("class", "form-control");
    input1.setAttribute("id", counter + " totquantity");
    input1.defaultValue = 0;
    input1.disabled = true;

    cell3.appendChild(input1);

    //current Quantity

    let input2 = document.createElement("input");
    input2.setAttribute("type", "number");
    input2.setAttribute("placeholder", "Current Quantity");
    input2.setAttribute("class", "form-control");
    input2.setAttribute("id", counter + " currquantity");
    input2.defaultValue = 0;
    input2.disabled = true;

    cell4.appendChild(input2);

    //RMK

    let input3 = document.createElement("input");
    input3.setAttribute("type", "number");
    input3.setAttribute("placeholder", "RMK");
    input3.setAttribute("class", "form-control");
    input3.setAttribute("id", counter + " RMK");
    input3.defaultValue = 0;
    input3.addEventListener("change", addValue, false);

    cell5.appendChild(input3);

    //RMD

    let input4 = document.createElement("input");
    input4.setAttribute("type", "number");
    input4.setAttribute("placeholder", "RMD");
    input4.setAttribute("class", "form-control");
    input4.setAttribute("id", counter + " RMD");
    input4.defaultValue = 0;
    input4.addEventListener("change", addValue, false);

    cell6.appendChild(input4);

    let input5 = document.createElement("input");
    input5.setAttribute("type", "number");
    input5.setAttribute("placeholder", "RMKCET");
    input5.setAttribute("class", "form-control");
    input5.setAttribute("id", counter + " RMKCET");
    input5.defaultValue = 0;
    input5.addEventListener("change", addValue, false);

    cell7.appendChild(input5);

    cell1.innerHTML = counter;

    setCounter(counter + 1);
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            EMART
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page">
                  Register
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page">
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page">
                  Home
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link active" aria-current="page">
                  Interpolation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container" style={{ marginTop: "3%" }}>
        <label for="date">DATE:</label>
        <input type="date" id="date" name="date" />
        <br />
        <br />

        <Table striped bordered hover id="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Select Item</th>
              <th>Total Quantity</th>
              <th>Current Quantity</th>
              <th>RMK</th>
              <th>RMD</th>
              <th>RMKCET</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={getQuantity}
                  id="1"
                >
                  <option selected>Select</option>

                  {items.map((item, idx) => {
                    return (
                      <option key={idx} value={item.item}>
                        {item.item}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Total Quantity"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    id="1 totquantity"
                    defaultValue={0}
                    disabled
                  />
                </div>
              </td>
              <td>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Cureent Quantity"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    id="1 currquantity"
                    defaultValue={0}
                    disabled
                  />
                </div>
              </td>
              <td>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="RMK"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    id="1 RMK"
                    defaultValue={0}
                    onChange={addValue}
                  />
                </div>
              </td>

              <td>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="RMD"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    id="1 RMD"
                    defaultValue={0}
                    onChange={addValue}
                  />
                </div>
              </td>
              <td>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="RMKCET"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    id="1 RMKCET"
                    defaultValue={0}
                    onChange={addValue}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>

        <button onClick={addRow}>Click me</button>
        <br />
        <br />
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}
