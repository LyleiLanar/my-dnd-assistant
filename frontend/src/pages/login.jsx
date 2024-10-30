import LoginButton from '../components/loginButton';
import BasePage from './basePage';

export default function Login(props) {
  return (
    <BasePage {...props}>
      <h1>Login</h1>
      <LoginButton />
    </BasePage>
  );
}
