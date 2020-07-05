const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./models/user');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

//这是我们的MongoDB数据库
const dbRoute =
  'mongodb+srv://admin:Password01%21@cluster0.pmd5z.mongodb.net/lma?retryWrites=true&w=majority';

//将我们的后端代码与数据库连接起来
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

//检查与数据库的连接是否成功
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//（可选）仅用于记录和
// bodyParser，将请求体解析为可读的json格式
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//这是我们的get方法
//此方法获取数据库中的所有可用数据
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });    
    return res.json({ success: true, data: data });
  });
});

//这是我们的更新方法
//此方法会覆盖数据库中的现有数据
router.post('/updateData', (req, res) => {
 //todo
});

//这是我们的删除方法
//此方法删除数据库中的现有数据
router.delete('/deleteData', (req, res) => {
//todo:
});

//这是我们的创造方法
//此方法在我们的数据库中添加新数据
router.post('/putData', (req, res) => {
//todo:
});

//为我们的http请求添加 /api
app.use('/api', router);

//将我们的后端发送到端口
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));