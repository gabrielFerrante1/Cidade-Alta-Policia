import * as React from 'react';

//Nav
import { Link } from 'react-router-dom';

//Stylessheet
import './pages.css';

//Services api
import { Api } from '../services/Api';

//Types
import { GetCodesObjectForeach } from '../types/GetCodesObjectForeach';

//Components --Mui and Bootstrap
import {Container, Table, Row, Col, Modal, Button} from 'react-bootstrap';
import {  Pagination, TextField } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress'; 
import MenuItem from '@mui/material/MenuItem';  
import { Alert } from '../components/Alert';

export const Home = () => {
    //States
    const [loadingApi, setLoadingApi] = React.useState(false);
    const [dataCodes, setDataCodes] = React.useState([]);
    const [inputName, setInputName] = React.useState('');
    const [inputStatus, setInputStatus] = React.useState('');
    const [inputMulta, setInputMulta] = React.useState(''); 
    const [inputOrder, setInputOrder] = React.useState('');
    const [openModalDelete, setOpenModalDelete] = React.useState({toggle: false, id: 0});
    const [openAlertDelete, setOpenAlertDelete] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [countPages, setCountPages] = React.useState(1);

    //Function of pagination
    const handleChangePageClick = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    //Functions of states
    const handleChangeInputStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputStatus(event.target.value);
    };
    
    const handleChangeInputMulta = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputMulta(event.target.value);
    };

    const handleChangeInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(event.target.value);
    };

    const handleChangeInputOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputOrder(event.target.value);
    }; 

    //Functions of button delete
    const deleteCode = async () => {
        //Delete code
        if(openModalDelete.id > 0) {
            let json = await Api.deleteCode(openModalDelete.id);

            setOpenAlertDelete(true);
        }

        setOpenModalDelete({toggle:false,id:0});
    }

    const showModalDelete = React.useMemo(()=>openAlertDelete &&
        <Alert mensage='O código penal foi deletado' type='green' />
    , [openAlertDelete]);


    //UseEffects
    React.useEffect(()=>{
        const getCodesWithFilter = async (limit: number, offset: number) => {
            setLoadingApi(true);
            let json = await Api.getAllCodes(limit, offset); 
            setLoadingApi(false);
            
            //Filtering results of API
            let resultado = json.filter((item: GetCodesObjectForeach) => { 
                if(
                    (inputName != '' ? item.nome.indexOf(inputName)  != -1 : true) &&
                    (inputStatus != '' && inputStatus != '0' ? item.status == +inputStatus : true) &&
                    (inputMulta != '' && inputOrder == '0' ? true :
                        inputMulta == '>100' ? item.multa >= 100 :
                        inputMulta == '>500' ? item.multa >= 500 :
                        inputMulta == '>1000' ? item.multa >= 1000 : true
                    ) 
                  ) {
                    return item;
                } 
            });
    
            //Orderning results of filtering
            function compare (a: GetCodesObjectForeach,b: GetCodesObjectForeach) { 
                if(a.nome < b.nome) return -1;
                if(a.nome > b.nome) return 1;
                return 0; 
            }
    
            if(inputOrder != '' && inputOrder == 'nameDesc') { 
                resultado = resultado.reverse(compare);
            } else if(inputOrder != '' && inputOrder == 'nameAsc') { 
                resultado = resultado.sort(compare);
            }
    
            setDataCodes(resultado); 
        }
 
        //Pagination
        const limit: number = 2; 
        const offset: number = (page - 1) * limit; 
        setCountPages(Math.round((3  / limit)));

        //Exec function
        getCodesWithFilter(limit, offset);

    }, [inputMulta, inputStatus, inputName, inputOrder, page]);

    return (
        <Container fluid>
            <Row className='p-2'>
                <Col className="offset-md-10" md={2}>
                    <Link to="/code-new">
                        <button id='button--new--code'>
                            Criar novo código penal
                        </button>
                    </Link>
               </Col>
            </Row>

            <Row className="mt-4">
                <Col md={4}>
                    <TextField 
                        size='small'
                        label="Pesquisar por nome" 
                        variant="outlined"
                        style={{width:'100%'}}
                        onChange={handleChangeInputName}
                        value={inputName}
                     />
                </Col>
                <Col md={3}>
                    <TextField
                        id="outlined-select-currency-native" 
                        select
                        label="Pesquise por status"  
                        size="small"
                        onChange={handleChangeInputStatus}
                        value={inputStatus}
                        style={{width:'100%'}}
                    >
                    <MenuItem value="0">
                         Todos status
                    </MenuItem>
                    <MenuItem value="1">
                         Ativo
                    </MenuItem>
                    <MenuItem value="2">
                        Inativo
                    </MenuItem> 
                    </TextField>
                </Col>
                <Col md={3}>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Pesquise por multa"  
                        size="small"
                        onChange={handleChangeInputMulta}
                        value={inputMulta}
                        style={{width:'100%'}}
                    >
                    <MenuItem value="0">
                        Todos os valores
                    </MenuItem>
                    <MenuItem value=">100">
                         Maior que R$ 100
                    </MenuItem>
                    <MenuItem value=">500">
                         Maior que R$ 500
                    </MenuItem>
                    <MenuItem value=">1000">
                         Maior que R$ 1000
                    </MenuItem> 
                    </TextField>
                </Col>
                <Col md={2}>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Ordenar"  
                        size="small"
                        onChange={handleChangeInputOrder}
                        value={inputOrder}
                        style={{width:'100%'}}
                    > 
                    <MenuItem value="nameAsc">
                        Nome ordem cresente
                    </MenuItem>
                    <MenuItem value="nameDesc">
                        Nome ordem decresente
                    </MenuItem> 
                    </TextField>
                </Col> 
            </Row>


            {loadingApi &&
                <Row className='mt-4'>
                    <LinearProgress />
                </Row>
            }


            <Row className='mt-4 p-2'>
                <Table hover id="table--all--codes">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data</th>
                            <th>Multa</th>
                            <th>Status</th>
                            <th style={{width:'250px'}}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCodes.map((item: GetCodesObjectForeach, key) => (
                            <tr key={key}>
                                <td>{item.nome}</td>
                                <td>{item.dataCriacao}</td>
                                <td>{item.multa}</td>
                                <td>{item.status == 1 ? 'Ativo' : 'Inativo'}</td>
                                <td style={{padding:'5px 10px',display:'flex',justifyContent:'center'}}> 
                                    <Link to={`/code/${item.id}`}><button className='btn btn-sm btn-success'>Ver</button></Link>
                                    <Link style={{marginLeft:'10px'}} to={`/code-edit/${item.id}`}><button className='btn btn-sm btn-warning'>Editar</button></Link>
                                    <button 
                                        style={{marginLeft:'10px'}}  
                                        className='btn btn-sm btn-danger'
                                        onClick={()=>{setOpenModalDelete({toggle:true,id:item.id})}}
                                    >
                                        Deletar
                                    </button> 
                                </td>
                            </tr>
                        ))} 
                    </tbody>
                </Table>

                <Pagination 
                    page={page}
                    onChange={handleChangePageClick} 
                    count={countPages} 
                    color="primary" 
                    className='mt-2' 
                />

            </Row>

            <Modal className="mt-5" show={openModalDelete.toggle} onHide={()=>setOpenModalDelete({toggle:false,id:0})}>
                <Modal.Header closeButton>
                    <Modal.Title>Deseja deletar o código penal?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button onClick={()=>setOpenModalDelete({toggle:false,id:0})} variant="secondary">
                        Não
                    </Button>
                    <Button onClick={deleteCode} style={{marginLeft:'10px'}} variant="danger">
                        Sim
                    </Button>
                </Modal.Body> 
            </Modal>

            {showModalDelete}
        </Container>
      );
}