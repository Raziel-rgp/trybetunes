import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    isSubmiteButtonDisabled: true,
    name: '',
    loading: false,
  }

  onLoginSubmit = async () => {
    const { history } = this.props;
    this.setState({ loading: true });
    const { name } = this.state;
    await createUser({ name });
    history.push('/search');
  }

  buttonDisabled = () => {
    const { name } = this.state;
    const condition1 = 3;
    if (name.length >= condition1) {
      this.setState({ isSubmiteButtonDisabled: false });
    }
  }

  handleOnChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.buttonDisabled);
  }

  render() {
    const {
      loading,
      isSubmiteButtonDisabled,
      name,
    } = this.state;
    return (
      <div data-testid="page-login">
        <section>
          Login
          <br />
          <label htmlFor="formId">
            <form className="form" id="formId">
              <input
                data-testid="login-name-input"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleOnChange }
              />
              <br />
              <button
                data-testid="login-submit-button"
                type="button"
                onClick={ this.onLoginSubmit }
                disabled={ isSubmiteButtonDisabled }
              >
                Entrar
              </button>
              {loading && <Loading />}
            </form>
          </label>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
