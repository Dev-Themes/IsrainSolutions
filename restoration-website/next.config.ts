import type {NextConfig} from 'next';
const isDev = process.env.NODE_ENV === 'development';
const config:NextConfig={
  poweredByHeader:false,
  compress:true,
  images:{formats:['image/avif','image/webp']},
  async rewrites(){return [{source:'/_next/static/css/app/layout.css',destination:'/fallback.css'}]},
  async headers(){
    const scriptSrc = "'self' 'unsafe-inline' 'unsafe-eval'";
    return [{
      source:'/(.*)',
      headers:[
        {key:'X-Content-Type-Options',value:'nosniff'},
        {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
        {key:'Strict-Transport-Security',value:'max-age=31536000; includeSubDomains'},
        {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
        {key:'Content-Security-Policy',value:`default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`}
      ]
    }];
  }
};
export default config;
