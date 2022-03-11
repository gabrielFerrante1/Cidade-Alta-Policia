import React, { useMemo, useState } from 'react';

//Stylesheets
import './components.css';
import styled from 'styled-components';

//Redux
import { useDispatch } from "react-redux" 
import { setId, setName, setPassword } from "../redux/reducers/userReducer";

//Services --Api
import { Api } from '../services/Api';

//Components --Mui
import { Button } from '@mui/material'; 
import { Alert } from '../components/Alert';
import { useNavigate } from 'react-router-dom';
 

//Styleds Components
const ContainerApp = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    height:50vh; 
`;

const Card = styled.div`
    padding:3px 10px;
    border-radius:6px;
    background:#EEE;
    width:510px;
`;

const CardHeader = styled.div`
    border-bottom:1px solid gray;
    padding:4px;
`;

const CardBody = styled.div`
    margin-top:10px;
`;

const CardFooter = styled.div` 
    margin-top:17px;
    padding:15px 0px 5px 0px;
    border-top:1px solid gray; 
`; 


export const Login = () => {
    //Reducer user 
    const dispatch = useDispatch(); 
    const nav = useNavigate();

    //States 
    const [inputValueName, setInputValueName] = useState('');
    const [inputValuePassword, setInputValuePassword] = useState(''); 
    const [openAlert, setOpenAlert] = useState({mensage: ''});

    //Consts of change texts inputs
    const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValueName(event.target.value);
    }

    const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValuePassword(event.target.value);
    } 

    const sendAuthentication = async () => {
        if(inputValueName && inputValuePassword) {
            let json = await Api.queryOfAuthentication(inputValueName, inputValuePassword);

            if(json.length > 0) {
                dispatch(setId(json[0].id));
                dispatch(setName(json[0].nome));
                dispatch(setPassword(json[0].senha));  
            } else {
                setOpenAlert({mensage: 'Nome e/ou senha errados'});
            } 
        } else {
            setOpenAlert({mensage: 'Preencha todos os campos'});
        }
    }
 
    const showErrors = useMemo(()=> openAlert.mensage != '' &&  
            <Alert mensage={openAlert.mensage} type='red' /> 
    , [openAlert])

    return (
        <ContainerApp>
            <Card>
                <CardHeader>
                    <h4 className="title--login">Fazer login</h4>
                </CardHeader>
        
                <CardBody>
                    <div>
                        <label htmlFor="nameUser" className='labels--login'>Seu nome: </label>
                        <input id='nameUser' type="text" className='inputs--login' value={inputValueName} onChange={handleInputName}/>
                    </div>

                    <div style={{marginTop:'15px'}}>
                        <label htmlFor="nameUser" className='labels--login'>Sua senha: </label>
                        <input id='nameUser' type="text" className='inputs--login' value={inputValuePassword} onChange={handleInputPassword}/>
                    </div> 
                </CardBody>

                <CardFooter>
                    <Button onClick={sendAuthentication} style={{width:'100px'}} variant="contained">Entrar</Button>
                </CardFooter> 
            </Card>

            {showErrors}
        </ContainerApp>
    )
}