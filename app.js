var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/productRoutes');


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);


const db = require('./models');

//aplicar as migrations (integrar com o BD [MySQL])

// função para controlar a sincronização com o banco de dados
async function ApplyMigrations() {
    try {

        migration_config = {
            create: true,
            alter: true,
        };
        
         db.sequelize.sync({
            alter: migration_config.alter,
        });

        console.log('SINCRONIZAÇÃO COM O BD REALIZADA');
    }
    catch(error) {
        console.log('Erro sincronizando o banco de dados', error);
    }

}

// acionar a função de sincronização
 ApplyMigrations();


const PORT = 3000;
app.listen(PORT, console.log(`rodando na porta ${PORT}`));
//module.exports = app;
