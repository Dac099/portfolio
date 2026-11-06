# Portafolio de David Ceja Zapata

En este sitio presento mi perfil profesional como ingeniero en sistemas. Reúno mi presentación, experiencia, proyectos y medios de contacto en una página para que reclutadores, clientes y otros profesionales conozcan mi trabajo y las tecnologías que utilizo.

## Diseño y estilo

Diseñé la identidad visual con una estética inspirada en terminales y arte ASCII, combinada con una interfaz sencilla que prioriza la lectura:

- **Tipografía monoespaciada y arte ASCII:** uso títulos y elementos gráficos de caracteres para reforzar la temática técnica y dar personalidad a cada sección.
- **Paleta adaptable:** definí temas oscuro y claro con un color de acento magenta. Adapto el fondo, el texto y los elementos secundarios para conservar el contraste en ambos modos.
- **Fondos animados:** doy a cada sección un tratamiento propio con efectos ASCII, patrones tipo Perlin y gráficos binarios. Los efectos acompañan el contenido sin reemplazarlo.
- **Diseño adaptable:** ajusto la composición y el tamaño del arte a distintos anchos de pantalla.
- **Movimiento considerado:** hago que las transiciones respeten la preferencia del sistema por reducir el movimiento, de modo que la navegación y el contenido sigan disponibles sin animaciones.

## Contenido e interacción

Organicé el contenido en tres secciones:

1. **Inicio:** presento mi nombre, perfil profesional y enlaces de contacto y navegación.
2. **Experiencia:** comparto mi trayectoria profesional.
3. **Proyectos:** muestro mis proyectos en un selector con imágenes, descripciones, tecnologías y enlaces a los sitios o repositorios correspondientes.

Ofrezco el contenido en español e inglés. Permito seleccionar el idioma manualmente o detectarlo desde la configuración del navegador. También permito elegir el tema oscuro, claro o del sistema, y guardo esas preferencias en el almacenamiento local del navegador.

## Aspectos técnicos

- **React 19 y TypeScript:** construí la interfaz con componentes funcionales y tipado para la interfaz y el contenido.
- **Vite:** utilizo Vite como servidor de desarrollo y herramienta de compilación.
- **CSS Modules y variables CSS:** encapsulo los estilos por componente y comparto variables para colores y tipografía.
- **Canvas y hooks propios:** implementé fondos gráficos animados con ciclos de dibujo y efectos específicos para las secciones.
- **Contenido separado de la presentación:** organizo las traducciones, los datos de proyectos y los títulos ASCII en módulos dedicados.
- **Accesibilidad y adaptación:** incorporé controles nativos, etiquetas para regiones interactivas, navegación por teclado en el selector de proyectos y soporte para `prefers-reduced-motion`.
- **ESLint:** utilizo ESLint para analizar estáticamente el código TypeScript y React.

## Desarrollo

Utilizo [Bun](https://bun.sh/) para instalar dependencias y ejecutar los scripts:

```bash
bun install
bun run dev
```

Para comprobar los tipos y generar mi versión de producción, ejecuto:

```bash
bun run build
```

Para ejecutar ESLint, ejecuto:

```bash
bun run lint
```

Genero la salida de producción en `dist/` y, después de compilar, puedo servirla localmente con `bun run preview`.
