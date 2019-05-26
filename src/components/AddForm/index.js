// @flow
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import { getUsers } from '../../redux/actions/usersActions';
import { findUser } from '../../redux/reducers';
import AddFormView from './AddFormView';

type MatchType = {
  params: { [key: string]: ?string },
  isExact: boolean,
  path: string,
  url: string
};

type RouterHistory = {
    push(path: string, state?: any): void,
    goBack: Function,
};

type UserType = {
  id: string,
  name: string,
  email: string,
  roles: string,
  organisation: string,
  features: Array<string>,
  country: string,
};

type AddFormPropsType = {
    getUsers: Function,
    users: Array<UserType>,
    category: string,
    history: RouterHistory,
    match: MatchType,
};

type AddFormStateType = {
  id: string,
  type: string,
  name: string,
  email: string,
  roles: string,
  organisation: string,
  features: Array<string>,
  country: string,
  error: string,
};

class AddForm extends Component<AddFormPropsType, AddFormStateType> {
  constructor(props: AddFormPropsType) {
    super(props);
    this.state = {
      id: this.props.match.params.id ? this.props.match.params.id : '',
      type: this.props.match.params.id ? 'Edit' : 'Add',
      name: '',
      email: '',
      organisation: '',
      roles: '',
      country: '',
      features: [],
      error: '',
    };
  }

  componentDidMount() {
    const { users } = this.props;
    if (this.populateForm(users)) return;
    // call get users if not loaded
    this.props.getUsers('Master Record 1', data => this.populateForm(data));
  }

  populateForm = (users) => {
    const { id } = this.state;
    const user = findUser(id, users);
    if (user) {
      const {
        name,
        email,
        organisation,
        roles,
        country,
        features,
      } = user;
      this.setState({
        name,
        email,
        organisation,
        roles,
        country,
        features,
      });
      return true;
    }
    return false;
  }

  onCancel = (event) => {
    event.preventDefault();
    this.props.history.goBack();
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { category } = this.props;
    const { id } = this.state;
    const {
      name,
      email,
      organisation,
      country,
      roles,
      features,
    } = this.state;
    const user = {
      name,
      email,
      organisation,
      category,
      roles,
      country,
      features,
    };
    if (!this.emptyForm(user)) return;
    if (id !== '') {
      this.updateDocument(user, id, category);
    } else {
      this.addDocument(user, category);
    }
  }

  emptyForm = (user) => {
    if (user.name === '') {
      this.setState({ error: 'A name is required' });
      return false;
    }
    if (user.email === '') {
      this.setState({ error: 'An email is required' });
      return false;
    }
    if (user.roles === '') {
      this.setState({ error: 'A role is required' });
      return false;
    }
    if (user.country === '') {
      this.setState({ error: 'country is required' });
      return false;
    }
    if (user.organisation === '') {
      this.setState({ error: 'An organisation is required' });
      return false;
    }
    return true;
  }

  addDocument = (user, category) => {
    const db = firebase.firestore();
    db.collection('users').add(user)
      .then(() => {
        this.props.history.goBack();
        this.props.getUsers(category);
      })
      .catch(() => {});
  }

  updateDocument = (user, id, category) => {
    const db = firebase.firestore();
    db.collection('users').doc(id).set(user)
      .then(() => {
        this.props.history.goBack();
        this.props.getUsers(category);
      })
      .catch(() => {});
  }

  handleChange = (event) => {
    const { target } = event;
    let param;
    if (target.type === 'select-multiple') {
      param = Array.from(target.selectedOptions, item => item.value);
    } else {
      const { value } = target;
      param = value;
    }
    const { name } = target;
    this.setState({ [name]: param, error: '' });
  }

  render() {
    const {
      type,
      name,
      email,
      organisation,
      roles,
      country,
      features,
      error,
    } = this.state;
    return (
      <AddFormView
        onCancel={this.onCancel}
        onSubmit={this.onSubmit}
        handleChange={this.handleChange}
        type={type}
        name={name}
        email={email}
        organisation={organisation}
        roles={roles}
        country={country}
        features={features}
        error={error}
      />);
  }
}

const mapDispatchToProps = { getUsers };

const mapStateToProps = ({ usersReducer }) => ({
  users: usersReducer.users,
  category: usersReducer.categories[usersReducer.categoryIdx],
});

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
