import "./filter.css"
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import ConfigData from "../../data/config.json";
import Table from "../table/table";

const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [selectedName, setSelectedName] = useState(false);
  const [filters, setFilters] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const applyFilter = (event) => {
    var newFilters = {}

    var uselessThing = {}

    var dateFilter = document.getElementById("date-check")
    var nameFilter = document.getElementById("name-check")
    var statusFilter = document.getElementById("status-check")
    var categoryFilter = document.getElementById("category-check")
    var countryFilter = document.getElementById("country-check");

    if (dateFilter.checked === false && nameFilter.checked === false && statusFilter === false && categoryFilter == false && countryFilter === false) {
      sessionStorage.setItem("filter", false)
      sessionStorage.setItem("filter-items", JSON.stringify(uselessThing["message"] = "no filter"))
    }

    // Status Filter Logic
    if (statusFilter.checked === true) {
      var statusList = document.querySelectorAll(".status-option");
      var statusOptions = []
      console.log(statusList)
      statusList.forEach((status) => {
        if (status.checked === true) {
          statusOptions.push(status.value)
        }
      })

      newFilters['status'] = statusOptions
      console.log(newFilters);

    };

    // Category Filter Logic
    if (categoryFilter.checked === true) {
      var categoryList = document.querySelectorAll(".category-option");
      var categoryOptions = []
      console.log(categoryList)
      categoryList.forEach((category) => {
        if (category.checked === true) {
          categoryOptions.push(category.value)
        }
      })

      newFilters['category'] = categoryOptions
      console.log(newFilters);
    }

    // Name Filter
    if (nameFilter.checked === true) {
      var selected = document.getElementById("customer-name")
      console.log(selected.value)

      newFilters['name'] = selected.value;
    }

    // Coutnry Filter
    if (countryFilter.checked === true) {
      var selectedCountry = document.getElementById("country-options")
      console.log(selectedCountry.value)

      newFilters['country'] = selectedCountry.value;
    }


    if (Object.keys(newFilters).length === 0) {
      sessionStorage.setItem("filter", false)
      sessionStorage.setItem("filter-items", JSON.stringify(uselessThing["message"] = "no filter"))
    } else {
      sessionStorage.setItem("filter", true)
      sessionStorage.setItem("filter-items", JSON.stringify(newFilters));
    }

    setFilters(newFilters);
    

  };

  const tickCategory = () => {
    setSelectedCategory(!selectedCategory);
  }

  const tickStatus = () => {
    setSelectedStatus(!selectedStatus);
  }

  const tickName = () => {
    setSelectedName(!selectedName);
  }
  const tickCountry = () => {
    setSelectedCountry(!selectedCountry);
  }

  const resetForm = (e) => {
    e.preventDefault();
    
    var dateFilter = document.getElementById("date-check")
    var nameFilter = document.getElementById("name-check")
    var statusFilter = document.getElementById("status-check")
    var categoryFilter = document.getElementById("category-check")
    var countryFilter = document.getElementById("country-check")

    dateFilter.checked = false;
    nameFilter.checked = false;
    statusFilter.checked = false;
    categoryFilter.checked = false;
    countryFilter.checked = false;

  }

  useEffect(() => {
    var isFilter = sessionStorage.getItem("filter")
    if (isFilter === 'true') {
      var filterLogic = sessionStorage.getItem("filter-items")
      filterLogic = JSON.parse(filterLogic)
      setFilters(filterLogic)

      if ("status" in filterLogic) {
        setSelectedStatus(true);
      }

      if ("category" in filterLogic) {
        setSelectedCategory(true);
      }

      if ("country" in filterLogic) {
        setSelectedCountry(true);
      }

      if ("name" in filterLogic) {
        setSelectedName(true);
      }

    }
  }, filters)

  // Refresh Page 1min
  useEffect(() => {
    const refreshPage = setTimeout(() => {
      window.location.reload();
    }, 60000)

    return () => {
      clearTimeout(refreshPage);
    }
  }, [])

  return (
    <>
      <div>
        <button className="btn btn-primary float-right" onClick={openModal}>Filter</button>
      </div>

      <Modal dialogClassName="modal-width" show={isModalOpen}>

        <Modal.Header className="modal-header">
          Filters
        </Modal.Header>
        <Modal.Body>
          <div>
            <form id="filter-form" onSubmit={applyFilter}>
              <p>Select criteria filter in listing</p>
              <div className="input-div">
                <label>
                  <input type="checkbox" id="date-check"/>
                  Created Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                Display range from 
                <input type="text"/>
                to
                <input type="text"/>
              </div>

              <div className="input-div">
                <label>
                  <input type="checkbox" id="name-check" onClick={tickName} checked={selectedName ? true : false}/>
                  Customer name
                </label>
                <select id="customer-name">
                  { ConfigData.name.map((n) => {
                    return (
                      <option value={n}>{n}</option>
                    )
                  }) }
                </select>
              </div>

              <div className="input-div">
                <label>
                  <input type="checkbox" id="status-check" onClick={tickStatus} checked={selectedStatus ? true : false}/>
                  Status
                </label>

                {ConfigData.status.map((s) => {
                  return (
                    <label>
                      <input value={s} type="checkbox" className="status-option" disabled={selectedStatus || "status" in filters ? false : true}/>
                      {s}
                    </label>
                  )
                })}


              </div>

              <div className="input-div">
                <label>
                  <input type="checkbox" id="category-check" onClick={tickCategory} checked={selectedCategory ? true : false}/>
                  Category
                </label>

                {ConfigData.categories.map((c) => {
                  return (
                    <label>
                      <input value={c} type="checkbox" className="category-option" disabled={selectedCategory ? false : true}/>
                      {c}
                    </label>
                  )
                })}
              </div>

              

              <div className="input-div">
                <label>
                  <input type="checkbox" id="country-check" onClick={tickCountry} checked={selectedCountry ? true : false}/>
                  Country
                </label>

                <select id="country-options">
                  { ConfigData.country.map((c) => {
                    return (
                      <option value={c}>{c}</option>
                    )
                  }) }
                </select>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" id="reset-but" onClick={resetForm}>Reset</button>
          <button type="submit" form="filter-form" className="btn btn-success">Apply</button>
          <button className="btn btn-warning" onClick={closeModal}>Cancel</button>
        </Modal.Footer>
      </Modal>
      <Table filters={filters} />
    </>
  )
}

export default Filter;