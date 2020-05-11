import React from "react";
import "./menu-item.styles.scss";
import { withRouter } from "react-router-dom";
// using with router gives us access to history and match properties for routing
const MenuItem = ({ title, imageUrl, size, history, match }) => {
  return (
    <div
      className={`${size} menu-item`}
      onClick={() => {
        history.push(`${match.url}shop`);
      }}>
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='content'>
        <h1 className='title'>{title}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
