// @flow
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import { getUsers, setCategoryIdx } from '../../redux/actions/usersActions';
import HomeView from './HomeView';

type UserType = {
  id: string,
  name: string,
  email: string,
  roles: string,
  organisation: string,
  features: Array<string>,
  country: string,
};

type HomePropsType = {
    users: Array<UserType>,
    categories: Array<string>,
    categoryIdx: number,
    loading: Boolean,
    getUsers: Function,
    setCategoryIdx: Function,
};

type HomeStateType = {};

class Home extends Component<HomePropsType, HomeStateType> {
  onSelect = (event, idx) => {
    event.preventDefault();
    const { categories } = this.props;
    this.props.setCategoryIdx(idx);
    this.props.getUsers(categories[idx]);
  }

  onDelete = (event, id) => {
    event.preventDefault();

    const db = firebase.firestore();

    db.collection('users').doc(id).delete()
      .then(() => {
        const { categories, categoryIdx } = this.props;
        this.props.getUsers(categories[categoryIdx]);
      })
      .catch(() => {});
  }

  componentDidMount() {
    const {
      users,
      categories,
      categoryIdx,
    } = this.props;
    if (users.length !== 0) return;
    this.props.getUsers(categories[categoryIdx]);
  }

  render() {
    const { categoryIdx, loading, categories } = this.props;
    const category = categories[categoryIdx];
    let { users } = this.props;
    if (loading) users = [];
    return (
      <HomeView
        onSelect={this.onSelect}
        onDelete={this.onDelete}
        category={category}
        categories={categories}
        loading={loading}
        categoryIdx={categoryIdx}
        users={users}
      />
    );
  }
}

const mapDispatchToProps = {
  getUsers,
  setCategoryIdx,
};

const mapStateToProps = ({ usersReducer }) => ({
  users: usersReducer.users,
  categoryIdx: usersReducer.categoryIdx,
  loading: usersReducer.loading,
  categories: usersReducer.categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
