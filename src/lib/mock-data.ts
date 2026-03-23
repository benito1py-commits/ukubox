import { User, Package, PreAlerta, Oficina, FAQ } from "./types";

export const mockUser: User = {
  codigo: "UKU#50016",
  nombre: "GUILLERMO",
  telefono: "0982208071",
  email: "guillermodab@gmail.com",
  oficina: "OFICINA PRINCIPAL",
  direccion: "ESPAñA 2220 CASI AMERICA",
  direccionUS: {
    nombre: "GUILLERMO UKU#50016",
    address1: "6758 N.W. 72 AV",
    address2: "UKU#50016",
    city: "MIAMI",
    state: "FL",
    zipcode: "33166-3049",
    telefono: "+1 (305) 555-0123",
  },
};

export const mockPackages: Package[] = [
  {
    id: "PKG001",
    tracking: "1Z999AA10123456784",
    descripcion: "iPhone 15 Pro Max",
    tienda: "Amazon",
    peso: 1.2,
    pesoUnit: "lbs",
    precio: 45.5,
    estado: "En Miami",
    fechaIngreso: "2026-03-20",
  },
  {
    id: "PKG002",
    tracking: "9400111899223100001",
    descripcion: "Zapatillas Nike Air Max",
    tienda: "Nike.com",
    peso: 2.1,
    pesoUnit: "lbs",
    precio: 52.0,
    estado: "En Tránsito",
    fechaIngreso: "2026-03-18",
  },
  {
    id: "PKG003",
    tracking: "7196901234567890123",
    descripcion: "Laptop Dell Inspiron 15",
    tienda: "Dell.com",
    peso: 5.8,
    pesoUnit: "lbs",
    precio: 125.0,
    estado: "En Aduana",
    fechaIngreso: "2026-03-15",
  },
  {
    id: "PKG004",
    tracking: "9261290100130266542",
    descripcion: "Auriculares Sony WH-1000XM5",
    tienda: "Best Buy",
    peso: 0.8,
    pesoUnit: "lbs",
    precio: 32.0,
    estado: "Listo para Retiro",
    fechaIngreso: "2026-03-10",
  },
  {
    id: "PKG005",
    tracking: "4201234567890123456",
    descripcion: "Vitaminas y Suplementos",
    tienda: "iHerb",
    peso: 3.2,
    pesoUnit: "lbs",
    precio: 68.0,
    estado: "En Tránsito",
    fechaIngreso: "2026-03-19",
  },
  {
    id: "PKG006",
    tracking: "9400111899223100099",
    descripcion: "Ropa variada (3 prendas)",
    tienda: "Zara USA",
    peso: 1.5,
    pesoUnit: "lbs",
    precio: 40.0,
    estado: "En Miami",
    fechaIngreso: "2026-03-21",
  },
];

export const mockHistory: Package[] = [
  {
    id: "PKG-H001",
    tracking: "1Z999AA10123456001",
    descripcion: "iPad Air M2",
    tienda: "Apple Store",
    peso: 1.4,
    pesoUnit: "lbs",
    precio: 55.0,
    estado: "Entregado",
    fechaIngreso: "2026-02-15",
    fechaEntrega: "2026-03-01",
  },
  {
    id: "PKG-H002",
    tracking: "9400111899223100055",
    descripcion: "Perfume Chanel N°5",
    tienda: "Sephora",
    peso: 0.6,
    pesoUnit: "lbs",
    precio: 28.0,
    estado: "Entregado",
    fechaIngreso: "2026-02-10",
    fechaEntrega: "2026-02-25",
  },
  {
    id: "PKG-H003",
    tracking: "7196901234567890999",
    descripcion: "Monitor Samsung 27\"",
    tienda: "Amazon",
    peso: 12.0,
    pesoUnit: "lbs",
    precio: 180.0,
    estado: "Entregado",
    fechaIngreso: "2026-01-20",
    fechaEntrega: "2026-02-10",
  },
  {
    id: "PKG-H004",
    tracking: "4201234567890123111",
    descripcion: "Libros técnicos (5 unidades)",
    tienda: "Amazon",
    peso: 4.5,
    pesoUnit: "lbs",
    precio: 75.0,
    estado: "Entregado",
    fechaIngreso: "2026-01-05",
    fechaEntrega: "2026-01-22",
  },
];

