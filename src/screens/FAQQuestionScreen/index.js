import Head from "next/head";
import { Footer } from "../../components/commons/Footer";
import { Menu } from "../../components/commons/Menu";
import { Box, Text, theme } from "../../theme/components";
import { cmsService } from "../../infra/cms/cmsService";
import { renderNodeRule, StructuredText } from 'react-datocms';
import { isHeading } from 'datocms-structured-text-utils';
import CMSProvider, { getCMSContent } from "../../infra/cms/cmsProvider";
import { pageHOC } from "../../components/wrappers/pageHOC";


export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "f138c88d" } }, { params: { id: "h138c88d" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params, preview }) {
  const { id } = params;

  //https://graphql.datocms.com/

  const contentQuery = `
      {
        contentFaqQuestion {
          title
          content {
            value
          }
        }
      }
  `;
  const { data } = await cmsService({
    query: contentQuery,
    preview
  });
  console.log(`Dados do CMS:`, data);

  console.log(data)

  return {
    props: {
      cmsContent: data,
      id,
      title: data.contentFaqQuestion.title,
      content: data.contentFaqQuestion.content,
    },
  };
}
// 
 function FAQQuestionScreen({ cmsContent }) {
  return (
    <>
      <Head>
        <title>FAQ - Perguntas e respostas</title>
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
                )
              })
            ]}
          />
          {/* <Box dangerouslySetInnerHTML={{ __html: content }} /> */}
        </Box>
      </Box>
      <Footer/>
    </>
  );
}

export default pageHOC(FAQQuestionScreen)
