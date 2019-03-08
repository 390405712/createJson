import index from '../../config'

const router = require('koa-router')()
const Monk = require('monk');
const db=new Monk(index.database);
const tableData = db.get('tableData');

router.post('/delTableData', async (ctx, next) => {
  await tableData.remove(ctx.request.body)
  ctx.body = {
    status:200,
    msg:'success',
    data: '删除成功'
  }
})

router.post('/updateTableData', async (ctx, next) => {
  await tableData.update(ctx.request.body._id,ctx.request.body)
  ctx.body = {
    status:200,
    msg:'success',
    data: '修改成功'
  }
})

router.post('/addTableData', async (ctx, next) => {
  await tableData.insert(ctx.request.body);
  ctx.body = {
    status:200,
    msg:'success',
    data: '添加成功'
  }
})

router.post('/getTableData', async (ctx, next) => {
  let total = await tableData.count();
  let reqParam= ctx.request.body;
  let page = Number(reqParam.page);
  let size = Number(reqParam.size);
  let options = { "limit": size,"skip": (page-1)*size};
  let data = await tableData.find({},options,function(err,docs){
    if (err) {console.log(err);return;}
  });
  ctx.body = {
    status:200,
    msg:'success',
    data: data,
    total:total
  }
})

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/postTest', async (ctx, next) => {
  ctx.body = {
    status:200,
    msg:'success',
    data: 'post成功'
  }
})
router.get('/getTest', async (ctx, next) => {
  ctx.body = {
    status:200,
    msg:'success',
    data: 'get成功'
  }
})

module.exports = router
