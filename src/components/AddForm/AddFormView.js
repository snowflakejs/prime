// @flow
/* eslint react/prop-types: 0 */
import React from 'react';
import './AddFormStyle.css';

type AddFormViewPropsType = {
  onCancel: Function,
  onSubmit: Function,
  handleChange: Function,
  type: string,
  name: string,
  email: string,
  organisation: string,
  roles: string,
  country: string,
  features: Array<string>,
  error: string,
};

const AddFormView = ({
  onCancel,
  onSubmit,
  handleChange,
  type,
  name,
  email,
  organisation,
  roles,
  country,
  features,
  error,
}: AddFormViewPropsType) => (
  <div className="add">
    <form className="add-form">
      <h3 className="mb-3 pb-3 border-bottom">{type} User</h3>
      {error
        ? (<div className="alert alert-danger">
            <strong>Error!</strong> {error}
          </div>)
        : (<div></div>)
      }

      <div className="row">
        <div className="col form-group">
          <label>Name:</label>
          <input
            name="name"
            type="text"
            className={(error.search('name') === -1) ? 'form-control' : 'form-control inValid'}
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className="col form-group">
          <label>Email address:</label>
          <input
            name="email"
            type="email"
            className={(error.search('email') === -1) ? 'form-control' : 'form-control inValid'}
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col form-group">
          <label>Roles:</label>
          <select
            name="roles"
            value={roles}
            onChange={handleChange}
            className={(error.search('role') === -1) ? 'form-control' : 'form-control inValid'}
          >
            <option value="Owner">Owner</option>
            <option value="Employee">Employee</option>
            <option value="">Select role</option>
          </select>
        </div>

        <div className="col form-group">
          <label>Country:</label>
          <select
            name="country"
            value={country}
            onChange={handleChange}
            className={(error.search('country') === -1) ? 'form-control' : 'form-control inValid'}
          >
            <option value="Australia">Australia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="China">China</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="">Select country</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Organisation</label>
        <input
          name="organisation"
          type="text"
          placeholder="Organisation"
          value={organisation}
          onChange={handleChange}
          className={(error.search('organisation') === -1) ? 'form-control' : 'form-control inValid'}
        />
      </div>

      <div className="form-group">
        <label>Organisation Features:</label>
        <select name="features" multiple={true} className="form-control" value={features} onChange={handleChange}>
          <option value="Trade Vault">Trade Vault</option>
          <option value="Inventory">Inventory</option>
          <option value="Analytics">Analytics</option>
        </select>
      </div>

      <div className="d-flex flex-row-reverse mt-4">
        <button type="submit" className="btn btn-success ml-2" onClick={onSubmit}>Submit</button>
        <button type="submit" className="btn btn-secondary" onClick={onCancel} >Cancel</button>
      </div>
    </form>
  </div>

);
export default AddFormView;
