const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

export default function (req, res) {
  // Alvo: Teu IP na porta 443 (que a tua VPS redireciona para a 8443)
  const target = 'http://143.14.244.242:443'; 

  proxy.web(req, res, { 
    target: target,
    changeOrigin: true,
    autoRewrite: true,
    headers: {
        'Host': '143.14.244.242'
    }
  }, (err) => {
    // Caso a VPS não responda ou a porta esteja fechada
    res.status(502).send('VPS Offline ou erro de conexão na porta 443.');
  });

}
