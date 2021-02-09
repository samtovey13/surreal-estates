import React, { useState, useEffect } from "react";
import "../styles/Properties.css";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import getProperties from "../requests/getProperties";
import Sidebar from "./SideBar";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProperties () {
      try {
        const res = await getProperties();
        if (res.status === 200) {
         const data = res.data;
         setErrorMessage("");
         setProperties(data);
        } else {
          setProperties([]);
          setErrorMessage("Oops! Something went wrong. Cannot get properties.");
        }
      } catch (err) {
        setProperties([]);
        setErrorMessage("Oops! Something went wrong. Cannot get properties.");
      } 
    }
    loadProperties();
  }, [] )

  if (errorMessage) return(
    <Alert message={errorMessage} success={false} />
  )

  if (properties) return (
    <div className="properties">
      <Sidebar />
      <h2>Properties</h2>
      <div className="properties-grid">
        {properties.map((property) => (
          <PropertyCard key={property._id} {...property} />
        ))}
      </div>
    </div>
  );
};

export default Properties;
