import React from 'react';

const LoginPage: React.FC = () => {
    return (
        <div style={styles.container}>
            <div style={styles.info}>
                <div style={styles.infoContainer}>
                    <h1 style={styles.title}>DigiForum.IO</h1>
                    <p style={styles.description}>Any discussion, anywhere, with anyone, only at DigiForum.io</p>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Front-end Development</h3>
                        <p style={styles.cardText}>The three main languages you need to know well are HTML, CSS, and JavaScript. From there you can focus on frameworks, libraries, and other useful tools.</p>
                    </div>
                </div>
            </div>
            <div style={styles.loginForm}>
                <div style={styles.formContainer}>
                    <h2 style={styles.formTitle}>Login</h2>
                    <button style={styles.googleBtn}>Login with Google</button>
                    <div style={styles.separator}>or</div>
                    <form>
                        <input type="email" placeholder="Email" required style={styles.input} />
                        <input type="password" placeholder="Password" required style={styles.input} />
                        <div style={styles.options}>
                            <label><input type="checkbox" /> Remember me</label>
                            <a href="#" style={styles.link}>Forgot Password?</a>
                        </div>
                        <button type="submit" style={styles.loginBtn}>Login</button>
                    </form>
                    <div style={styles.createAccount}>
                        Don’t have an account? <a href="#" style={styles.link}>Create one!</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        width: '100%',
        height: '100vh',
        backgroundColor: '#1a1a2e',
    },
    info: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
    },
    infoContainer: {
        backgroundColor: '#ffb3b3',
        borderRadius: '10px',
        padding: '40px',
        color: '#333',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
    },
    title: {
        fontSize: '28px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    description: {
        marginBottom: '30px',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    },
    cardTitle: {
        margin: '0',
    },
    cardText: {
        margin: '0',
    },
    loginForm: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: '#2a2a44',
        borderRadius: '10px',
        padding: '40px',
        color: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        width: '80%',
        maxWidth: '400px',
    },
    formTitle: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    googleBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4285f4',
        color: 'white',
        padding: '12px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '15px',
        width: '100%',
    },
    separator: {
        textAlign: 'center',
        margin: '10px 0',
        fontSize: '14px',
        color: '#bbb',
    },
    input: {
        width: '100%',
        padding: '12px',
        margin: '8px 0',
        backgroundColor: '#333',
        border: '1px solid #555',
        color: '#fff',
        borderRadius: '4px',
    },
    options: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        fontSize: '14px',
    },
    link: {
        color: '#bbb',
        textDecoration: 'none',
    },
    loginBtn: {
        backgroundColor: '#555',
        color: 'white',
        padding: '12px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
    },
    createAccount: {
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '14px',
    },
};

export default LoginPage;
