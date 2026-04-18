# Implementación de Schema JSON-LD

## Archivos Entregados

```
schema.json                    ← Schema completo (referencia)
index-seo-optimizado.html      ← HTML con Schema ya implementado inline
```

---

## Opción 1: Schema Inline (Recomendado)

Insertar directamente en el `<head>` del HTML antes del cierre `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.minenerlexconsulting.com/#organization",
      "name": "MinEnerLex Consulting SAS",
      "url": "https://www.minenerlexconsulting.com/",
      "logo": "https://www.minenerlexconsulting.com/logo.png",
      "description": "Consultores internacionales en compra de producción minera y asesoría jurídica minera. Más de 10 años de experiencia.",
      "foundingDate": "2015",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+57-314-880-8015",
        "contactType": "sales",
        "availableLanguage": ["Spanish", "English"],
        "areaServed": ["CO", "PE", "BO", "EC", "VE", "GH", "BF"]
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.minenerlexconsulting.com/compra-oro/#webpage",
      "url": "https://www.minenerlexconsulting.com/compra-oro/",
      "name": "Venta de Oro Directo de Mina | Precio Internacional al Día | MinEnerLex",
      "description": "Pagamos precio internacional por doré de mina, lingotes y polvo de oro. Más de 200 operaciones cerradas con mineros artesanales.",
      "inLanguage": "es"
    },
    {
      "@type": "LocalBusiness",
      "name": "MinEnerLex Consulting SAS",
      "image": "https://www.minenerlexconsulting.com/office.jpg",
      "telephone": "+57-314-880-8015",
      "email": "cotizaciones@minenerlexconsulting.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Carrera 4 N. 6A - 161, Bocagrande",
        "addressLocality": "Cartagena de Indias",
        "addressRegion": "Bolívar",
        "postalCode": "130001",
        "addressCountry": "CO"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "10.3910",
        "longitude": "-75.5384"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "200",
        "bestRating": "5"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Qué papeles necesito para vender mi producción?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Depende de su ubicación, pero generalmente pedimos: certificado de origen minero, análisis de laboratorio si lo tiene, y su documento de identidad. Si le falta algo, le ayudamos a gestionarlo."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo calculan el precio que me van a pagar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tomamos el precio internacional del día (cotización LBMA), multiplicamos por los gramos finos de su material según el análisis de pureza."
          }
        }
      ]
    }
  ]
}
</script>
```

---

## Opción 2: Archivo Externo (JSON)

Para cargar desde archivo `.json` separado (solo si el CMS lo soporta):

```html
<link rel="alternate" type="application/ld+json" href="schema.json" />
```

**Nota**: WordPress y la mayoría de CMS funcionan mejor con schema inline.

---

## Rich Snippets Esperados

### 1. Google Knowledge Panel (LocalBusiness)
```
┌─────────────────────────────┐
│  MinEnerLex Consulting      │
│  ⭐⭐⭐⭐⭐ 4.8 (200 reseñas) │
│  📍 Cartagena, Colombia      │
│  📞 +57 314 880 8015         │
│  🕐 Abierto ahora            │
└─────────────────────────────┘
```

### 2. FAQ Rich Snippet
```
┌────────────────────────────────┐
│ ¿Qué papeles necesito...?      │
│ ▼                              │
│ Depende de su ubicación...     │
│                                │
│ ¿Cómo calculan el precio...?   │
│ ▶                              │
└────────────────────────────────┘
```

### 3. Breadcrumb
```
Inicio > Compra de Oro
```

### 4. Review Stars (SERP)
```
Venta de Oro Directo de Mina...
⭐⭐⭐⭐⭐ 4.8 - 200 opiniones
```

---

## Validación

### Herramientas Oficiales de Google

1. **Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/
3. **Google Search Console** → Enhancements

### Validación Manual

Pegar el HTML completo (con el script) en:
- https://validator.schema.org/
- Debe mostrar: "0 errors, 0 warnings"

---

## Datos Requeridos para Completar

Antes de subir a producción, actualizar estos campos:

| Campo | Ubicación | Valor Actual | Acción |
|-------|-----------|--------------|--------|
| logo | Organization | `logo.png` | Subir imagen real |
| image | LocalBusiness | `office.jpg` | Subir foto oficina |
| NIT | Footer | `[NIT]` | Reemplazar con número real |
| Latitude | LocalBusiness | `10.3910` | Verificar coordenadas exactas |
| Longitude | LocalBusiness | `-75.5384` | Verificar coordenadas exactas |
| foundingDate | Organization | `2015` | Confirmar año real |
| reviewCount | AggregateRating | `200` | Actualizar con número real |

---

## Implementación en WordPress/Elementor

### Método 1: Plugin (Recomendado)
Instalar **"Schema Pro"** o **"Rank Math"**:
1. Configurar Organization schema global
2. Configurar LocalBusiness schema para esta página
3. Agregar FAQ schema manualmente

### Método 2: Función PHP (functions.php)
```php
add_action('wp_head', function() {
    if (is_page('compra-oro')) {
        ?>
        <script type="application/ld+json">
        {
          // Schema aquí
        }
        </script>
        <?php
    }
});
```

### Método 3: Elementor HTML Widget
1. Arrastrar widget "HTML" al header
2. Pegar el script completo
3. Configurar "Display Conditions" → Solo en página /compra-oro/

---

## Verificación Post-Implementación

Checklist:
- [ ] Validar en Schema.org Validator (0 errores)
- [ ] Validar en Google Rich Results Test
- [ ] Ver que aparezca en código fuente (Ctrl+U)
- [ ] Confirmar que no hay duplicados
- [ ] Esperar 7-14 días para indexación en Google

---

## Notas Importantes

1. **No usar schema duplicado**: Si ya tienes plugin SEO, desactivar su schema antes de añadir este
2. **URLs absolutas**: Todas las URLs deben ser completas (https://...)
3. **Imágenes**: Recomendado 1200x630 para OG, 512x512 para logo
4. **Actualización**: Actualizar reviewCount periódicamente
