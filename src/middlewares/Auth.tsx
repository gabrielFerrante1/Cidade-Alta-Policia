import { useEffect, useState} from "react"
import { useSelector } from "react-redux"
import { Login } from "../components/Login";
import { RootState } from "../redux/Store"
import Layout from '../layouts/TheLayoutOne';

export const Auth = (props: any) => {
    //Reducer user
    const user = useSelector((state: RootState) => state.user);

    //States
    const [auth, setAuth] = useState(false);

    useEffect(()=>{
        const checkAuth = () => {
            //Checking if user is looged
            if(user.id > 0) {
                setAuth(true);
            } else {
                setAuth(false);
            }
        }

        checkAuth();
    });

    return (
        <>
            {auth ?
                <Layout>
                    {props.children}
                </Layout>
            :
             <Login />
            }
        </>
    )
}