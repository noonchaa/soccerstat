import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html lang='id' className='max-w-screen-2xl mx-auto' >
        <Head>
        </Head>
        <body className='m-0 antialiased bg-gray-900 text-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument