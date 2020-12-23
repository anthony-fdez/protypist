import React from "react";
import "./countrySelector.css";
import { useDispatch, useSelector } from "react-redux";

const CountrySelector = (props) => {
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);
  const countryRedux = useSelector((state) => state.countryReducer);

  return (
    <div
      style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
      className={
        props.isOpen ? "country-selector-shown" : "country-selector-hidden"
      }
    >
      <div
        style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
        className="country-selector-header"
      >
        <h4>Select your country</h4>
        <i
          onClick={() => {
            props.closeMenu();
          }}
          className="close-icon-login fas fa-times fa-2x"
        ></i>
      </div>
      <div className="country-selector-country-list">
        <div className="country-item-list">
          <img
            className="flag-1x1"
            alt="United States"
            src={`http://purecatamphetamine.github.io/country-flag-icons/1x1/${countryRedux}.svg`}
          />
          <h5>United States</h5>
        </div>
      </div>
    </div>
  );
};

export default CountrySelector;
