const router = require('koa-router')()
const Monk = require('monk');
const db=new Monk('localhost:27017/nodejsDB');//链接到库
const tableData = db.get('tableData');//表
router.post('/delTableData', async (ctx, next) => {
  await tableData.remove(ctx.request.body).then(function (res) {
    ctx.body = {
      status:200,
      msg:'success',
      data: '删除成功'
    }
  });
  next();
})

router.post('/updateTableData', async (ctx, next) => {
  console.log(ctx.request.body);
  await tableData.update(ctx.request.body._id,ctx.request.body).then(function (res) {
    ctx.body = {
      status:200,
      msg:'success',
      data: '修改成功'
    }
  });
  next();
})

router.post('/addTableData', async (ctx, next) => {
  await tableData.insert(ctx.request.body).then(function (res) {
    console.log(res);
    ctx.body = {
      status:200,
      msg:'success',
      data: '添加成功'
    }
  });
  next();
})

router.post('/getTableData', async (ctx, next) => {
  let total = await tableData.count();//表总记录数
  //koa-bodyparser解析前端参数
  let reqParam= ctx.request.body;//
  let page = Number(reqParam.page);//当前第几页
  let size = Number(reqParam.size);//每页显示的记录条数
  //显示符合前端分页请求的列表查询
  let options = { "limit": size,"skip": (page-1)*size};
  let data = await tableData.find({},options,function(err,docs){
    if (err) {console.log(err);return;}
  });
  //返回给前端
  ctx.body = {
    status:200,
    msg:'success',
    data: data,
    total:total
  }
  next();
})

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/postTest', async (ctx, next) => {
  let postData = ctx.request.body
  console.log(postData);
  ctx.body = {
    status:200,
    msg:'success',
    data: 'post成功'
  }
  next();
})
router.get('/getTest', async (ctx, next) => {
  ctx.body = {
    status:200,
    msg:'success',
    data: 'get成功'
  }
  next();
})

module.exports = router
