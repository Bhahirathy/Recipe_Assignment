import React from "react";
import "./App.css"
import data from "./constants/data.json";

function App() {
  console.log({ data });
  const totalDiscount = data.stores;

  const funGetMaxDiscountStore = (storeData) => {
    // console.log(storeData);
    let result = [];
    for (let index = 0; index < storeData.length; index++) {
      const formatData = {
        store_name: storeData[index].name,
        max_discount: storeData[index].recipe.ingredients.reduce((initial, cur) => {
          return initial + cur.discount;
        }, 0),
      };
      result.push(formatData);
    }
    console.log("outside", result);
    if (result.length > 0) {
      const filterData = result.reduce((previous, current) =>
        previous.max_discount > current.max_discount ? previous : current
      );
      console.log({ filterData });
      if (filterData) {
        return (
          <div className="display">
            <p><b>{filterData.store_name}</b> gives max discount price <b>{filterData.max_discount}</b>
            </p>  
          </div>
        );
      } else {
        return "";
      }
    }
  };
  return (
    <table className="table-bordered">
      <thead>
        <tr>
          <th>Store Name</th>
          <th>Distance</th>
          <th>Cost</th>
          <th>Time</th>
          <th>Reciepes</th>
          <th>Ingredients</th>
        </tr>
      </thead>
      <tbody>
        {data.stores.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.distance}</td>
            <td>{item.cost}</td>
            <td>{item.time}</td>
            <td>
              <div>
                <p>
                  <b>Name:</b> {item.recipe.name}
                </p>
              </div>
            </td>
            <td>
              <div>
                <p>
                  <b>Ingredients:</b>{" "}
                  {item.recipe.ingredients.map((data) => (
                    <p>
                      {data.name} - {data.discount} (Rs Discount)
                    </p>
                  ))}
                </p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
      {funGetMaxDiscountStore(data.stores)}
        </tfoot>
    </table>
  );
}

export default App;
