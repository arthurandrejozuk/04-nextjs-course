import Head from "next/head";
import { Footer } from "../../components/commons/Footer";
import { Menu } from "../../components/commons/Menu";
import { Box, Text, theme } from "../../theme/components";
import { cmsService } from "../../infra/cms/cmsService";
import { renderNodeRule, StructuredText } from "react-datocms";
import { isHeading } from "datocms-structured-text-utils";
import CMSProvider, { getCMSContent } from "../../infra/cms/cmsProvider";
import { pageHOC } from "../../components/wrappers/pageHOC";

export async function getStaticPaths() {

  const pathsQuery = `
  query($first: IntType, $skip: IntType ){
    allContentFaqQuestions(first: $first, skip: $skip) {
      id
      title
    }
  }
  `;

  const { data } = await cmsService({
    query: pathsQuery,
    variables: {
      "first": 100,
      "skip": 0
    }
  });

  const paths = data.allContentFaqQuestions;

  const pages = paths.map(({id}) => {
    return{
      params: { id },
    }
  })

  
  return {
    paths: pages,
    fallback: false,
  };
}

export async function getStaticProps({ params, preview }) {
  const { id } = params;

  //https://graphql.datocms.com/

  const contentQuery = `
      query ($id: ItemId){
        contentFaqQuestion(filter:{
          id: {
            eq: $id
          }
        } ) {
          title
          content {
            value
          }
        }
      }
  `;
  const { data } = await cmsService({
    query: contentQuery,
    variables: {
      "id": id,
    },
    preview,
  });
  console.log(`Dados do CMS:`, data);

  console.log(data);

  return {
    props: {
      cmsContent: data,
      id: id,
      title: data.contentFaqQuestion.title,
      content: data.contentFaqQuestion.content,
    },
  };
}
//
function FAQQuestionScreen({ cmsContent, id }) {
  return (
    <>
      <Head>
        <title>FAQ - Perguntas e respostas {id}</title>
      </Head>

      <Menu />

      <Box
        tag="main"
        styleSheet={{
          flex: 1,
          backgroundColor: theme.colors.neutral.x050,
          paddingTop: theme.space.x20,
          paddingHorizontal: theme.space.x4,
        }}
      >
        <Box
          styleSheet={{
            flexDirection: "column",
            width: "100%",
            maxWidth: theme.space.xcontainer_lg,
            marginHorizontal: "auto",
          }}
        >
          <Text tag="h1" variant="heading1">
            {cmsContent.contentFaqQuestion.title}
          </Text>
          <StructuredText
            data={cmsContent.contentFaqQuestion.content}
            customNodeRules={[
              renderNodeRule(isHeading, ({ node, children, key }) => {
                const tag = `h${node.level}`;
                const variant = `heading${node.level}`;
                return (
                  <Text tag={tag} variant={variant} key={key}>
                    {children}
                  </Text>
                );
              }),
            ]}
          />
          {/* <Box dangerouslySetInnerHTML={{ __html: content }} /> */}
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default pageHOC(FAQQuestionScreen);
