import CMSProvider from "../../infra/cms/cmsProvider";

export function pageHOC(Componente){
  return function Wrapper(props){
    return(
      <CMSProvider cmsContent={props.cmsContent}>
        <Componente {...props}/>
      </CMSProvider>
    )
  }

}
