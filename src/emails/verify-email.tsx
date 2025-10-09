import React from 'react';

const VerifyEmail = ({ url, token }: { url: string; token: string }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <a href={url}>Click here to verify your email</a>
      </body>
    </html>
  );
};

export default VerifyEmail;
