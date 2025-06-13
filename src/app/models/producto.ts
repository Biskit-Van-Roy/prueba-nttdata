export interface IProducto {
  id?: string;
  name: string;
  description: string;
  date_release: string;
  date_revision: string;
  logo: string;
}

export class Producto implements IProducto {
  id?: string;
  name: string;
  description: string;
  date_release: string;
  date_revision: string;
  logo: string;

  constructor(data: IProducto) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.date_release = data.date_release;
    this.date_revision = data.date_revision;
    this.logo = data.logo;
  }
}
