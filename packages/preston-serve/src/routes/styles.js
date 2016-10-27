var app			= base.require('server');
var controller	= require('preston-core/src/controllers/styles');

app.get('/api/1.0/styles', controller.list);
app.get('/api/1.0/styles/:style', controller.get);
app.get('/api/1.0/styles/:style/:element', controller.getElement);
