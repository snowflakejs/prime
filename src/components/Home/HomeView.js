// @flow
/* eslint react/prop-types: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import './HomeStyle.css';

type UserType = {
  id: string,
  name: string,
  email: string,
  roles: string,
  organisation: string,
  features: Array<string>,
  country: string,
};

type WorkspacePropsType = {
  users: Array<UserType>,
  category: string,
  onDelete: Function,
};

type WorkspaceHeaderType = {
  category: string,
}

type HomeViewPropsType = {
  onSelect: Function,
  onDelete: Function,
  category: string,
  categories: Array<string>,
  loading: Boolean,
  categoryIdx: number,
  users: Array<UserType>,
};

const Workspace = ({ users, category, onDelete }: WorkspacePropsType) => {
  if (users.length === 0) {
    return (<div className="no-data">No data available for {category}</div>);
  }
  return (
    <table className="table">
      <thead>
        <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Roles</th>
        <th>Organisation</th>
        <th>Features</th>
        <th>Country</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        { users.map(({
          id,
          name,
          email,
          roles,
          organisation,
          features,
          country,
        }, index) => (
          <tr key={index}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{roles}</td>
            <td>{organisation}</td>
            <td>{(features.length !== 0)
              ? features.reduce((total, feature) => `${total}, ${feature}`)
              : ''
            }</td>
            <td>{country}</td>
            <td><Link to={`/add/${id}`}>Edit</Link></td>
            <td><a href="/" onClick={e => onDelete(e, id)}>Delete</a></td>
          </tr>))}
      </tbody>
    </table>);
};

const PageHeader = () => (
  <nav className="navbar navbar-light bg-light border-bottom-2">
    <span className="navbar-brand mb-0 h1">Front End Developer Test</span>
  </nav>);

const AddButton = () => (
  <Link to="/add">
    <div className="btn btn-success px-5 my-1 mr-1">Add</div>
  </Link>);

const WorkspaceHeader = ({ category }: WorkspaceHeaderType) => (
  <header className="d-flex justify-content-between align-items-center border-bottom">
    <div className="pl-3">{category}</div>
    <AddButton />
  </header>);

const HomeView = ({
  onSelect,
  onDelete,
  category,
  categories,
  loading,
  categoryIdx,
  users,
}: HomeViewPropsType) => (
  <div>
    <PageHeader />
    <div className="row m-0">
      <div className="col-3 border-right px-0 sticky-navigation">
        <Navigation
          categories={categories}
          selected={categoryIdx}
          onSelect={onSelect}
        />
      </div>
      <div className="col-9 px-0">
        <WorkspaceHeader category={category} />
        <div className="sticky-table">
          { loading
            ? <div className="loading">...Loading</div>
            : <Workspace category={category} users={users} onDelete={onDelete} />
          }
        </div>
        <footer className="footer d-flex justify-content-center border-top pt-2"></footer>
      </div>
    </div>
  </div>);

export default HomeView;
