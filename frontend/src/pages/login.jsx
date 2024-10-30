import LoginButton from '../components/loginButton';
import BasePage from './basePage';

export default function Login(props) {
  return (
    <BasePage title="Login" {...props}>
      <LoginButton />
    </BasePage>
  );
}