export const mockPreAlertas: PreAlerta[] = [
  {
    id: "PA001",
    tracking: "1Z999AA10123456999",
    tienda: "Amazon",
    descripcion: "Cargador MacBook Pro USB-C",
    valor: 79.99,
    fecha: "2026-03-22",
  },
  {
    id: "PA002",
    tracking: "9400111899223100777",
    tienda: "eBay",
    descripcion: "Funda para laptop 15 pulgadas",
    valor: 25.0,
    fecha: "2026-03-21",
  },
];

export const mockOficinas: Oficina[] = [
  {
    id: "OF001",
    nombre: "OFICINA PRINCIPAL",
    direccion: "Teniente del Valle casi Itapúa, Asunción",
  },
  {
    id: "OF002",
    nombre: "SUCURSAL CDE",
    direccion: "Av. San Blas esq. Curupayty, Ciudad del Este",
  },
  {
    id: "OF003",
    nombre: "SUCURSAL ENCARNACIÓN",
    direccion: "Av. Irrazábal c/ Tomás R. Pereira, Encarnación",
  },
];

export const mockFAQs: FAQ[] = [
  {
    pregunta: "¿Cómo obtengo mi dirección en Miami?",
    respuesta:
      "Al registrarte en UKUXBOX, recibirás automáticamente una dirección en Miami con tu número de casillero único. Esta dirección la puedes usar en cualquier tienda online de Estados Unidos para recibir tus compras.",
  },
  {
    pregunta: "¿Cuánto tiempo tarda en llegar mi paquete?",
    respuesta:
      "El tiempo de tránsito desde Miami hasta nuestras oficinas en Paraguay es de aproximadamente 7 a 12 días hábiles, dependiendo del tipo de envío y el despacho aduanero.",
  },
  {
    pregunta: "¿Cómo se calcula el costo del envío?",
    respuesta:
      "El costo se calcula por peso en libras. Nuestras tarifas arrancan desde $8 por libra para envíos regulares. Paquetes más pesados pueden tener tarifas especiales. Contactanos para una cotización personalizada.",
  },
  {
    pregunta: "¿Qué es una Pre-Alerta?",
    respuesta:
      "La Pre-Alerta es un aviso que vos enviás cuando comprás algo online. Nos decís el número de tracking, la tienda y el valor declarado, así podemos prepararnos para recibir tu paquete y agilizar el proceso.",
  },
  {
    pregunta: "¿Puedo consolidar varios paquetes?",
    respuesta:
      "Sí, ofrecemos servicio de consolidación. Podés acumular varios paquetes en tu casillero de Miami y enviarlos todos juntos en un solo despacho, ahorrando en costos de envío.",
  },
  {
    pregunta: "¿Qué productos no se pueden enviar?",
    respuesta:
      "No se pueden enviar materiales peligrosos, armas, drogas, alimentos perecederos, animales vivos, ni artículos prohibidos por la legislación paraguaya. Consultá nuestra lista completa de artículos restringidos.",
  },
  {
    pregunta: "¿Cómo puedo pagar?",
    respuesta:
      "Aceptamos pagos en efectivo en nuestras oficinas, transferencias bancarias, y pagos con tarjeta de crédito/débito. También aceptamos pagos por Giros Tigo y Billetera Personal.",
  },
  {
    pregunta: "¿Qué hago si mi paquete llega dañado?",
    respuesta:
      "Si tu paquete llega dañado, por favor reportalo inmediatamente en nuestras oficinas al momento del retiro. Tomaremos fotos y iniciaremos un reclamo. Recomendamos siempre contratar el seguro adicional para compras de alto valor.",
  },
];

export const companyInfo = {
  nombre: "UKUXBOX",
  direccion: "Teniente del Valle casi Itapúa Asunción-Paraguay",
  telefono: "0986733000",
  email: "sac@ukuxbox.com",
  horario: "Lunes a Viernes: 8:00 - 18:00 | Sábados: 8:00 - 12:00",
};
