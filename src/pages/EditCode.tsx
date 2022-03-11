import * as React from 'react';

//Nav
import { Link, useNavigate, useParams } from 'react-router-dom';

//Stylessheet
import './pages.css';

//Services api
import { Api } from '../services/Api'; 

//Components --Mui and Bootstrap
import {Container, Row} from 'react-bootstrap'; 
import LinearProgress from '@mui/material/LinearProgress';  
import Breadcrumbs from '@mui/material/Breadcrumbs';  
import { Button, MenuItem, TextField } from '@mui/material';
import { Alert } from '../components/Alert';

//Types
import { GetCodeObjectAllProps } from '../types/GetCodeObjectAllProps';

export const EditCode = () => {
    //Navs
    const slugs = useParams() as any;
    const nav = useNavigate();

    //States
    const [loadingApi, setLoadingApi] = React.useState(false);
    const [dataCode, setDataCode] = React.useState<null | GetCodeObjectAllProps>(null); 
    const [openAlert, setOpenAlert] = React.useState<{mensage: string, type: string}>({mensage: '', type: ''});

    //Consts of edit inputs
    const cloneObjectDataCode = Object.assign({}, dataCode);

    const handleChangeInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
        cloneObjectDataCode.nome = event.target.value;
        setDataCode(cloneObjectDataCode);
    }

    const handleChangeInputDescricao = (event: React.ChangeEvent<HTMLInputElement>) => {
        cloneObjectDataCode.descricao = event.target.value;
        setDataCode(cloneObjectDataCode);
    }

    const handleChangeInputMulta = (event: React.ChangeEvent<HTMLInputElement>) => {
        cloneObjectDataCode.multa = +event.target.value;
        setDataCode(cloneObjectDataCode);
    } 

    const handleChangeInputTempoPrisao = (event: React.ChangeEvent<HTMLInputElement>) => {
        cloneObjectDataCode.tempoPrisao = +event.target.value;
        setDataCode(cloneObjectDataCode);
    }

    const handleChangeInputStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        cloneObjectDataCode.status = +event.target.value;
        setDataCode(cloneObjectDataCode);
    }

    //Memoization of errors
    const showErrors = React.useMemo(()=> openAlert.mensage != '' &&
          <Alert mensage={openAlert.mensage} type={openAlert.type} />
    , [openAlert]);

    //Save alteretions 
    const saveChanges = async () => {
        if(
            dataCode?.nome != '' &&
            dataCode?.descricao != '' &&
            dataCode?.multa != 0 &&
            dataCode?.tempoPrisao != 0 &&
            dataCode?.status != 0
        ) {

            //Request edit api
            let api = await Api.editCode(dataCode as GetCodeObjectAllProps);
    

            setOpenAlert({mensage: 'Dados salvos com sucesso', type: 'green'})
        } else {
            setOpenAlert({mensage: 'Preencha todos os campos', type: 'red'})
        }
    }

    //UseEffects
    React.useEffect(()=>{ 
        const getCodeOfId = async () => {
            setLoadingApi(true);
            let json = await Api.getCodeOfId(slugs.id); 
            setLoadingApi(false);

            //If not exists the code
            if(!json.nome) return nav('/');

            setDataCode(json);  
        }
        
        //Exec function
        getCodeOfId();

    }, []); 

    return (
        <Container fluid> 
            <Row>
                <Breadcrumbs aria-label="breadcrumb"> 
                        <Link className='text-decoration-none' to="/">
                            Todos códigos penais
                        </Link>
                        <Link className='text-decoration-none text-secondary' to="">
                            Editar - {dataCode?.nome}
                        </Link>
                </Breadcrumbs>
            </Row>

            {loadingApi &&
                <Row className='mt-4'>
                    <LinearProgress />
                </Row>
            }

            <hr />

            <Row className='mt-2 ' id="one--code"> 
                <TextField 
                    size='small'
                    label="Editar nome" 
                    variant="outlined"
                    style={{width:'60%'}}
                    onChange={handleChangeInputName}
                    value={dataCode?.nome}
                    defaultValue="Carregando..." 
                />
                <TextField 
                    className='mt-4'
                    size='small'
                    label="Editar descrição" 
                    variant="outlined"
                    style={{width:'60%'}}
                    onChange={handleChangeInputDescricao}
                    value={dataCode?.descricao}
                    defaultValue="Carregando..." 
                />
                <TextField 
                    className='mt-4'
                    size='small'
                    label="Editar multa" 
                    variant="outlined"
                    style={{width:'60%'}}
                    onChange={handleChangeInputMulta}
                    value={dataCode?.multa}
                    defaultValue="Carregando..." 
                />
                <TextField 
                    className='mt-4' 
                    size='small'
                    label="Editar tempo de prisão" 
                    variant="outlined"
                    style={{width:'60%'}}
                    onChange={handleChangeInputTempoPrisao}
                    value={dataCode?.tempoPrisao}
                    defaultValue="Carregando..." 
                />
                <TextField 
                    className='mt-4'
                    select
                    size='small'
                    label="Editar status" 
                    variant="outlined"
                    style={{width:'60%'}}
                    onChange={handleChangeInputStatus}
                    value={dataCode?.status}
                    defaultValue="1"
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
                        style={{width:'190px',marginLeft:'-12px'}}
                        variant="contained"
                        className="mt-3"
                        onClick={saveChanges}
                    >
                        Salvar alterações
                    </Button>
                </div>
            </Row>

            {showErrors}
        </Container>
      );
}