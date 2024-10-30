import BasePage from './basePage';

export default function Home(props) {
  return (
    <BasePage {...props}>
      <h1>Home</h1>
      <p>Yeah! Now you are logged in!</p>
    </BasePage>
  );
}
