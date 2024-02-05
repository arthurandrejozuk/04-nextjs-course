export default async function handler(req,res){

  const previousPage = req.headers.referer;

  if(req.preview){
    res.clearPreviewData();
    res.writeHead(307,{location: previousPage})
   return res.end()
  
  }

  const password = `senhasegura`;

  if(req.query.password !== password){
   return res.status(401).json({message: `Invalid password`})
  }

  res.setPreviewData({});
  res.writeHead(307,{location: previousPage})
  res.end()

}
