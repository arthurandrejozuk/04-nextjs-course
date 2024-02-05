const TOKEN = `ca428275288cf19141383ed8740617`

const globalQuery = `
query{
  globalFooter{
    description
  }
}
`
const BASE_ENDPOINT = `https://graphql.datocms.com/`;
const PREVIEW_ENDPOINT = `https://graphql.datocms.com/preview`;

export async function cmsService({ query, preview }) {

  const ENDPOINT = preview ? PREVIEW_ENDPOINT : BASE_ENDPOINT;

  try{
    const pageContentRes = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + TOKEN,
      },
      body: JSON.stringify({
        query,
      }),
    }).then(async (respostaDoServer) => {
      const body = await respostaDoServer.json();
      console.log(body);
      if(!body.errors) return body;
    });
  
    const globalPageContentRes = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + TOKEN,
      },
      body: JSON.stringify({
        query: globalQuery,
      }),
    }).then(async (respostaDoServer) => {
      const body = await respostaDoServer.json();
      console.log(body);
      if(!body.errors) return body;
    });
    return {
      data: {
        ...pageContentRes.data,
        globalPageContentRes: {
          ...globalPageContentRes.data
        }
      }
    }
   
  } catch(err){
    throw new Error(JSON.stringify(body));
  }

  
}



