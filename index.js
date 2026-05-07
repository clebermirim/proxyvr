const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

export default function (req, res) {
  // Tente bater direto na porta 8443 via HTTP 
  // (ignore o redirecionamento interno da VPS por um momento)
  const target = 'http://143.14.244.242:8443'; 

  proxy.web(req, res, { 
    target: target,
    changeOrigin: true,
    secure: false, // Ignora erros de SSL caso existam
    headers: {
        'Host': '143.14.244.242'
    }
  }, (err) => {
    res.status(502).send('Erro: ' + err.message);
  });
}
