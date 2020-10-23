import nodemailer, { Transporter } from 'nodemailer';
import mailTemplateProvider from '../implementations/EtherealMailProvider';

interface ITemplateMail {
  to: {
    name: string;
    email: string;
  }
  from?: {
    name: string;
    email: string;
  };
  subject: string;
  templateData: {
    file: string;
    variables: {
      [key: string]: string | number;
    }
  };
}

class EtherealMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false
        }
        
      })
      this.client = transporter
      
    }
  
  public async sendMail({
    to,
    from,
    subject,
    templateData
  }: ITemplateMail): Promise<void> {
   try {
    await this.client.sendMail({
      from: {
        name: from?.name || 'Happy',
        address: from?.email || 'happy@hotmail.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplateProvider.parse(templateData),
    });
    
   } catch (error) {
     console.log('error', error)
   }
  }
}
export default new EtherealMailProvider();