export const navbarData=[
    {
      name: 'Home',
      icon: 'fa fa-home',
      router: ['/']
    },
    {
      name: 'Clientes',
      icon: 'fa fa-users',
      router: ['/', 'clientes']
    },
    {
      name: 'Productos',
      icon: 'fal fa-box-open',
      router: ['/', 'productos']
      //query: { hola: 'mundo' } PASANDO PARAMTROS A LA URL 
    },
    {
      name: 'Crear Cotización',
      icon: 'fa fa-file',
      router: ['/','crear-cotizacion']
    },
    {
      name: 'Ver Cotizaciones',
      icon: 'fa fa-th',
      router: ['/','ver-cotizaciones']
    }
  ]