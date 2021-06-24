import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html lang='id' className='text-gray-900 leading-tight'>
        <Head>
        </Head>
        <body className='m-0 antialiased min-h-screen bg-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument