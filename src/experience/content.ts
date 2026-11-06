import type { Locale } from '../i18n/types'

export const achievementIds = ['deployment', 'queries', 'integrations', 'requirements', 'stack'] as const
export type AchievementId = typeof achievementIds[number]
type AchievementText = { title: string; paragraphs: readonly string[] }
type CareerText = { company: string; role: string; period: string; responsibilities: readonly string[] }
export type ExperienceContent = {
  achievements: string; career: string; download: string; showOriginal: string
  introduction: string
  items: Record<AchievementId, AchievementText>
  jobs: readonly CareerText[]
  photos: Record<'rack' | 'graphicSystem' | 'monitorApp' | 'traceability' | 'site' | 'diagram', string>
}

export const experienceContent: Record<Locale, ExperienceContent> = {
  es: {
    achievements: 'Logros', career: 'Carrera', download: 'Descargar CV', showOriginal: 'Mostrar la fotografía original durante un segundo',
    introduction: 'Como ingeniero en sistemas me mantengo flexible para la solución de problemas mediante la implementación de herramientas digitales y del poder que ofrecen las ciencias computacionales. Soy el puente entre un problema y su solución computacional.',
    items: {
      deployment: { title: 'Despliegue de servicios', paragraphs: [
        'Servicios en la nube, plataformas como servicio y servidores on premise. Como ingeniero he implementado tecnologías y servicios para facilitar el acceso de productos a usuarios, en entornos públicos y privados.',
        'En YNE Automatización implementé Gitea en un servidor on premise como plataforma para alojar los repositorios de los proyectos realizados, además de configurar despliegues automatizados. Esto agilizó el flujo de desarrollo de proyectos y permitió al equipo de ingeniería llevar un registro de las aplicaciones realizadas.',
      ] },
      queries: { title: 'Optimización de consultas', paragraphs: [
        'Procedimientos almacenados, índices parciales, tablas temporales, JOINS y vistas. Estas son algunas de las técnicas que he implementado para la optimización de consultas en bases de datos.',
        'En YNE Automatización y en Pakke México optimicé consultas de lectura en bases de datos MySQL y SQL Server utilizando diferentes técnicas, como resolver el problema N+1, índices y tablas temporales, reduciendo los tiempos de consulta hasta en 5 segundos e impactando directamente en la experiencia del usuario en el sistema.',
      ] },
      integrations: { title: 'Conexión con servicios externos', paragraphs: [
        'Uno de los problemas más recurrentes es poder obtener información de fuentes externas, sincronizar datos con otras áreas o hacer cálculos con agentes especializados. En mis distintos trabajos he conectado servicios con desarrollos a medida.',
        'En todos mis trabajos he utilizado servicios externos para aumentar el valor percibido por los usuarios de los productos. He integrado las API de Meta, Twilio y HubSpot, así como API para conversión de monedas y validación de identidad del usuario.',
      ] },
      requirements: { title: 'Levantamiento de requerimientos', paragraphs: [
        'Una de mis responsabilidades como ingeniero es llevar una solución desde su concepción hasta su puesta en producción: entender la naturaleza del problema, qué quiere el usuario y comunicar las opciones, ventajas y desventajas de la solución seleccionada.',
        'En YNE Automatización tomé los requerimientos de clientes finales, traduciendo mis soluciones al área de dominio del cliente, con la finalidad de reducir la fricción entre áreas de dominio distintas.',
      ] },
      stack: { title: 'Mi stack', paragraphs: [] },
    },
    jobs: [
      { company: 'Algorithmics Metepec', role: 'Desarrollador Full Stack', period: 'Abr. 2022 – dic. 2023', responsibilities: ['Desarrollé una plataforma de gestión académica para la programación y administración de clases con React y Firebase.', 'Implementé autenticación, Firestore, reglas de acceso y notificaciones por WhatsApp mediante Twilio.', 'Configuré integración y despliegue continuo con Netlify.'] },
      { company: 'Pakke México', role: 'Desarrollador Backend', period: 'May. 2024 – nov. 2024', responsibilities: ['Diseñé y desplegué servicios logísticos y API REST con AWS Lambda, NestJS y LoopBack.', 'Integré HubSpot CRM y desarrollé seguimiento de envíos en tiempo real con Angular y Google Maps API.'] },
      { company: 'YNE Automatización', role: 'Full Stack Developer', period: 'Nov. 2024 – actualidad', responsibilities: ['Diseñé y desarrollé una plataforma interna de recursos humanos y proyectos con Next.js, TypeScript y SQL Server.', 'Construí servicios C# y API en Python para conectar maquinaria y dispositivos industriales con sistemas de gestión.', 'Lideré el desarrollo y mantenimiento de sistemas de trazabilidad y ERP con .NET, PHP, PostgreSQL y SQL Server.'] },
    ],
    photos: { rack: 'Rack de servidores', graphicSystem: 'Sistema gráfico', monitorApp: 'Aplicación de monitoreo', traceability: 'Sistema de trazabilidad', site: 'Sitio de trabajo', diagram: 'Diagrama de sistema' },
  },
  en: {
    achievements: 'Achievements', career: 'Career', download: 'Download CV', showOriginal: 'Show the original photograph for one second',
    introduction: 'As a systems engineer, I stay flexible in solving problems through digital tools and the power of computer science. I bridge the gap between a problem and its computational solution.',
    items: {
      deployment: { title: 'Service deployment', paragraphs: [
        'Cloud services, platforms as a service and on-premise servers. As an engineer, I have implemented technologies and services that make products accessible to users in public and private environments.',
        'At YNE Automatización, I implemented Gitea on an on-premise server to host project repositories and configured automated deployments. This streamlined project development and allowed the engineering team to keep track of its applications.',
      ] },
      queries: { title: 'Query optimization', paragraphs: [
        'Stored procedures, partial indexes, temporary tables, JOINs and views are some of the techniques I have used to optimize database queries.',
        'At YNE Automatización and Pakke México, I optimized read queries in MySQL and SQL Server using techniques such as resolving the N+1 problem, indexes and temporary tables. This reduced query times by up to 5 seconds, directly improving the user experience.',
      ] },
      integrations: { title: 'External service integration', paragraphs: [
        'Obtaining information from external sources, synchronizing data across teams and performing calculations with specialized agents are recurring challenges. In my different roles, I have connected services to custom solutions.',
        'In every role I have used external services to increase the value users perceive in products. I have integrated Meta, Twilio and HubSpot APIs, as well as APIs for currency conversion and user identity verification.',
      ] },
      requirements: { title: 'Requirements gathering', paragraphs: [
        'One of my responsibilities as an engineer is to take a solution from conception to production: understand the problem and the user’s needs, and communicate the options, advantages and disadvantages of the selected solution.',
        'At YNE Automatización, I gathered requirements from end customers and translated my solutions into their domain, reducing friction between different areas of expertise.',
      ] },
      stack: { title: 'My stack', paragraphs: [] },
    },
    jobs: [
      { company: 'Algorithmics Metepec', role: 'Full Stack Developer', period: 'Apr 2022 – Dec 2023', responsibilities: ['Built an academic management platform for class scheduling and administration with React and Firebase.', 'Implemented authentication, Firestore, access rules and WhatsApp notifications via Twilio.', 'Configured continuous integration and deployment with Netlify.'] },
      { company: 'Pakke México', role: 'Backend Developer', period: 'May 2024 – Nov 2024', responsibilities: ['Designed and deployed logistics services and REST APIs with AWS Lambda, NestJS and LoopBack.', 'Integrated HubSpot CRM and built real-time shipment tracking with Angular and the Google Maps API.'] },
      { company: 'YNE Automatización', role: 'Full Stack Developer', period: 'Nov 2024 – Present', responsibilities: ['Designed and developed an internal HR and project management platform with Next.js, TypeScript and SQL Server.', 'Built C# services and Python APIs connecting industrial machinery and devices to management systems.', 'Led development and maintenance of traceability and ERP systems using .NET, PHP, PostgreSQL and SQL Server.'] },
    ],
    photos: { rack: 'Server rack', graphicSystem: 'Graphic system', monitorApp: 'Monitoring application', traceability: 'Traceability system', site: 'Work site', diagram: 'System diagram' },
  },
}
