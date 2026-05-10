import katex from 'katex';

interface Props {
  children: string;
  display?: boolean;
}

export default function KatexEq({ children, display = false }: Props) {
  const html = katex.renderToString(children, {
    displayMode: display,
    throwOnError: false,
  });
  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className={display ? 'block my-3 overflow-x-auto' : 'inline'}
    />
  );
}
