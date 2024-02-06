import { cmsSections } from "../../components/cmsSections"
import { getCMSContent } from "./cmsProvider"

export function CMSSectionRender({pageName}){
  const sections = getCMSContent(`${pageName}.pageContent[0].section`)

  return sections.map((sectionProps)=>{
    const Component = cmsSections[sectionProps.componentName];
    const IsVisible = sectionProps.visible === true || sectionProps.visible === undefined;

    if(!Component) return null
    if(!IsVisible) return null;
    return (
        <Component key={sectionProps.id} {...sectionProps}/>
    )
  })
}
