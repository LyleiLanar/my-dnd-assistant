export default function BasePage({ children }) {
  const styles = {
    basePage: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
    header: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '1rem',
      textAlign: 'center',
    },
    mainContent: {
      display: 'flex',
      flex: 1,
    },
    sidebar: {
      backgroundColor: '#f4f4f4',
      padding: '1rem',
      width: '200px',
    },
    content: {
      flex: 1,
      padding: '1rem',
      backgroundColor: '#fff',
    },
  };

  return (
    <div style={styles.basePage}>
      <header style={styles.header}>
        <h1>My D&D Assitant</h1>
      </header>
      <div style={styles.mainContent}>
        <aside style={styles.sidebar}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </aside>
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
}
