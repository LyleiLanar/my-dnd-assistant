const style = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
};

export default function LoginButton() {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
  };

  return (
    <button onClick={handleLogin} style={style}>
      Sign in with Microsoft
    </button>
  );
}
