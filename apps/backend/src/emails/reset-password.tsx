import React from 'react'

const ResetPassword = ({ url, token }: { url: string; token: string }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <a href={`${url}?token=${token}`}>Click here to reset your password</a>
      </body>
    </html>
  )
}

export default ResetPassword
