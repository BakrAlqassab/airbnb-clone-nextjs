import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import Image from "next/image";

export interface TextEditorProps {
  content: any;
  fontSize?: string;
}

const TextEditor = ({ content, fontSize = "m" }: TextEditorProps) => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { url } = node.data.target.fields.file;
        const { title } = node.data.target.fields;
        return <Image src={`https:${url}`} alt={title} />;
      },
      [INLINES.EMBEDDED_ENTRY]: (node: any) => {
        const contentType = node.data.target.sys.contentType.sys.id;

        switch (contentType) {
          case "contentImage": {
            const imageUrl = node.data.target.fields.image.fields.file.url;
            const altText = node.data.target.fields.image.fields.title;
            return <Image src={`https:${imageUrl}`} alt={altText} />;
          }
          case "link": {
            return (
              <a href={node.data.target.fields.slug}>
                {node.data.target.fields.entryName}
              </a>
            );
          }
          default:
            return null;
        }
      },
      [INLINES.ENTRY_HYPERLINK]: (node: any) => {
        return (
          <a href={`/${node.data.target.fields.slug}`}>
            {node.content[0]?.value}
          </a>
        );
      },
    },
  };

  return (
    <div className={`text-editor my-4 block ${fontSize}`}>
      {documentToReactComponents(
        content.fields.accordionContent || content.fields.content,
        options,
      )}
    </div>
  );
};

export default TextEditor;
