const pool = require('../config/db');
const format = require('pg-format');

const filtrosApi =  async({limits = 3, order_by = 'id_ASC', page = 0}) => {
    const [campo, direccion] = order_by.split("_");
    const offset = page * limits;
    let consulta = format(`SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s`, campo, direccion, limits, offset );
    const {rows: inventario} = await pool.query(consulta);
    return inventario;
};


const getData = async (req, res) => {
    try{
        const queryString = req.query;
        console.log("el req.query es :", queryString);
        const agregados = await filtrosApi(queryString);
        res.json(agregados);
    }
    catch(error){
        console.log(error);
        throw error;
    }
};

const filtrosApi2 = async(precio_max, precio_min, categoria, metal) => {
    // aca ira la logica para filtrar segun cada argumento
}

const getDataFiltered = async (req, res) => {
    try{
        const queryString = req.query;
        console.log("el req.query es :", queryString);
        const agregados = await filtrosApi(queryString);
        res.json(agregados);
    }
    catch(error){
        console.log(error);
        throw error;
    }
};



const noExist = async(req, res) => {
    res.status(404).send("Esta ruta no existe")
    }

module.exports = { getData, getDataFiltered, noExist }