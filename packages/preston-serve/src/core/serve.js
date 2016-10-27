var serve		= require('koa-static');
var app			= base.require('server');
var publicDir	= base.path('client');
var buildDir	= global.buildDir;

app.use(serve(publicDir));
app.use(serve(buildDir));
