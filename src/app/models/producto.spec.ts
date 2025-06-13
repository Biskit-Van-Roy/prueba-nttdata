import { Producto } from './producto';

describe('Producto', () => {
  it('should create an instance', () => {
    const datos = {
      name: 'Test',
      description: 'Desc',
      date_release: '2025-06-13',
      date_revision: '2025-06-13',
      logo: 'logo.png'
    };
    expect(new Producto(datos)).toBeTruthy();
  });
});
