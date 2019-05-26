// @flow
/* eslint react/prop-types: 0 */
import React from 'react';
import './Navigation.css';

type NavigationPropsType = {
    categories: Array<string>,
    selected: Function,
    onSelect: Function,
};

const Navigation = ({ categories, selected, onSelect }: NavigationPropsType) => (
  <ul className="nav flex-column p-0">
    {categories.map((category, index) => (
      <li
        className={(index === selected) ? 'nav-item alert-success' : 'nav-item'}
        key={index}
        onClick={e => onSelect(e, index)}
      >
        <a className="nav-link" href="/">{category}</a>
      </li>))
    }
  </ul>);

export default Navigation;
