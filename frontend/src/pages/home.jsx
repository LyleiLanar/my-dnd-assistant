import BasePage from './basePage';

export default function Home(props) {
  return (
    <BasePage title="Welcome!" {...props}>
      <p>Yeah! Now you are logged in!</p>
    </BasePage>
  );
}
