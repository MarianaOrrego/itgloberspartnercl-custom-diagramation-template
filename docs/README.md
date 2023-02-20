# CUSTOM GRID


<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

Permite crear una galeria de imagenes dinamica la cual se puede modificar desde el **admin** de VTEX IO, cambiando su contenido y distribución.

![image](https://user-images.githubusercontent.com/83648336/220154793-87a8d365-b130-4300-aa63-52aad348bd59.png)
![image](https://user-images.githubusercontent.com/83648336/220155163-b1a6b1bc-ad30-49bd-927a-ea0e1b117b4d.png)

## Configuración

1. Usar el template [vtex-app](https://github.com/vtex-apps/react-app-template)
2. Modificar el `manifest.json`
     ```json 
        {
          "vendor": "itgloberspartnercl",
          "name": "special-diagramation",
          "version": "0.0.1",
          "title": "Diagramación especial",
          "description": "Grilla interactiva que cambiara un orden y recibirá componentes hijos",
        }
     ``` 
      **vendor:** nombre del cliente o información suministrada por él

      **name:** nombre del componente

      **version:** versión del componente

      **title:** titulo asigando al componente

      **description:** breve descripción del componente


   Agregar en la sección `builders` dentro del `manifest.json` un `store`

    ```json   
        "store" : "0.x"
    ```
   En `dependencies` se van a agregar las siguientes dependencias necesarias para el funcionamiento del **componente**

    ```json   
        "dependencies": {
          "vtex.css-handles": "0.x"
        }
    ```  
3. En el template se tienen dos `package.json` en ambos se debe modificar la `version` y el `name` 
   ```json 
        "version": "0.0.1",
        "name": "special-diagramation",
   ```  
4. Agregar a la carpeta raíz una carpeta llamada `store`, dentro crear un file llamado `interfaces.json`, en este file se tendrá la siguiente configuración:
    ```json 
        {
          "custom-grid": {
              "component": "CustomGrid",
              "composition": "children",
              "render": "client"
          }
        }
    ```
      Se especifica el nombre del componente con el cual será llamado en el `store-theme` de la tienda que se esta realizando, dentro se encuentra el `component` (se debe poner el nombre del componente React a realizar), `composition` y `render`

5. Finalizado los puntos anteriores, se procede a ingresar a la carpeta `react` en la cual se realizan las siguientes configuraciones: 
    
    5.1. Ejecutar el comando `yarn install` para preparar las dependencias
    
    5.2. Crear el functional component `CustomGrid.tsx` con la siguiente configuración 
    
    ```typescript
          import CustomGrid from './components/CustomGrid';

          export default CustomGrid;
    ```   
    5.3. Crear una carpeta llamada `components`, dentro se generan los siguientes functional components:
    
    5.3.1. `CustomGrid.tsx` contendrá la configuración principal del componente
    ```typescript
          import React, { ReactNode } from 'react'
          import customGridSchema from '../schemas/custom-grid-schema'
          import CustomGridItemBig from './CustomGridItemBig'
          import CustomGridItemSmall from './CustomGridItemSmall'

          import styles from './styles.css'

          type Props = {
              gridType: number
              children: [
                  ReactNode,
                  ReactNode,
                  ReactNode,
                  ReactNode,
                  ReactNode
              ]
          }

          const CustomGrid = ({ gridType = 1, children }: Props) => {

              const gridTypeClass: string = `grid__${gridType}`

              return (
                  <div className={styles[gridTypeClass]}>
                      <CustomGridItemBig
                          element={children[0]}
                      />
                      <CustomGridItemSmall
                          elementOne={children[1]}
                          elementTwo={children[2]}

                      />
                      <CustomGridItemSmall
                          elementOne={children[3]}
                          elementTwo={children[4]}
                      />
                  </div>
              )
          }

          CustomGrid.schema = customGridSchema

          export default CustomGrid

    ```
    
    5.3.2. `CustomGridItemBig.tsx` contiene la composición para el *Item Big* del **Custom Grid**
    ```typescript
        import React, { ReactNode } from 'react'

        import styles from './styles.css'

        type Props = {
            element: ReactNode
        }

        const CustomGridItemBig = ({ element }: Props) => {
            return (
                <div className={styles.grid__itemBig}>
                    {element}
                </div>
            )
        }

        export default CustomGridItemBig
    ```
    
    5.3.3. `CustomGridItemSmall.tsx` tiene la composición para el *Item Small* del **Custom Grid**
    ```typescript
        import React, { ReactNode } from 'react'

        import styles from './styles.css'

        type Props = {
            elementOne: ReactNode,
            elementTwo: ReactNode
        }
        const CustomGridItemSmall = ({ elementOne, elementTwo }: Props) => {
            return (
                <div className={styles.grid__itemSmall}>
                    {elementOne}
                    {elementTwo}
                </div>
            )
        }

        export default CustomGridItemSmall
    ```
    
    5.3.4. Dentro de la carpeta **react** se crea una carpeta llamada `schemas`, se crea un file con extensión **.ts** llamado `custom-grid-schema` que contiene el esquema para configurar desde el **admin** de VTEX IO su distribución
    ```typescript
        const customGridSchema = {
              title: "Grilla custom",
              type: "object",
              properties: {
                  gridType: {
                      title: 'Tipo de grilla',
                      type: 'number',
                      enum: [
                          1,
                          2,
                          3,
                          4
                      ]
                  }
              }
          }

          export default customGridSchema;
    ```

6. Linkear el componente custom al `store-theme` de la tienda base

    6.1. Iniciar sesión 
    ```console
       vtex login <vendor>
    ```

    6.2. Elegir el `workspace` en el cual se esta trabajando
    ```console
       vtex use <nombre_worksapce>
    ```

    6.3. Linkear el componente
    ```console
       vtex link
    ```

    6.4. Verificar que el componente quede linkeado, para eso se emplea el siguiente comando

     ```console
        vtex ls
     ```

    En consola debe verse las aplicaciones linkeadas al proyecto, verificando de esta forma que el componente quedo listo para emplearse:

    ```console
        Linked Apps in <vendor> at workspace <nombre_store_theme>
        itgloberspartnercl.special-diagramation         0.0.1
     ```
      
7. Hacer el llamado del componente desde el `store theme`

## Propiedades

### `Props` 

| Nombre Prop    | Tipo           | Descripción                                                |
| ------------   | ---------------| ---------------------------------------------------------- |
| `gridTrype`    | `number`       | Tipo de grilla por defecto                                 |
| `children`     | `object`       | Número de elementos que contiene la grilla                 |
| `element`      | `ReactNode`    | Renderiza cualquier tipo de valor que admita React         |
| `elementOne`   | `ReactNode`    | Renderiza cualquier tipo de valor que admita React         |
| `elementTwo`   | `ReactNode`    | Renderiza cualquier tipo de valor que admita React         |

- `children` object:

| Nombre Prop            | Tipo           | Descripción                                                  |
| ---------------------- | -------------- | ------------------------------------------------------------ |
| `children`             | `ReactNode`    | Contiene el `ReactNode` de elementos que se van a renderizar |

Tipos de Prop empleadas: 

- `number`
- `object`
- `ReactNode`

## Personalización
      

Para personalizar el componente con CSS, siga las instrucciones que se encuentran en [Using CSS Handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization).

Las clases empleadas en el componente son:

| CSS Handles           |
| --------------------- | 
| `grid__${gridType}`   | 
| `grid__itemBig`       | 
| `grid__itemSmall`     | 

<!-- DOCS-IGNORE:start -->

## Colaboradores ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Mariana Orrego Franco

<!-- DOCS-IGNORE:end -->
