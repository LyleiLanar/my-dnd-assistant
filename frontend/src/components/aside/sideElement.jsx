export default function SideElement(props) {
  return (
    <li
      className={props.isActive ? 'activeSideElement' : 'inactiveSideElement'}
    >
      <span>{props.isActive && '➤'}</span>
      <a href={props.path}>{props.text}</a>
    </li>
  );
}
