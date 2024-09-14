const pool = require('../config/db');
const format = require('pg-format');

const filtrosApi =  async({limits = 3, order_by = 'id_ASC', page = 0}) => {
    const [campo, direccion] = order_by.split("_");
    const offset = page * limits; // se debe buscar como pagina 0 y 1, ya que solo son 6 items y por defecto los muestra de a 3
    let consulta = format(`SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s`, campo, direccion, limits, offset );

     const { rowCount: todas } = await pool.query("SELECT * FROM inventario"); //solo para la paginacion
    // a continuacion se construye la consulta con cláusulas en estructura de datos HATEOAS
    const { rowCount: totalJoyas } = await pool.query(consulta);
    const {rows: resultadosTotales} = await pool.query(consulta);

    const resultados = resultadosTotales.map(({id, nombre}) => (
        {
        nombre,
        href: `/joyas/joyas/${id}`
    }))

    const stockTotal = resultadosTotales.reduce((suma, item) => {
        return suma + item.stock
    }, 0)

    const totalConsulta = {
        totalJoyas,
        stockTotal,
        resultados,
        pages: Math.ceil( todas / limits),
    }
    return totalConsulta;
};


const getData = async (req, res) => {
    try{
        const queryString = req.query;
        const agregados = await filtrosApi(queryString);

        res.json(agregados);
    }
    catch(error){
        console.log(error);
        throw error;
    }
};

const filtrosApi2 = async({precio_max = 0, precio_min, categoria, metal} ) => {
    let filtros = [];
    let consulta = "";
    if (precio_max) filtros.push(`precio > ${precio_max}`);
    if (precio_min) filtros.push(`precio < ${precio_min}`);
    if (categoria) filtros.push(`categoria = '${categoria}'`);
    if (metal) filtros.push(`metal = '${metal}'`);
        console.log("los filtros a concatenar son:", filtros);
    if (filtros.length > 0) {
        filtros = filtros.join(" AND ");
        consulta =` WHERE ${filtros}`
        };
    let consultaCompleta = format(`SELECT * FROM inventario %s`, consulta );
    const {rows: inventario} = await pool.query(consultaCompleta);
    return inventario;
}

const getDataFiltered = async (req, res) => {
    try{
        const queryString = req.query;
        console.log("el req.query es :", queryString);
        const agregados = await filtrosApi2(queryString);
        res.json(agregados);
    }
    catch(error){
        console.log(error);
        throw error;
    }
};

const getForId = async(req, res) => {
    const idMostrar = req.params.id;
    let consultaId = format(`SELECT * FROM inventario WHERE ID = '%s'`, idMostrar );
    const {rows: resultado} = await pool.query(consultaId);
    res.send(resultado);
};



const noExist = async(req, res) => {
    res.status(404).send("Esta ruta no existe")
    }

module.exports = { getData, getDataFiltered, getForId, noExist }