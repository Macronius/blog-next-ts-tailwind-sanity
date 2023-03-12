import Iframe from 'sanity-plugin-iframe-pane';
import type { DefaultDocumentNodeResolver } from 'sanity/desk';

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
  S, // (parameter) S: StructureBuilder
  { schemaType } // (parameter) schemaType: string
) => {
  console.log(S);
  // Only show preview pane on 'post' schema type documents
  switch (schemaType) {
    case 'post':
      return S.document().views([
        S.view.form(), // <- the sanity form as is currently without modification made here

        // the next view
        S.view
          .component(Iframe)
          .options({
            url: `${
              process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
            }/api/preview`,
            // Optional: set the default size
            defaultSize: `desktop`,
            // Optional: Add a reload button, or reload on new document revisions
            reload: {
              button: true, // where default is 'undefined'
            },
            // Optional: pass attributes to the underlying 'iframe' element:
            // see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
            attributes: {},
          })
          .title('Preview'),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
