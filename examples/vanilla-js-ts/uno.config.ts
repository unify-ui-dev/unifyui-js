// uno.config.ts
import {
    defineConfig,
    presetIcons,
    presetUno,
  } from "unocss";
  
  export default defineConfig({
    content: {
      pipeline: {
        include: ["./examples/index.html"],
      },
    },
    presets: [
      presetUno(),
      presetIcons({
        collections: {
          carbon: () =>
            import("@iconify-json/carbon/icons.json").then((i) => i.default),
        },
      }),
    ],
  });