const router = require('express').Router();
const {decode, sign, verifyUser, EXPIRATION} = require('../../data/apiTools');

router
  .get('/refresh', async (req, res) => {
    if(!req.headers.authorization) return res.send("UNAUTHORIZED");
    const tokenIn = req.headers.authorization.split('Bearer ').reverse()[0];
    let user = decode(tokenIn);
      
    //Check User
    // TestForStale
    const isStale = Date.now() > user.exp;
    const status = await verifyUser({id: user.sub, password: user.hash});
    if(status === "Not Found") return res.send(status);
    const infinite = status.tokenSettings.infinite;
    const secureInactive =  status.tokenSettings.secureInactivity;
    let refresh = true;

    if(infinite && secureInactive && isStale) refresh = false; // require pass
    if(!infinite && isStale) refresh = false; // Log Out

    let newToken, newTokenOpen; 
    if(refresh){
      newTokenOpen = Object.assign({},user);
      newTokenOpen.exp = Date.now() + EXPIRATION;
      newToken = sign(newTokenOpen);
    }
    
    
    res.json({
      status: refresh && newToken ? 'SUCCESS' : "FAILED",
      token: refresh && newToken || undefined ,
      message: !refresh && "UNAUTHORIZED" || undefined,
    });
  });

module.exports = router;