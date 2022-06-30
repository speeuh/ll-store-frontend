import { useState, useContext } from 'react';
import { AuthContext } from 'contexts/auth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormControl, FormGroup } from 'react-bootstrap';

import styles from './Login.module.scss';
import { BsFacebook, BsGoogle, BsLinkedin } from 'react-icons/bs';
import classNames from 'classnames';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [isContainerActive, setIsContainerActive] = useState(false);

  const signUpButton = () => {
    setIsContainerActive(true);
  };
  const signInButton = () => {
    setIsContainerActive(false);
  };

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  const { login } = useContext(AuthContext);

  function handleSubmitSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post('http://localhost:8080/users', {
        userName: userName,
        email: email,
        password: password,
      })
      .then(() => {
        alert('Usuário criado com sucesso');
        setEmail('');
        setUserName('');
        setPassword('');
      });
  }

  function handleSubmitSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    login(userName, password);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.login}>
          <div
            className={classNames({
              [styles.login__form_container]: true,
              [styles.login__sign_up_container]: true,
              [`${styles.login__right_panel_active_sign_in_container} ${styles.login__right_panel_active}`]:
                isContainerActive,
            })}
          >
            <Form className={styles.login__form} onSubmit={handleSubmitSignUp}>
              <h1 className={styles.login__title}> Create Account </h1>

              <div className={styles.login__social_container}>
                <a href='#' className={styles.login__social}>
                  <BsFacebook />
                </a>
                <a href='#' className={styles.login__social}>
                  <BsGoogle />
                </a>
                <a href='#' className={styles.login__social}>
                  <BsLinkedin />
                </a>
              </div>

              <span>or use your email for registration</span>

              <FormGroup>
                <FormControl
                  bsPrefix={styles.login__input}
                  placeholder='Email'
                  autoFocus
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <FormControl
                  bsPrefix={styles.login__input}
                  placeholder='User'
                  autoFocus
                  type='text'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <FormControl
                  bsPrefix={styles.login__input}
                  placeholder='Password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button
                bsPrefix={styles.login__button}
                type='submit'
                disabled={!validateForm()}
              >
                Sign Up
              </Button>
            </Form>
          </div>

          <div
            className={classNames({
              [styles.login__form_container]: true,
              [styles.login__sign_in_container]: true,
              [`${styles.login__right_panel_active_sign_in_container}`]:
                isContainerActive,
            })}
          >
            <Form className={styles.login__form} onSubmit={handleSubmitSignIn}>
              <h1 className={styles.login__title}> Sign in </h1>

              <div className={styles.login__social_container}>
                <a href='#' className={styles.login__social_container_item}>
                  <BsFacebook />
                </a>
                <a href='#' className={styles.login__social}>
                  <BsGoogle />
                </a>
                <a href='#' className={styles.login__social}>
                  <BsLinkedin />
                </a>
              </div>

              <span>or use your account</span>

              <FormGroup>
                <FormControl
                  bsPrefix={styles.login__input}
                  placeholder='User'
                  autoFocus
                  type='text'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <FormControl
                  bsPrefix={styles.login__input}
                  placeholder='Password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <a href='#'>Forgot your password?</a>

              <Button
                bsPrefix={styles.login__button}
                type='submit'
              >
                Sign In
              </Button>
            </Form>
          </div>

          <div
            className={classNames({
              [styles.login__overlay_container]: true,
              [styles.login__right_panel_active_overlay_container]:
                isContainerActive,
            })}
          >
            <div
              className={classNames({
                [styles.login__overlay]: true,
                [styles.login__right_panel_active_overlay]: isContainerActive,
              })}
            >
              <div
                className={classNames({
                  [styles.login__overlay_panel]: true,
                  [styles.login__overlay_left]: true,
                  [styles.login__right_panel_active_overlay_left]:
                    isContainerActive,
                })}
              >
                <h1 className={styles.login__title}> Welcome Back! </h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <Button
                  bsPrefix={classNames({
                    [styles.login__button]: true,
                    [styles.login__button_ghost]: true,
                  })}
                  id='signUp'
                  onClick={signInButton}
                >
                  Sign In
                </Button>
              </div>
              <div
                className={classNames({
                  [styles.login__overlay_panel]: true,
                  [styles.login__overlay_right]: true,
                  [styles.login__right_panel_active_overlay_right]:
                    isContainerActive,
                })}
              >
                <h1 className={styles.login__title}> Hello, Friend! </h1>
                <p>Enter your personal details and have fun!</p>
                <Button
                  bsPrefix={classNames({
                    [styles.login__button]: true,
                    [styles.login__button_ghost]: true,
                  })}
                  id='signUp'
                  onClick={signUpButton}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
