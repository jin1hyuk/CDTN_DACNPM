import Box from "../box/box";
import RegisterBox from "../registerBox/registerBox";
import './loginLayout.css';

const LoginLayout = () => {
    return (
        <>
            <div className="container">
                <div>
                    <Box />
                </div>
                <div>
                    <RegisterBox />
                </div>
            </div>
        </>
    )
}

export default LoginLayout;
