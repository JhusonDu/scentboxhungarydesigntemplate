

# "Rolunk" Link - Scroll to Top Fix

## Problema

A Footer "Ceg" oszlopaban a "Rolunk" link a `/rolunk` oldalra navigal, de nem gorget az oldal tetejere. Ez azert van, mert a React Router alapertelmezetten megorzi a scroll poziciot navigaciokor.

## Megoldas

A `src/components/Footer.tsx` fajlban a `companyLinks` tombben levo linkek `Link` komponensei nem gorgetnek felre. A legegyszerubb megoldas: a `Link` komponensek `onClick` esemenyeben `window.scrollTo(0, 0)` hivast adunk hozza.

### Modositott fajl: `src/components/Footer.tsx`

A `Link` komponenshez (167-172. sor korul) hozzaadunk egy `onClick` handlert:

```tsx
<Link
  to={link.href}
  onClick={() => window.scrollTo(0, 0)}
  className="text-muted-foreground hover:text-primary transition-colors text-sm"
>
  {link.label}
</Link>
```

Ez az osszes "Ceg" oszlop linkjere vonatkozik, igy barmelyikre kattintva az oldal tetejere gorget. Mas fajl nem modosul.

