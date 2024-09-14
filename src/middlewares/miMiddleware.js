

const miMiddleware = async (req, res, next) => {
    console.log("la consulta es:", req.url, "\n")
    console.log("el metodo es:", req.method, "\n")
    console.log("los datos de la query son:", req.query, "\n")

    next()
  };

module.exports = {
  miMiddleware
}