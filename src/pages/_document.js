import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{background: 'linear-gradient(#262626, #000000)', 'font-family': 'gotham-rounded-light'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
