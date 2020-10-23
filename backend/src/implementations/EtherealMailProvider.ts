import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateMail {
  file: string;
  variables: {
    [key: string]: string | number;
  }
}

class EtherealMailProvider {
  public async parse({
    file,
    variables
  }: ITemplateMail): Promise<string> {

    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default new EtherealMailProvider();