import './table.css';
import OrderData from '../../data/order.json';
import { useEffect, useState } from 'react';

const Table = (props) => {
  const [orderData, setOrderData] = useState(OrderData);

  useEffect(() => {
    console.log(props)

    var isFilter = sessionStorage.getItem("filter")
    console.log(typeof(isFilter))

    if (isFilter === 'true') {
      var filterLogic = sessionStorage.getItem("filter-items")
      filterLogic = JSON.parse(filterLogic)
      
      console.log(filterLogic.status)
      console.log(orderData)

      let newOrderData = orderData;

      if ("status" in filterLogic) {
        newOrderData = orderData.filter((order) => {
          return filterLogic.status.includes(order.status);
        })
      }

      if ("category" in filterLogic) {
        if (filterLogic.category.includes("Others")) {
          filterLogic.category.push("Stationary")
          filterLogic.category.push("Sports")
          filterLogic.category.push("Hardware")
        }
        newOrderData = newOrderData.filter((order) => {
          return filterLogic.category.includes(order.category);
        })
      }

      if ("name" in filterLogic) {
        newOrderData = newOrderData.filter((order) => {
          return order.customer_name === filterLogic["name"];
        })
      }

      if ("country" in filterLogic) {
        newOrderData = newOrderData.filter((order) => {
          return order.country === filterLogic["country"];
        })
      }



      console.log(newOrderData);
      setOrderData(newOrderData);
    }

  }, [])

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Order No</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Status</th>
            <th scope="col">Category</th>
            <th scope="col">Country</th>
            <th scope="col">Created Date</th>
          </tr>
        </thead>
        <tbody>
          { orderData.map((order) => {
            return (
              <tr>
                <th scope='row'>{order.order_no}</th>
                <td>{order.customer_name}</td>
                <td>{order.status}</td>
                <td>{order.category}</td>
                <td>{order.country}</td>
                <td>{order.created_date}</td>
              </tr>
            )
          }) }
        </tbody>
      </table>
    </>
  )
}

export default Table;