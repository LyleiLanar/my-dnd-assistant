import './loginButton.css';

export default function LoginButton() {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
  };

  return (
    <div className="loginButton">
      <button onClick={handleLogin}>
        <div className="buttonText">
          <p>Sign in with Microsoft</p>
          <img
            src="microsoft_logo.png"
            alt="login_width_microsoft"
            width={50}
          />
        </div>
      </button>
    </div>
  );
}
