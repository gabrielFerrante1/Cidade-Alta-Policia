import * as React from 'react';

//Nav
import { Link, } from 'react-router-dom';

//Stylessheet
import './pages.css';

//Services api
import { Api } from '../services/Api'; 

//Components --Mui and Bootstrap
import {Container, Row} from 'react-bootstrap';
import Breadcrumbs from '@mui/material/Breadcrumbs';  
import { Button, MenuItem, TextField } from '@mui/material';
import { Alert } from '../components/Alert';

export const NewCode = () => { 
    //States
    const [inputName, setInputName] = React.useState('');
    const [inputDescricao, setInputDescricao] = React.useState('');
    const [inputMulta, setInputMulta] = React.useState(0);
    const [inputStatus, setInputStatus] = React.useState(0);
    const [inputTempoPrisao, setInputTempoPrisao] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState<{mensage: string, type: string}>({mensage: '', type: ''});
 
    //Consts of  inputs 
    const handleChangeInputName = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setInputName( event.target.value);
    }

    const handleChangeInputDescricao = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDescricao( event.target.value);
    }

    const handleChangeInputMulta = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputMulta( +event.target.value);
    } 

    const handleChangeInputTempoPrisao = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTempoPrisao( +event.target.value);
    }

    const handleChangeInputStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputStatus( +event.target.value);
    }

    //Memoization of errors
    const showErrors = React.useMemo(()=> openAlert.mensage != '' &&
          <Alert mensage={openAlert.mensage} type={openAlert.type} />
    , [openAlert]);

    //Save new code
    const saveNewCode = async () => {
        if(
            inputName != '' &&
            inputDescricao != '' &&
            inputStatus != 0 
        ) {
            const data = {
                nome: inputName, 
                descricao: inputDescricao,
                multa: inputMulta, 
                tempoPrisao: inputTempoPrisao,
                status: inputStatus
            }

            let json = await Api.newCode(data);

            setOpenAlert({mensage:'Código penal criado com sucesso', type:'green'});
        } else {
            setOpenAlert({mensage:'Preencha todos os campos', type:'red'})
        }
    }

    return (
        <Container fluid> 
            <Row>
                <Breadcrumbs aria-label="breadcrumb"> 
                        <Link className='text-decoration-none' to="/">
                            Todos códigos penais
                        </Link>
                        <Link className='text-decoration-none text-secondary' to="">
                            Novo código penal
                        </Link>
                </Breadcrumbs>
            </Row> 

            <hr />

            <Row className='mt-2 ' id="one--code"> 
                <TextField 
                    size='small'
                    label="Nome" 
                    variant="outlined"
                    style={{width:'60%'}}
                    onChange={handleChangeInputName}
                    value={inputName} 
                />
                <TextField 
                    className='mt-4'
                    size='small'
                    label="Descrição" 
                    variant="outlined"
                    style={{width:'60%'}}
                    onChange={handleChangeInputDescricao}
                    value={inputDescricao} 
                />
                <TextField 
                    className='mt-4'
                    size='small'
                    label="Multa" 
                    variant="outlined"
                    style={{width:'60%'}}
                    onChange={handleChangeInputMulta}
                    value={inputMulta} 
                />
                <TextField 
                    className='mt-4' 
                    size='small'
                    label="Tempo de prisão" 
                    variant="outlined"
                    style={{width:'60%'}}
                    onChange={handleChangeInputTempoPrisao}
                    value={inputTempoPrisao} 
                />
                <TextField 
                    className='mt-4'
                    select
                    size='small'
                    label="Status" 
                    variant="outlined"
                    style={{width:'60%'}}
                    onChange={handleChangeInputStatus}
                    value={inputStatus} 
                >
                    <MenuItem value="1">
                            Ativo
                    </MenuItem>
                    <MenuItem value="2">
                            Inativo
                    </MenuItem>
                </TextField>
    
                <div> 
                    <Button 
                        style={{width:'100px',marginLeft:'-12px'}}
                        variant="contained"
                        className="mt-3"
                        onClick={saveNewCode}
                    >
                        Criar
                    </Button>
                </div>
            </Row>

            {showErrors}
        </Container>
      );
}