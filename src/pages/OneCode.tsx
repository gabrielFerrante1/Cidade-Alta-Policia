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

//Types
import { GetCodeObjectAllProps } from '../types/GetCodeObjectAllProps';

export const OneCode = () => {
    //Navs
    const slugs = useParams() as any;
    const nav = useNavigate();

    //States
    const [loadingApi, setLoadingApi] = React.useState(false);
    const [dataCode, setDataCode] = React.useState<null | GetCodeObjectAllProps>(null);

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

        //Exec the function
        getCodeOfId();
    }, [])
    

    return (
        <Container fluid> 
            <Row>
                <Breadcrumbs aria-label="breadcrumb"> 
                        <Link className='text-decoration-none' to="/">
                            Todos códigos penais
                        </Link>
                        <Link className='text-decoration-none text-secondary' to="">
                            {dataCode?.nome}
                        </Link>
                </Breadcrumbs>
            </Row>

            {loadingApi &&
                <Row className='mt-4'>
                    <LinearProgress />
                </Row>
            }

            <hr />

            <Row className='mt-2' id="one--code">
                <div className='one--code--content'>
                    <h5  className='one--code--title'>Nome do código penal: </h5> 
                    
                    <span className='one--code--subtitle'>{dataCode?.nome}</span>
                </div>

                <div className='mt-4 one--code--content'>
                    <h5  className='one--code--title'>Descrição: </h5> 
                    
                    <span className='one--code--subtitle'>{dataCode?.descricao}</span>
                </div>

                <div className='mt-4 one--code--content'>
                    <h5  className='one--code--title'>Multa: </h5> 
                    
                    <span className='one--code--subtitle'>R$ {dataCode?.multa}</span>
                </div>
                
                <div className='mt-4 one--code--content'>
                    <h5  className='one--code--title'>Tempo de prisão: </h5> 
                    
                    <span className='one--code--subtitle'>{dataCode?.tempoPrisao}</span>
                </div>

                <div className='mt-4 one--code--content'>
                    <h5  className='one--code--title'>Status: </h5> 
                    
                    <span className='one--code--subtitle'>{dataCode?.status == 1 ? 'Ativo' : 'Inativo'}</span>
                </div>

                <div className='mt-4 one--code--content'>
                    <h5  className='one--code--title'>Data de criação: </h5> 
                    
                    <span className='one--code--subtitle'>{dataCode?.dataCriacao}</span>
                </div> 
            </Row>
        </Container>
      );
}